/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
      colors: {
        primary: {
          50: '#EEF6FF',
          100: '#D9EAFD',
          200: '#BCDAFB',
          300: '#8EC2F8',
          400: '#59A3F3',
          500: '#3282EC',
          600: '#1F66D6',
          700: '#1A52AE',
          800: '#1B4589',
          900: '#1C3B70',
        },
        accent: {
          50: '#EEFBF5',
          100: '#D5F5E6',
          200: '#AEEACF',
          300: '#76DBB2',
          400: '#3EC393',
          500: '#1FA67A',
          600: '#14865F',
          700: '#126B4D',
          800: '#125540',
          900: '#114635',
        },
      },
    },
  },
  plugins: [],
};
