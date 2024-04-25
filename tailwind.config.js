/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'move-sphere': {
          '0%': {
            transform: 'translate(0%, 0%)',
          },
          '25%': {
            transform: 'translate(25vw, -25vh)',
          },
          '50%': {
            transform: 'translate(0%, 50vh)',
          },
          '75%': {
            transform: 'translate(-25vw, 0%)',
          },
          '100%': {
            transform: 'translate(0%, 0%)',
          },
        },
      },
      animation: {
        'move-sphere': 'move-sphere 20s ease-in-out infinite',
        'animate-pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
      },
  plugins: [],
    },
}
