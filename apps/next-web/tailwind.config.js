/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wolf-red': '#b22d15',
        'wolf-gold': '#de8538',
        'wolf-brown-dark': '#2d1810',
        'wolf-brown-light': '#8b7355',
        'wolf-bg-light': '#fdfcf2',
        'wolf-border': '#e8d5c4',
      },
      backgroundImage: {
        'wolf-gradient': 'linear-gradient(135deg, #b22d15, #de8538)',
        'wolf-gradient-bar': 'linear-gradient(135deg, #b22d15, #de8538)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

