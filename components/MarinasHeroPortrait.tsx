'use client';

import React from 'react';
import Image from 'next/image';
import { Award, CheckCircle2 } from 'lucide-react';

export default function MarinasHeroPortrait() {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 px-2 sm:px-4">
      
      {/* Background glow effects with logo colors */}
      <div className="absolute top-4 left-10 w-80 h-80 bg-[#A3B12D]/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-4 right-10 w-80 h-80 bg-[#14447B]/20 rounded-full blur-3xl -z-10" />

      {/* Main Hero Photo Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-4xl p-6 sm:p-10 border-2 border-[#14447B]/20 shadow-2xl relative overflow-hidden">
        
        {/* Decorative background SVG elements */}
        <div className="absolute top-2 right-2 opacity-15 pointer-events-none">
          <Image src="/assets/svg/3.svg" alt="" width={120} height={120} />
        </div>
        <div className="absolute bottom-2 left-2 opacity-15 pointer-events-none">
          <Image src="/assets/svg/8.svg" alt="" width={120} height={120} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Candidate 1: Marina Helou */}
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#FAF8F2] border-2 border-[#14447B]/20 hover:border-[#14447B] transition-all shadow-md group relative overflow-hidden">
            
            {/* Top Star Accent */}
            <div className="absolute top-4 right-4 w-7 h-7">
              <Image src="/assets/svg/estrela-mh.svg" alt="Estrela MH" width={28} height={28} />
            </div>

            {/* Large Prominent Photo */}
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-[#14447B] mb-5 group-hover:scale-102 transition-transform">
              <Image
                src="/assets/fotos/MH-03.png"
                alt="Marina Helou"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#14447B]/90 via-[#14447B]/40 to-transparent p-3 pt-8 text-white">
                <span className="bg-[#A3B12D] text-[#14447B] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  4044
                </span>
              </div>
            </div>

            {/* Title & Info */}
            <h3 className="font-serif font-extrabold text-[#14447B] text-2xl tracking-tight mb-1">
              MARINA HELOU
            </h3>
            <span className="text-xs font-sans font-bold tracking-widest text-[#A3B12D] uppercase mb-3">
              Deputada Federal 4044
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-xs">
              Deputada Estadual (ALESP) • Mais de 20 leis aprovadas pela Primeira Infância e Sustentabilidade.
            </p>
          </div>

          {/* Candidate 2: Marina Bragante */}
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-[#FAF8F2] border-2 border-[#14447B]/20 hover:border-[#14447B] transition-all shadow-md group relative overflow-hidden">
            
            {/* Top Star Accent */}
            <div className="absolute top-4 right-4 w-7 h-7">
              <Image src="/assets/svg/estrela-mb.svg" alt="Estrela MB" width={28} height={28} />
            </div>

            {/* Large Prominent Photo */}
            <div className="relative w-48 h-60 sm:w-56 sm:h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-[#14447B] mb-5 group-hover:scale-102 transition-transform">
              <Image
                src="/assets/fotos/MAB 02.png"
                alt="Marina Bragante"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#14447B]/90 via-[#14447B]/40 to-transparent p-3 pt-8 text-white">
                <span className="bg-[#A3B12D] text-[#14447B] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  40 444
                </span>
              </div>
            </div>

            {/* Title & Info */}
            <h3 className="font-serif font-extrabold text-[#14447B] text-2xl tracking-tight mb-1">
              MARINA BRAGANTE
            </h3>
            <span className="text-xs font-sans font-bold tracking-widest text-[#A3B12D] uppercase mb-3">
              Deputada Estadual 40 444
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed max-w-xs">
              Vereadora de São Paulo • 20 anos de gestão pública, Bancada do Clima e combate às desigualdades.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
