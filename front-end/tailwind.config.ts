import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px', // Extra small screens (iPhone SE and similar)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        pixel: ['var(--font-press-start)', 'monospace'],
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'winner-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        pop: 'pop 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'slide-in': 'slide-in 300ms ease-out',
        'fade-in': 'fade-in 200ms ease-in',
        'winner-line': 'winner-line 600ms ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
