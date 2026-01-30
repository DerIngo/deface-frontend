import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deface-ink': '#0f172a',
        'deface-azure': '#5de0e6',
      },
    },
  },
  plugins: [],
}

export default config
