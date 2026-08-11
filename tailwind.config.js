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
        // Paleta Oficial Marinas por SP (Direção Visual)
        creme: '#FFF6D5',      // Fundo principal e áreas de respiro
        vinho: '#8C1A13',      // Títulos, faixas e contraste institucional
        laranja: '#F1891D',    // Números, CTAs e acentos
        verdeEscuro: '#4F6219',// Seções de propostas e natureza
        verdeLima: '#CACB5F',  // Destaques e fundos secundários
        rosa: '#F0AECA',       // Fundos de apoio e contraste afetivo
        azul: '#16437F',       // Ícones e estados informativos
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
