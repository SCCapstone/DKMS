// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  // macbook 11 size
  viewportWidth: 1366,
  viewportHeight: 768,

  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
