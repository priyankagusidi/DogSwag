// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba' : 'rgba(0,0,0,0.3)'
      },
      screens: {
        'xs': '470px',
        'hxs':'550px'
      },
       animation: {
        'moving-border': 'moving-border 3s infinite',
      },
      keyframes: {
        'moving-border': {
          '0%': { 'border-width': '1px', transform: 'translateX(0)' },
          '50%': { 'border-width': '3px', transform: 'translateX(100%)' },
          '100%': { 'border-width': '1px', transform: 'translateX(0)' },
        },
      },
    },
    fontFamily: {
     'poppins' : ['Roboto', 'sans-serif'],
     'Jumper':['Jumper','sans-serif'],
     'Inter':['Inter','sans-serif']
    }
  },
  plugins: [
    // require("daisyui"),
    require('@tailwindcss/typography'),
    require('tailwindcss-all'),

    ],
  
}

