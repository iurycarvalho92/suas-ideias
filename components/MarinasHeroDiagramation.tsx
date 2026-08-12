'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarinasHeroDiagramation() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFF6D5] pt-0">
      
      {/* Clean Hero Container - No background SVGs */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        
        {/* HUGE HERO LOGO GRAPHIC - Extremely tight vertical spacing to photos */}
        <div className="relative h-44 sm:h-64 w-full max-w-3xl mx-auto -mb-16 sm:-mb-24">
          <Image
            src="/assets/logos/LogoSuasIdeias.png"
            alt="Suas ideias para as Marinas"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Candidate Photos & Center Pill CTAs Row (Tightened vertically against the logo) */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 items-end">
          
          {/* Left Candidate Photo: Marina Helou (standing directly on green banner) */}
          <div className="md:col-span-4 flex justify-center md:justify-start z-10 -mb-8 sm:-mb-10">
            <div className="relative w-64 h-80 sm:w-80 sm:h-[430px]">
              <Image
                src="/assets/fotos/MH-03.png"
                alt="Marina Helou"
                fill
                className="object-cover object-top filter drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Center Pill Action Buttons */}
          <div className="md:col-span-4 flex flex-col items-center justify-center gap-3 pb-6 sm:pb-8 z-20">
            <Link
              href="/suasideias/enviar"
              className="w-64 sm:w-72 bg-[#FFF6D5] hover:bg-[#14447B] text-[#14447B] hover:text-white text-center font-extrabold text-base py-3.5 px-6 rounded-full border-2 border-[#14447B] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              enviar minha ideia
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-64 sm:w-72 bg-[#FFF6D5] hover:bg-[#14447B] text-[#14447B] hover:text-white text-center font-extrabold text-base py-3.5 px-6 rounded-full border-2 border-[#14447B] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              conhecer e apoiar ideias
            </a>
          </div>

          {/* Right Candidate Photo: Marina Bragante (standing directly on green banner) */}
          <div className="md:col-span-4 flex justify-center md:justify-end z-10 -mb-8 sm:-mb-10">
            <div className="relative w-64 h-80 sm:w-80 sm:h-[430px]">
              <Image
                src="/assets/fotos/MAB 02.png"
                alt="Marina Bragante"
                fill
                className="object-cover object-top filter drop-shadow-xl"
                priority
              />
            </div>
          </div>

        </div>

      </div>

      {/* ORGANIC GREEN WAVE BANNER (#A3B12D) */}
      <div className="relative w-full bg-[#A3B12D] text-[#14447B] pt-8 pb-10 z-20">
        
        {/* Soft Organic Wave Divider Top Transition */}
        <div className="absolute -top-8 inset-x-0 h-8 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 C300,10 900,80 1200,20 L1200,60 L0,60 Z" fill="#A3B12D" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-6">
          
          {/* CANDIDATE LOGOS - Equalized visual sizes */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 pt-2">
            
            {/* Marina Helou Lockup */}
            <div className="relative h-16 sm:h-20 w-72 sm:w-[330px]">
              <Image
                src="/assets/logos/lockup-marina-helou-white.png"
                alt="Marina Helou 4044 Deputada Federal"
                fill
                className="object-contain object-center md:object-left"
                priority
              />
            </div>

            {/* Marina Bragante Lockup */}
            <div className="relative h-20 sm:h-24 w-80 sm:w-[420px]">
              <Image
                src="/assets/logos/lockup-marina-bragante-white.png"
                alt="Marina Bragante 40444 Deputada Estadual"
                fill
                className="object-contain object-center md:object-right"
                priority
              />
            </div>

          </div>

          {/* DESCRIPTIVE COPY - WITHOUT QUOTATION MARKS & SANS-SERIF FONT */}
          <div className="max-w-3xl mx-auto text-center pt-4 border-t border-[#14447B]/20">
            <p className="text-[#14447B] text-base sm:text-lg font-sans font-semibold leading-relaxed">
              Política se faz com presença e escuta de quem vive a realidade todos os dias. Compartilhe suas ideias e ajude a construir as propostas das campanhas de Marina Helou para deputada federal e Marina Bragante para deputada estadual.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
