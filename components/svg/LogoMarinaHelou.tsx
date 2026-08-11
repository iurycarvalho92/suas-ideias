import React from 'react';

interface LogoProps {
  variant?: 'vinho' | 'creme';
  className?: string;
}

export default function LogoMarinaHelou({ variant = 'vinho', className = "h-10" }: LogoProps) {
  const textColor = variant === 'creme' ? '#FFF6D5' : '#8C1A13';
  const accentColor = '#F1891D';

  return (
    <div className={`inline-flex items-center gap-2 font-serif font-bold ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 shrink-0">
        <path
          d="M20 0 C21 14 26 19 40 20 C26 21 21 26 20 40 C19 26 14 21 0 20 C14 19 19 14 20 0 Z"
          fill={accentColor}
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight" style={{ color: textColor }}>
          MARINA HELOU
        </span>
        <span className="text-[10px] font-sans font-bold tracking-wider text-[#F1891D] uppercase">
          Deputada Federal 4044
        </span>
      </div>
    </div>
  );
}
