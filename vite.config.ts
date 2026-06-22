import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter(),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(),
  ],
  optimizeDeps: {
    exclude: ["src/routeTree.gen.ts"],
  },
});