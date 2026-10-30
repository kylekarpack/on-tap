import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      tanstackStart(),
      nitro({
        preset: "vercel",
        vercel: {
          config: {
            images: {
              sizes: [48, 64, 96, 128, 256, 384],
              formats: ["image/avif", "image/webp"],
              remotePatterns: [
                { protocol: "https", hostname: "assets.untappd.com" },
                { protocol: "https", hostname: "untappd.akamaized.net" }
              ]
            }
          }
        }
      }),
      viteReact()
    ],
    resolve: {
      tsconfigPaths: true
    },
    server: {
      port: 3000
    }
  };
});
