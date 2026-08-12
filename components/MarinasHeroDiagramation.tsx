'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarinasHeroDiagramation() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFF6D5] pt-0">
      
      {/* Clean Hero Container - Ultra-tight overlap to pull everything up */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        
        {/* HERO LOGO GRAPHIC */}
        <div className="relative h-44 sm:h-60 w-full max-w-4xl mx-auto pt-0 -mb-28 sm:-mb-44">
          <Image
            src="/assets/logos/LogoSuasIdeias.png"
            alt="Suas ideias para as Marinas"
            fill
            className="object-contain object-top"
            priority
          />
        </div>

        {/* Candidate Photos & Discrete CTAs (PULLED WAY UP UNDER THE LOGO) */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 items-end">
          
          {/* Left Candidate Photo: Marina Helou */}
          <div className="md:col-span-4 flex justify-center md:justify-start z-10 -mb-10 sm:-mb-14">
            <div className="relative w-72 h-96 sm:w-96 sm:h-[490px]">
              <Image
                src="/assets/fotos/MH-03.png"
                alt="Marina Helou"
                fill
                className="object-cover object-top filter drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Center Action Buttons (PULLED WAY UP & DISCREET) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center gap-2 pb-14 sm:pb-24 z-20 -mt-16 sm:-mt-32">
            
            {/* Primary Action Button */}
            <Link
              href="/suasideias/enviar"
              className="w-56 sm:w-64 bg-[#14447B] hover:bg-[#0D2E55] text-white text-center font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full border border-[#A3B12D] shadow-sm transition-all scale-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Enviar minha ideia</span>
            </Link>

            {/* Secondary Action Button */}
            <a
              href="#galeria-de-ideias"
              className="w-56 sm:w-64 bg-[#FFF6D5] hover:bg-[#14447B] text-[#14447B] hover:text-white text-center font-bold text-xs sm:text-sm py-2.5 px-5 rounded-full border border-[#14447B] shadow-xs transition-all scale-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Conhecer e apoiar ideias</span>
            </a>
          </div>

          {/* Right Candidate Photo: Marina Bragante */}
          <div className="md:col-span-4 flex justify-center md:justify-end z-10 -mb-10 sm:-mb-14">
            <div className="relative w-72 h-96 sm:w-96 sm:h-[490px]">
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

      {/* ORGANIC GREEN WAVE BANNER (#A3B12D) - PULLED WAY UP */}
      <div className="relative w-full bg-[#A3B12D] text-[#14447B] pt-8 pb-10 z-20 -mt-6 sm:-mt-12">
        
        {/* Soft Organic Wave Divider Top Transition */}
        <div className="absolute -top-8 inset-x-0 h-8 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 C300,10 900,80 1200,20 L1200,60 L0,60 Z" fill="#A3B12D" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-6">
          
          {/* CANDIDATE LOGOS */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 pt-2">
            
            {/* Marina Helou Lockup */}
            <div className="relative h-20 sm:h-24 w-80 sm:w-[380px]">
              <Image
                src="/assets/logos/lockup-marina-helou-white.png"
                alt="Marina Helou 4044 Deputada Federal"
                fill
                className="object-contain object-center md:object-left"
                priority
              />
            </div>

            {/* Marina Bragante Lockup */}
            <div className="relative h-24 sm:h-28 w-96 sm:w-[480px]">
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
