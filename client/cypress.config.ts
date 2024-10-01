import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 60000,
    requestTimeout: 60000,
    responseTimeout: 60000,
    setupNodeEvents(on, config) {},
  },
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: true,
})
