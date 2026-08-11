import React from 'react';

interface SvgProps {
  className?: string;
  fillColor?: string;
}

export default function PadraoBotanico({ className = "w-full h-24", fillColor = "#4F6219" }: SvgProps) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M0 0 C150 90 350 -40 500 60 C650 160 900 20 1200 80 V120 H0 Z"
        fill={fillColor}
        opacity="0.15"
      />
      {/* Botânica folhagens vetoriais sutis */}
      <path
        d="M120 40 Q140 10 160 40 T200 40 M450 30 Q470 5 490 30 T530 30 M850 40 Q870 15 890 40 T930 40"
        stroke={fillColor}
        strokeWidth="3"
        fill="none"
        opacity="0.25"
      />
    </svg>
  );
}
