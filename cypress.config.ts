// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "zche8i",

  // macbook 11 size
  viewportWidth: 1366,
  viewportHeight: 768,

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "**/*.test.{ts,tsx}",
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "**/*.spec.{ts,tsx}",
  },
});
