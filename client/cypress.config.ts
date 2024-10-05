import { BASE_URL } from '@/utils/const'
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: BASE_URL,
    setupNodeEvents(on, config) {},
    defaultCommandTimeout: 50000,
  },
})
