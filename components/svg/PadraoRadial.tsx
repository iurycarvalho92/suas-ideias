import React from 'react';

interface SvgProps {
  className?: string;
}

export default function PadraoRadial({ className = "w-64 h-64" }: SvgProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="radialAcc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F1891D" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#F0AECA" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFF6D5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#radialAcc)" />
      {/* Círculos radiais finos */}
      <circle cx="100" cy="100" r="80" stroke="#8C1A13" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="#8C1A13" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" fill="none" />
      <circle cx="100" cy="100" r="40" stroke="#8C1A13" strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
  );
}
