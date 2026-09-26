const { defineConfig } = require("@playwright/test");
const fs = require("fs");
const edgePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    ...(fs.existsSync(edgePath) ? { launchOptions: { executablePath: edgePath } } : {})
  },
  webServer: {
    command: "python -m http.server 4173",
    port: 4173,
    reuseExistingServer: true
  }
});
