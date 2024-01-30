/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'banner':'  #126FC7',
      'accent':'#E0E62D',
      'light-blue':'#1BD4F1',
      'side-gray':'#DBD3D8'
    },
    fontFamily: {
      jp: ['Zen Kaku Gothic New', 'sans-serif'],
      eng: ['Hammersmith One', 'serif'],
      test:['Rubik Burned', 'serif']
    },
  },
  plugins: [],
}