// vp migrate: merged .oxlintrc.json (1e1159e7c0ad7e4e9e25198f02cdaf49).
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, lazyPlugins, loadEnv } from "vite-plus";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    staged: {
      "*": "vp check --fix"
    },
    fmt: {
      printWidth: 120,
      trailingComma: "none",
      sortImports: {
        ignoreCase: true,
        order: "asc",
        newlinesBetween: false
      },
      ignorePatterns: ["src/routeTree.gen.ts"]
    },
    lint: {
      plugins: ["typescript", "unicorn", "import", "react", "jsdoc", "jest", "oxc"],
      categories: {
        correctness: "error"
      },
      env: {
        vitest: true
      },
      ignorePatterns: [".output", "dist", ".next"],
      rules: {
        "typescript/array-type": [
          "error",
          {
            default: "array"
          }
        ],
        "typescript/no-unused-vars": "error",
        "typescript/prefer-for-of": "error",
        "typescript/prefer-includes": "error",
        "typescript/prefer-nullish-coalescing": "error",
        "typescript/prefer-optional-chain": "error",
        "typescript/prefer-string-starts-ends-with": "error",
        "unicorn/prefer-string-starts-ends-with": "off",
        "import/no-absolute-path": "error",
        "import/default": "error",
        "import/named": "error",
        "import/no-duplicates": "error",
        "react/jsx-no-useless-fragment": [
          "error",
          {
            allowExpressions: true
          }
        ],
        "react/self-closing-comp": [
          "error",
          {
            component: true,
            html: false
          }
        ],
        "no-labels": "error",
        "vite-plus/prefer-vite-plus-imports": "error"
      },
      jsPlugins: [
        {
          name: "vite-plus",
          specifier: "vite-plus/oxlint-plugin"
        }
      ]
    },
    plugins: lazyPlugins(() => [
      {
        name: "vercel-image-dev",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url || "";
            if (!url.startsWith("/_vercel/image")) return next();
            try {
              const params = new URL(url, "http://localhost").searchParams;
              const src = params.get("url");
              if (!src) return next();
              if (src.startsWith("/")) {
                res.statusCode = 302;
                res.setHeader("Location", src);
                res.end();
                return;
              }
              const upstream = await fetch(src);
              if (!upstream.ok) return next();
              const buf = Buffer.from(await upstream.arrayBuffer());
              res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/octet-stream");
              res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
              res.end(buf);
            } catch {
              next();
            }
          });
        }
      },
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
    ]),
    resolve: {
      tsconfigPaths: true
    },
    server: {
      port: 3000
    }
  };
});
