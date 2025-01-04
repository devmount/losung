export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" }
      }
    }
  },
  variants: {},
  plugins: [],
}
