'use client';

import React from 'react';
import Image from 'next/image';

export default function MarinasHeroPortrait() {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 px-2 sm:px-4">
      
      {/* Fluid organic background backdrop without rigid boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
        
        {/* Candidate 1: Marina Helou - Fluid & Unboxed */}
        <div className="relative flex flex-col items-center group">
          
          {/* Organic background blob element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-[#A3B12D]/30 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />
          
          {/* Star SVG accent */}
          <div className="absolute top-0 right-4 w-10 h-10 z-10 drop-shadow-md">
            <Image src="/assets/svg/estrela-mh.svg" alt="Estrela Marina Helou" width={40} height={40} />
          </div>

          {/* Unboxed Fluid Photo Portrait */}
          <div className="relative w-56 h-72 sm:w-64 sm:h-80 mb-4 transition-transform duration-300 group-hover:-translate-y-1">
            <Image
              src="/assets/fotos/MH-03.png"
              alt="Marina Helou"
              fill
              className="object-cover object-top drop-shadow-2xl"
              priority
            />
          </div>

          {/* Official Logo Lockup Asset with Name & Number (Prancheta 1.svg) */}
          <div className="relative h-16 w-56 sm:w-64 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-[#14447B]/20 shadow-md">
            <Image
              src="/assets/logos/Prancheta 1.svg"
              alt="Marina Helou 4044"
              fill
              className="object-contain p-1"
            />
          </div>

        </div>

        {/* Candidate 2: Marina Bragante - Fluid & Unboxed */}
        <div className="relative flex flex-col items-center group">
          
          {/* Organic background blob element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-[#14447B]/20 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-500" />
          
          {/* Star SVG accent */}
          <div className="absolute top-0 right-4 w-10 h-10 z-10 drop-shadow-md">
            <Image src="/assets/svg/estrela-mb.svg" alt="Estrela Marina Bragante" width={40} height={40} />
          </div>

          {/* Unboxed Fluid Photo Portrait */}
          <div className="relative w-56 h-72 sm:w-64 sm:h-80 mb-4 transition-transform duration-300 group-hover:-translate-y-1">
            <Image
              src="/assets/fotos/MAB 02.png"
              alt="Marina Bragante"
              fill
              className="object-cover object-top drop-shadow-2xl"
              priority
            />
          </div>

          {/* Official Logo Lockup Asset with Name & Number */}
          <div className="relative h-16 w-56 sm:w-64 bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-[#14447B]/20 shadow-md">
            <Image
              src="/assets/logos/logo-bragante-horizontal-verde-numero-v2-202607@4x.png"
              alt="Marina Bragante 40 444"
              fill
              className="object-contain p-1"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
