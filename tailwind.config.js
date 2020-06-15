module.exports = {
  purge: false,
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
