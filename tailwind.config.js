/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        'tablet-lg': '1024px',
        desktop: '1280px',
      },
      fontFamily: {
        inter: ['Inter-Regular', 'sans-serif'],
        'inter-medium': ['Inter-Medium', 'sans-serif'],
        'inter-bold': ['Inter-Bold', 'sans-serif'],
        nunito: ['Nunito-Regular', 'sans-serif'],
        'nunito-medium': ['Nunito-Medium', 'sans-serif'],
        'nunito-bold': ['Nunito-Bold', 'sans-serif'],
        'space-mono': ['SpaceMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
