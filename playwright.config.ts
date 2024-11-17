import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

export default defineConfig({
  testDir: "e2e", // Directory where your test files are stored
  timeout: 30000, // Global timeout for all tests
  expect: {
    timeout: 5000, // Timeout for individual expectations
  },
  retries: 2, // Number of retries for failed tests
  workers: 2, // Parallel workers for running tests
  use: {
    headless: true, // Run in headless mode (use false if you want to see the browser)
    actionTimeout: 0, // Disable action timeout
    baseURL: process.env.REACT_APP_API_URL, // Your app's URL (adjust as needed)
  },
  // You can also add test-specific options here if needed
});
