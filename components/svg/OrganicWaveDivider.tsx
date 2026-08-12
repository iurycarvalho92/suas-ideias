import React from 'react';

interface WaveProps {
  fillColor?: string;
  className?: string;
  flipY?: boolean;
}

export default function OrganicWaveDivider({ fillColor = "#14447B", className = "w-full h-16 sm:h-24", flipY = false }: WaveProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flipY ? 'transform rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-full"
      >
        <path
          d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
