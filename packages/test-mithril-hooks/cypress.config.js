const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    video: false,
    screenshots: false,
    baseUrl: 'http://localhost:3000/#!',
    specPattern: './cypress/e2e/*.spec.js',
    defaultCommandTimeout: 10000,
    testIsolation: false,
  },
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
});
