module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        coffee: '#4F0E0E',
        cappuccino: '#BB8760',
        accent: '#FFDADA',
        light: '#FFF1F1'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
