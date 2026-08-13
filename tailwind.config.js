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
        // Nova Paleta Oficial
        verdeEscuro: '#506324',     // Verde escuro principal (substitui o azul navy)
        verdeAmarelado: '#CACB60', // Verde oliva/amarelado para detalhes e badges
        laranja: '#F28919',        // Laranja vibrante para botões e CTAs
        begeFundo: '#FEF6D5',      // Bege fundo oficial #FEF6D5
        
        // Mapeamento retrocompatível para evitar quebras
        azulNavy: '#506324',
        azulDark: '#3A491A',
        verdeDourado: '#CACB60',
        verdeDouradoClaro: '#D4D576',
        cremeFundo: '#FEF6D5',
        cremeCard: '#F8F1CD',
        cremeBorder: '#E4DCB0',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
