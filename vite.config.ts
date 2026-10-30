import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Vite does not populate process.env from .env for server code, so load it
  // here to keep the existing NEXT_PUBLIC_* references working.
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [tanstackStart(), viteReact()],
    resolve: { tsconfigPaths: true }
  };
});
