import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        accent: {
          50: '#eef0ff',
          100: '#e0e3ff',
          200: '#c7ccfe',
          300: '#a5a9fc',
          400: '#8b8ef9',
          500: '#6d6ef5',
          600: '#5b4cf5',
          700: '#4d3ce0',
          800: '#3f31b8',
          900: '#342a91',
          950: '#1e1a4d',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      spacing: {
        18: '4.5rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.3s ease-out both',
        'pulse-soft': 'pulse-soft 1.5s ease-in-out infinite',
        'sweep': 'sweep 2.5s ease-in-out infinite',
        'scroll-x': 'scroll-x 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
