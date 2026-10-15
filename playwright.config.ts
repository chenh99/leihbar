import { defineConfig, devices } from "@playwright/test";

// Die Tests öffnen die App in Chromium. Läuft `npm run dev` schon, wird dieser Server benutzt,
// sonst startet Playwright ihn selbst.
export default defineConfig({
  testDir: "./tests",
  reporter: "list",
  use: { baseURL: "http://localhost:3000" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
});
