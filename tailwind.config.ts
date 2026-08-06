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
        nps: {
          red: '#d81f26',
          'red-dark': '#a20f16',
          ink: '#000000',
          panel: '#111111',
          paper: '#ffffff',
          newsprint: '#f2f2f2',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        cond: ['var(--font-cond)', 'Oswald', 'Arial Narrow', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
        serif: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        none: '0',
      },
    },
  },
  plugins: [],
}
export default config
