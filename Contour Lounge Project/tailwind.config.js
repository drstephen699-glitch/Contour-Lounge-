/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1C1712',
          light: '#2A2320',
          lighter: '#3A322E',
        },
        bronze: {
          DEFAULT: '#B3874E',
          light: '#D9AE78',
          dark: '#8A6639',
        },
        blush: {
          DEFAULT: '#E3B7A3',
          light: '#F0D0C0',
          dark: '#C99B85',
        },
        cream: {
          DEFAULT: '#F5EDE6',
          dark: '#E8DDD4',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.75rem, 3vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #B3874E 0%, #D9AE78 50%, #B3874E 100%)',
        'gradient-dark': 'linear-gradient(180deg, #1C1712 0%, #2A2320 100%)',
      },
    },
  },
  plugins: [],
}
