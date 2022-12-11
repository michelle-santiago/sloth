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
          "primary": "#3f0e40",
                  
          "secondary": "#350d36",
                  
          "accent": "#522653",
                  
          "neutral": "#1164a3",
                  
          "base-100": "#ffffff",
                  
          "info": "#5d3d5e",
                  
          "success": "#22B469",
                  
          "warning": "#F78C22",
                  
          "error": "#ED2C56",
        },
      },
    ],
  },
}
