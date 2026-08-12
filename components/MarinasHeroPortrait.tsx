'use client';

import React from 'react';
import Image from 'next/image';

export default function MarinasHeroPortrait() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 p-4 sm:p-8">
      
      {/* Background organic shape elements (Rosa #F0AECA e Verde #CACB5F) */}
      <div className="absolute top-4 left-1/4 w-72 h-72 bg-[#F0AECA]/50 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-4 right-1/4 w-72 h-72 bg-[#CACB5F]/50 rounded-full blur-2xl -z-10" />

      {/* Main Composite Frame */}
      <div className="bg-white/80 backdrop-blur-md rounded-4xl p-6 sm:p-10 border-2 border-[#8C1A13]/20 shadow-xl relative overflow-hidden">
        
        {/* Stars accents from official SVGs */}
        <div className="absolute top-4 left-4 w-8 h-8">
          <Image
            src="/assets/svg/estrela-mh.svg"
            alt="Estrela Marina Helou"
            width={32}
            height={32}
          />
        </div>
        <div className="absolute bottom-4 right-4 w-8 h-8">
          <Image
            src="/assets/svg/estrela-mb.svg"
            alt="Estrela Marina Bragante"
            width={32}
            height={32}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Candidate 1: Marina Helou */}
          <div className="flex flex-col items-center text-center space-y-4 p-5 rounded-3xl bg-[#FFF6D5]/60 border-2 border-[#F1891D]/30 relative">
            <div className="relative">
              {/* Photo Avatar Frame */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#F1891D] to-[#8C1A13] p-1.5 shadow-lg relative overflow-hidden">
                <Image
                  src="/assets/fotos/MH-03.png"
                  alt="Marina Helou"
                  fill
                  className="object-cover object-top rounded-full"
                />
              </div>
              <span className="absolute -bottom-2 right-0 bg-[#F1891D] text-white font-extrabold text-xs px-3 py-1 rounded-full border-2 border-white shadow-md">
                4044
              </span>
            </div>

            <div>
              <h3 className="font-serif font-extrabold text-[#8C1A13] text-xl tracking-tight">
                MARINA HELOU
              </h3>
              <span className="text-xs font-sans font-bold tracking-wider text-[#F1891D] uppercase">
                Deputada Federal 4044
              </span>
            </div>

            <p className="text-xs text-slate-700 font-medium max-w-xs leading-relaxed">
              Deputada Estadual (ALESP) • Defesa da infância, sustentabilidade e transparência.
            </p>
          </div>

          {/* Candidate 2: Marina Bragante */}
          <div className="flex flex-col items-center text-center space-y-4 p-5 rounded-3xl bg-[#FFF6D5]/60 border-2 border-[#4F6219]/30 relative">
            <div className="relative">
              {/* Photo Avatar Frame */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#4F6219] to-[#8C1A13] p-1.5 shadow-lg relative overflow-hidden">
                <Image
                  src="/assets/fotos/MAB 02.png"
                  alt="Marina Bragante"
                  fill
                  className="object-cover object-top rounded-full"
                />
              </div>
              <span className="absolute -bottom-2 right-0 bg-[#4F6219] text-white font-extrabold text-xs px-3 py-1 rounded-full border-2 border-white shadow-md">
                40 444
              </span>
            </div>

            <div>
              <h3 className="font-serif font-extrabold text-[#8C1A13] text-xl tracking-tight">
                MARINA BRAGANTE
              </h3>
              <span className="text-xs font-sans font-bold tracking-wider text-[#4F6219] uppercase">
                Deputada Estadual 40 444
              </span>
            </div>

            <p className="text-xs text-slate-700 font-medium max-w-xs leading-relaxed">
              Vereadora de São Paulo • 20 anos de experiência pública, clima e redução de desigualdades.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
