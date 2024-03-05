import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rafton-blue': '#081E30',
        'rafton-orange': '#FF846B',
        'rafton-green': '#00C49A',
      },
    },
  },
  plugins: [],
}
export default config
