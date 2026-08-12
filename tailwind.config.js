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
        // Paleta baseada no Logo "Suas Ideias para as Marinas"
        azulNavy: '#14447B',        // Azul principal das marcas "Suas ideias" e "Marinas"
        azulDark: '#0D2E55',        // Azul marinho profundo para contraste e rodapé
        verdeDourado: '#A3B12D',    // Verde Dourado/Lima principal de "para as"
        verdeDouradoClaro: '#D7E365',// Verde claro para destaques e hovers
        cremeFundo: '#FAF8F2',      // Fundo creme suave da página
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
