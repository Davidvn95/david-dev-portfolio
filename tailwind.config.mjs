/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        firstLight: '#E38D28',
        bgLight: '#e2e2e2',
        bgDark: '#182336'
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
