import { parseArgs } from "util";
import { $ } from "bun";
import { transpileProject, watchProject } from "./build";
import z, { prettifyError } from "zod/v4";

const schema = z.object({
  entryPoint: z
    .string()
    .optional()
    .transform(async (entryPoint, ctx) => {
      if (entryPoint) {
        return entryPoint;
      }

      const pwd = (await $`pwd`.text()).trim();
      const pkgFile = Bun.file(`${pwd}/package.json`);
      if (!(await pkgFile.exists())) {
        ctx.addIssue({
          code: "custom",
          message: `No entryPoint passed and no package.json in current directory (${pwd})`,
        });

        return z.NEVER;
      }

      const pkg = await pkgFile.json();

      const result = z
        .union([
          z.object({
            module: z.string(),
          }),
          z.object({
            main: z.string(),
          }),
        ])
        .safeParse(pkg);

      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          message:
            'No entryPoint passed and no "module" or "main" entry in package.json',
        });

        return z.NEVER;
      }

      return "module" in result.data ? result.data.module : result.data.main;
    })
    .describe(
      "Path to directory with main.ts containing init, update and/or draw"
    ),

  outDir: z
    .string()
    .optional()
    .transform(async (outDir, ctx) => {
      if (outDir) {
        return outDir;
      }

      const pwd = (await $`pwd`.text()).trim();
      const pkgFile = Bun.file(`${pwd}/package.json`);
      if (!(await pkgFile.exists())) {
        ctx.addIssue({
          code: "custom",
          message: `No outFile passed and no package.json in current directory (${pwd})`,
        });

        return z.NEVER;
      }

      const pkg = await pkgFile.json();

      const result = z
        .object({
          exports: z.object({
            default: z.string(),
          }),
        })
        .safeParse(pkg);

      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          message:
            'No outDir passed and no "exports": { "default" } in package.json',
        });

        return z.NEVER;
      }

      return result.data.exports.default;
    })
    .describe("Path to directory to output Lua file to include in cart."),

  watch: z
    .boolean()
    .default(false)
    .describe("Watch changes and rebuild the project"),

  debug: z
    .boolean()
    .default(false)
    .describe("Export .ts file used to transpile for debugging purpose"),
});

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    entryPoint: {
      type: "string",
    },
    outDir: {
      type: "string",
    },
    watch: {
      type: "boolean",
      default: false,
    },
    debug: {
      type: "boolean",
      default: false,
    },
  },
  allowPositionals: true,
});

const result = await schema.safeParseAsync(values);

if (!result.success) {
  console.error(prettifyError(result.error));
  process.exit(1);
}

const { entryPoint, outDir, watch, debug } = result.data;

transpileProject(entryPoint, outDir, debug);
if (watch) {
  watchProject(entryPoint, outDir, debug);
}
