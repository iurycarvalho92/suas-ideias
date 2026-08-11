import React from 'react';

interface SvgProps {
  className?: string;
}

export default function EstrelaMarinaBragante({ className = "w-6 h-6" }: SvgProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Estrela de 8 pontas orgânica Marina Bragante em Verde Escuro (#4F6219) */}
      <path
        d="M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0 Z"
        fill="#4F6219"
      />
      <path
        d="M50 18 C51.5 38 62 48.5 82 50 C62 51.5 51.5 62 50 82 C48.5 62 38 51.5 18 50 C38 48.5 48.5 38 50 18 Z"
        fill="#CACB5F"
        opacity="0.8"
      />
      <circle cx="50" cy="50" r="7" fill="#FFF6D5" />
    </svg>
  );
}
