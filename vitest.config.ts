import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "happy-dom",
    globals: true, // Mirrors jest's implicit globals; @testing-library/react hooks auto-cleanup onto global afterEach
    clearMocks: false, // Jest's default; resolvers.test persists mock call counts across tests
    setupFiles: ["./vitest.setup.ts"],
    include: ["components/**/*.{test,spec}.{ts,tsx}", "lib/**/*.{test,spec}.{ts,tsx}"],
    css: {
      // Render CSS module class names as written, matching jest's identity-obj-proxy mock
      modules: { classNameStrategy: "non-scoped" }
    },
    reporters: ["default", ["vitest-sonar-reporter", { outputFile: "test-report.xml", silent: true }]],
    coverage: {
      reporter: ["lcov", "text"],
      include: ["components/**", "lib/**"],
      exclude: ["**/*.test.*", "**/*.spec.*", "next-env.d.ts"]
    }
  }
});
