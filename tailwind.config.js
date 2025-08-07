/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-1': 'float-1 8s ease-in-out infinite',
        'float-2': 'float-2 10s ease-in-out infinite',
        'float-3': 'float-3 12s ease-in-out infinite',
        'float-4': 'float-4 9s ease-in-out infinite',
        'float-5': 'float-5 11s ease-in-out infinite',
        'float-6': 'float-6 7s ease-in-out infinite',
        'float-slow': 'float-slow 15s ease-in-out infinite',
        'float-slow-reverse': 'float-slow-reverse 18s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'pulse-slow-reverse': 'pulse-slow-reverse 6s ease-in-out infinite',
      },
      keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(90deg)' },
          '50%': { transform: 'translateY(-10px) translateX(20px) rotate(180deg)' },
          '75%': { transform: 'translateY(-30px) translateX(5px) rotate(270deg)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-25px) translateX(-15px) rotate(120deg)' },
          '66%': { transform: 'translateY(-15px) translateX(25px) rotate(240deg)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) translateX(-10px) rotate(180deg)' },
        },
        'float-4': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) translateX(20px) rotate(90deg)' },
          '50%': { transform: 'translateY(-25px) translateX(-5px) rotate(180deg)' },
          '75%': { transform: 'translateY(-10px) translateX(-20px) rotate(270deg)' },
        },
        'float-5': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) translateX(15px) rotate(120deg)' },
          '66%': { transform: 'translateY(-30px) translateX(-10px) rotate(240deg)' },
        },
        'float-6': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) translateX(10px) rotate(180deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-40px) translateX(20px) rotate(90deg)' },
          '50%': { transform: 'translateY(-20px) translateX(40px) rotate(180deg)' },
          '75%': { transform: 'translateY(-50px) translateX(10px) rotate(270deg)' },
        },
        'float-slow-reverse': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-30px) translateX(-25px) rotate(-90deg)' },
          '50%': { transform: 'translateY(-50px) translateX(-10px) rotate(-180deg)' },
          '75%': { transform: 'translateY(-20px) translateX(-35px) rotate(-270deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.1)' },
        },
        'pulse-slow-reverse': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}
