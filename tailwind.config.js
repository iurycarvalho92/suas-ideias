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
        // Paleta Oficial com fundo Creme #FFF6D5
        azulNavy: '#14447B',        // Azul principal das marcas "Suas ideias" e "Marinas"
        azulDark: '#0D2E55',        // Azul marinho profundo para contraste e rodapé
        verdeDourado: '#A3B12D',    // Verde Dourado/Lima principal de "para as"
        verdeDouradoClaro: '#D7E365',// Verde claro para destaques e hovers
        cremeFundo: '#FFF6D5',      // Fundo creme oficial da página #FFF6D5
        cremeCard: '#F4F2E8',       // Fundo de cards e containers
        cremeBorder: '#DCD8C5',     // Bordas neutras e elegantes
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
