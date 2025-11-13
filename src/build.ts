import { watch, rm } from "fs/promises";
import path from "path";
import * as tstl from "typescript-to-lua";
import tsconfig from "../tsconfig.tstl.json";
import { dts } from "./plugins/dts";

// We want to inline the contents of the file, not reference its types
// @ts-expect-error
import pico8Declarations from "./declarations/pico8.d.ts" with { type: "text" };

function removeModuleKeywords(str: string): string {
  return str
    .split("\n")
    .filter((l) => !l.startsWith("import"))
    .map((l) => l.replaceAll("export ", " "))
    .join("\n")
}

function transpile(str: string): string {
  const lua = tstl.transpileString(
    removeModuleKeywords(str),
    {
      ...tsconfig,
      ...(tsconfig.tstl as tstl.TypeScriptToLuaOptions),
    }
  );

  const result = lua.file?.lua;

  if (!result) {
    throw new Error(lua.diagnostics.join("\n"));
  }

  return result;
}

async function optionalRm(dir: string) {
  try {
    await rm(dir, { recursive: true });
  } catch (e) {
    if (!(e instanceof Error && "code" in e && e.code == "ENOENT")) {
      throw e;
    }
  }

}

export async function transpileProject(entryPoint: string, outDir: string) {
  const t0 = performance.now();

  const srcDir = path.basename(path.dirname(entryPoint));

  optionalRm(outDir);

  try {
    const result = await Bun.build({
      entrypoints: [entryPoint],
      minify: {
        identifiers: import.meta.env.NODE_ENV == "production",
        keepNames: true,
        syntax: false,
        whitespace: false,
      },
      splitting: false,
      plugins: [
        dts(),
      ],
      root: srcDir,
      outdir: outDir,
      define: {
        "console.debug": "printh",
        "console.log": "printh",
        "console.error": "printh",
        "console.warning": "printh",
        "console.info": "printh",
        "console.table": "printh",
      },
    });

    if (!result.success) {
      throw new Error("Build failed", { cause: result.logs.join("\n") });
    }

    if (result.outputs.length != 1) {
      throw new Error("Build output is not a single file", {
        cause: result.logs.join("\n"),
      });
    }

    const jsContent = await result.outputs
      .find((o) => o.kind == "entry-point")
      ?.text();

    if (!jsContent) {
      throw new Error("Bad output", { cause: result.logs.join("\n") });
    }

    const jsPath = entryPoint
      .replace(new RegExp(`^${srcDir}`), outDir)
      .replace(/\.ts$/, ".js");

    const declarationsPath = entryPoint
      .replace(new RegExp(`^${srcDir}`), outDir)
      .replace(/\.ts$/, ".d.ts");

    const luaPath = entryPoint
      .replace(new RegExp(`^${srcDir}`), outDir)
      .replace(/\.ts$/, ".lua");

    const transpilePath = entryPoint.replace(new RegExp(`^${srcDir}`), outDir);

    const jsFileToTranspile = removeModuleKeywords(`
${pico8Declarations}
${await Bun.file(declarationsPath).text()}
${jsContent}
    `);

    const luaContent = transpile(jsFileToTranspile);

    await Promise.all([
      Bun.write(transpilePath, jsFileToTranspile),
      Bun.write(luaPath, luaContent),
      optionalRm(declarationsPath),
      optionalRm(jsPath),
    ])

    console.log(`Bundled file in ${(performance.now() - t0).toFixed(2)}ms`);
  } catch (e) {
    if (!(e instanceof Error && "code" in e && (e.code == "EINVAL" || e.code == 'ENOENT'))) {
      throw e;
    } else {
      // retry
      transpileProject(entryPoint, outDir);
    }
  }
}

export async function watchProject(entryPoint: string, outDir: string) {
  const srcDir = path.basename(path.dirname(entryPoint));

  const watcher = watch(srcDir, { recursive: true });

  for await (const event of watcher) {
    if (event.eventType == "change" && event.filename?.endsWith(".ts")) {
      transpileProject(entryPoint, outDir);
    }
  }
}
