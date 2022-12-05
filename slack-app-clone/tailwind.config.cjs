/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        slack: {
          "primary": "#611f69",
                  
          "secondary": "#c41328",
                  
          "accent": "#6fbbdb",
                  
          "neutral": "#3B243D",
                  
          "base-100": "#ffffff",
                  
          "info": "#5D9CDF",
                  
          "success": "#22B469",
                  
          "warning": "#F78C22",
                  
          "error": "#ED2C56",
        },
      },
    ],
  },
}
