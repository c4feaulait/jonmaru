// @ts-check
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { defineConfig } from "astro/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const breakpointsUrl = pathToFileURL(
    path.resolve(__dirname, "src/styles/global/_breakpoints.scss"),
).href;

// https://astro.build/config
export default defineConfig({
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // 相対パスが効かない <style lang="scss"> でも解決できるよう file URL で固定
                    additionalData: `@use "${breakpointsUrl}" as *;\n`,
                },
            },
        },
    },
});
