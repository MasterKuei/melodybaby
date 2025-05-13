import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  minify: true,
  metafile: true,
  external: ["react", "react-dom", "antd"],
  onSuccess: "esbuild-visualizer --metadata ./dist/metafile-esm.json"
})
