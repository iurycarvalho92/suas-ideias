'use client';

import React from 'react';
import EstrelaMarinaHelou from './svg/EstrelaMarinaHelou';
import EstrelaMarinaBragante from './svg/EstrelaMarinaBragante';
import LogoMarinaHelou from './svg/LogoMarinaHelou';
import LogoMarinaBragante from './svg/LogoMarinaBragante';

export default function MarinasHeroPortrait() {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 p-6 sm:p-10">
      
      {/* Background organic shape elements (Rosa #F0AECA e Verde #CACB5F) */}
      <div className="absolute top-4 left-1/4 w-72 h-72 bg-[#F0AECA]/40 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-4 right-1/4 w-72 h-72 bg-[#CACB5F]/40 rounded-full blur-2xl -z-10" />

      {/* Main Composite Frame */}
      <div className="bg-white/80 backdrop-blur-md rounded-4xl p-6 sm:p-10 border-2 border-[#8C1A13]/20 shadow-xl relative overflow-hidden">
        
        {/* Stars accents in corners */}
        <div className="absolute top-4 left-4">
          <EstrelaMarinaHelou className="w-8 h-8" />
        </div>
        <div className="absolute bottom-4 right-4">
          <EstrelaMarinaBragante className="w-8 h-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Candidate 1: Marina Helou */}
          <div className="flex flex-col items-center text-center space-y-4 p-4 rounded-3xl bg-[#FFF6D5]/60 border-2 border-[#F1891D]/30 relative">
            <div className="relative">
              {/* Photo Avatar Badge */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#F1891D] to-[#8C1A13] p-1.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#FFF6D5] flex items-center justify-center font-serif font-extrabold text-3xl sm:text-4xl text-[#8C1A13] overflow-hidden relative">
                  <span className="z-10">MH</span>
                  {/* Subtle organic pattern overlay */}
                  <div className="absolute inset-0 bg-[#F1891D]/10 rounded-full" />
                </div>
              </div>
              <span className="absolute -bottom-2 right-0 bg-[#F1891D] text-white font-extrabold text-xs px-3 py-1 rounded-full border-2 border-white shadow-xs">
                4044
              </span>
            </div>

            <LogoMarinaHelou variant="vinho" />
            <p className="text-xs text-slate-700 font-medium max-w-xs leading-relaxed">
              Deputada Estadual (ALESP) • Defesa da infância, sustentabilidade e transparência.
            </p>
          </div>

          {/* Candidate 2: Marina Bragante */}
          <div className="flex flex-col items-center text-center space-y-4 p-4 rounded-3xl bg-[#FFF6D5]/60 border-2 border-[#4F6219]/30 relative">
            <div className="relative">
              {/* Photo Avatar Badge */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#4F6219] to-[#8C1A13] p-1.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[#FFF6D5] flex items-center justify-center font-serif font-extrabold text-3xl sm:text-4xl text-[#8C1A13] overflow-hidden relative">
                  <span className="z-10">MB</span>
                  {/* Subtle organic pattern overlay */}
                  <div className="absolute inset-0 bg-[#4F6219]/10 rounded-full" />
                </div>
              </div>
              <span className="absolute -bottom-2 right-0 bg-[#4F6219] text-white font-extrabold text-xs px-3 py-1 rounded-full border-2 border-white shadow-xs">
                40 444
              </span>
            </div>

            <LogoMarinaBragante variant="vinho" />
            <p className="text-xs text-slate-700 font-medium max-w-xs leading-relaxed">
              Vereadora de São Paulo • 20 anos de experiência pública, clima e redução de desigualdades.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
