'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarinasHeroDiagramation() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FAF8F2] pt-4 sm:pt-8">
      
      {/* Top Left Organic Leaf SVG in logo green (#A3B12D) */}
      <div className="absolute top-0 left-0 w-44 sm:w-72 h-44 sm:h-72 pointer-events-none opacity-80 z-0">
        <Image
          src="/assets/svg/1.svg"
          alt=""
          width={300}
          height={300}
          className="object-contain object-top-left"
        />
      </div>

      {/* Top Right Organic Leaf SVG in logo green (#A3B12D) */}
      <div className="absolute top-0 right-0 w-44 sm:w-72 h-44 sm:h-72 pointer-events-none opacity-80 z-0">
        <Image
          src="/assets/svg/3.svg"
          alt=""
          width={300}
          height={300}
          className="object-contain object-top-right"
        />
      </div>

      {/* Hero Central Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        
        {/* HUGE HERO LOGO GRAPHIC - Significantly Enlarged */}
        <div className="relative h-44 sm:h-64 w-full max-w-3xl mx-auto mb-2">
          <Image
            src="/assets/logos/LogoSuasIdeias.png"
            alt="Suas ideias para as Marinas"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Candidate Photos & Center Pill CTAs Row (Tighter vertical spacing) */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 items-end min-h-[340px] sm:min-h-[400px] -mt-2">
          
          {/* Left Candidate Photo: Marina Helou */}
          <div className="md:col-span-4 flex justify-center md:justify-start z-10 -mb-3">
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
          <div className="md:col-span-4 flex flex-col items-center justify-center gap-3.5 pb-8 md:pb-14 z-20">
            <Link
              href="/suasideias/enviar"
              className="w-64 sm:w-72 bg-[#FAF8F2] hover:bg-[#14447B] text-[#14447B] hover:text-white text-center font-extrabold text-base py-3.5 px-6 rounded-full border-2 border-[#14447B] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              enviar minha ideia
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-64 sm:w-72 bg-[#FAF8F2] hover:bg-[#14447B] text-[#14447B] hover:text-white text-center font-extrabold text-base py-3.5 px-6 rounded-full border-2 border-[#14447B] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              conhecer e apoiar ideias
            </a>
          </div>

          {/* Right Candidate Photo: Marina Bragante */}
          <div className="md:col-span-4 flex justify-center md:justify-end z-10 -mb-3">
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

      {/* ORGANIC GREEN WAVE BANNER (#A3B12D - Verde Dourado do Logo) */}
      <div className="relative w-full bg-[#A3B12D] text-[#14447B] pt-8 pb-10 z-20">
        
        {/* Soft Organic Wave Divider Top Transition */}
        <div className="absolute -top-8 inset-x-0 h-8 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 C300,10 900,80 1200,20 L1200,60 L0,60 Z" fill="#A3B12D" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-8">
          
          {/* STANDARDIZED CANDIDATE NAMES & NUMBERS LOCKUPS (Same Horizontal Version & Size) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2">
            
            {/* Standardized Lockup 1: Marina Helou */}
            <div className="flex items-center gap-3 bg-[#14447B] text-white px-6 py-3.5 rounded-2xl shadow-md border-2 border-white/20 w-full sm:w-auto justify-center">
              <div className="flex flex-col leading-none text-left">
                <span className="font-serif font-extrabold text-xl tracking-tight">
                  marina helou
                </span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D7E365] mt-0.5">
                  DEPUTADA FEDERAL
                </span>
              </div>
              <div className="h-8 w-0.5 bg-white/30 mx-1" />
              <span className="font-sans font-black text-3xl tracking-tight text-white">
                4044
              </span>
            </div>

            {/* Standardized Lockup 2: Marina Bragante */}
            <div className="flex items-center gap-3 bg-[#14447B] text-white px-6 py-3.5 rounded-2xl shadow-md border-2 border-white/20 w-full sm:w-auto justify-center">
              <div className="flex flex-col leading-none text-left">
                <span className="font-serif font-extrabold text-xl tracking-tight">
                  marina bragante
                </span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D7E365] mt-0.5">
                  DEPUTADA ESTADUAL
                </span>
              </div>
              <div className="h-8 w-0.5 bg-white/30 mx-1" />
              <span className="font-sans font-black text-3xl tracking-tight text-white">
                40 444
              </span>
            </div>

          </div>

          {/* UPDATED DESCRIPTIVE COPY INSIDE THE GREEN BANNER */}
          <div className="max-w-3xl mx-auto text-center pt-2 border-t border-[#14447B]/20">
            <p className="text-[#14447B] text-base sm:text-lg font-serif font-semibold leading-relaxed">
              "Política se faz com presença e escuta de quem vive a realidade todos os dias. Compartilhe suas ideias e ajude a construir as propostas das campanhas de Marina Helou para deputada federal e Marina Bragante para deputada estadual."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
