/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2F9F6',
          100: '#E1F3EC',
          200: '#C2E5D7',
          300: '#94D0BA',
          400: '#5DB396',
          500: '#00A86B', // Vibrant Civic Emerald Green
          600: '#008A57',
          700: '#006D46',
          800: '#055639',
          900: '#064730',
          950: '#02281C',
        },
        marinas: {
          teal: '#00A499',
          orange: '#FF6B35',
          navy: '#0A2540',
          yellow: '#FFB800',
          purple: '#6B46C1',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-hover': '0 20px 30px -10px rgba(0, 168, 107, 0.12), 0 10px 15px -5px rgba(10, 37, 64, 0.05)',
        'soft-lg': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
