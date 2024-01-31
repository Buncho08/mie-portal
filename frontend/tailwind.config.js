/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'blue': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'error':' #ff0000',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'banner':'  #126FC7',
      'accent':'#E0E62D',
      'light-blue':'#1BD4F1',
      'side-gray':'#DBD3D8',
      'cover': '#0000008C',
    },
    fontFamily: {
      jp: ['Zen Kaku Gothic New', 'sans-serif'],
      eng: ['Hammersmith One', 'serif'],
      test:['Sixtyfour', 'sans-serif']
    },
  },
  plugins: [],
}