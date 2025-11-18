import type { BunPlugin } from "bun";
import { isolatedDeclaration } from "oxc-transform";

// Adapted from binhtran432k code
// https://github.com/oven-sh/bun/issues/5141#issuecomment-2595032410
export function dts(): BunPlugin {
  const wroteTrack = new Set<string>();

  return {
    name: "dts",
    async setup(builder) {
      if (builder.config.root && builder.config.outdir) {
        const rootPath = Bun.pathToFileURL(builder.config.root).pathname;
        const outPath = Bun.pathToFileURL(builder.config.outdir).pathname;
        const entryPath = builder.config.entrypoints[0]
          ? Bun.pathToFileURL(builder.config.entrypoints[0]).pathname
          : undefined;

        if (!entryPath) {
          throw new Error("No entry points");
        }

        const file = Bun.file(
          entryPath
            .replace(new RegExp(`^${rootPath}`), outPath)
            .replace(/\.ts$/, ".d.ts")
        );

        await file.write("");

        const writer = file.writer();

        builder.onStart(() => wroteTrack.clear());
        builder.onLoad({ filter: /\.ts$/ }, async (args) => {
          if (args.path.startsWith(rootPath) && !wroteTrack.has(args.path)) {
            wroteTrack.add(args.path);
            const { code } = await isolatedDeclaration(
              args.path,
              await Bun.file(args.path).text()
            );
            writer.write(
              [
                "",
                `// ${args.path.replace(new RegExp(`^${rootPath}/`), "")}`,
                "",
                ...code
                  .split("\n")
                  .filter((line) => !line.startsWith("import")),
              ].join("\n")
            );
            writer.flush();
          }
          return undefined;
        });
      }
    },
  };
}
