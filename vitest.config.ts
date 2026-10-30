import { defineConfig } from "vite-plus";

export default defineConfig({
  logLevel: "warn",
  envDir: false,
  resolve: {
    tsconfigPaths: true
  },
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
      exclude: ["**/*.test.*", "**/*.spec.*", "**/.DS_Store", "next-env.d.ts"]
    }
  }
});
