'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarinasHeroDiagramation() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFF6D5] pt-6 sm:pt-10">
      
      {/* Top Left Organic Leaf SVG */}
      <div className="absolute top-0 left-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-90 z-0">
        <Image
          src="/assets/svg/1.svg"
          alt=""
          width={250}
          height={250}
          className="object-contain object-top-left"
        />
      </div>

      {/* Top Right Organic Leaf SVG */}
      <div className="absolute top-0 right-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-90 z-0">
        <Image
          src="/assets/svg/3.svg"
          alt=""
          width={250}
          height={250}
          className="object-contain object-top-right"
        />
      </div>

      {/* Hero Central Content Container */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10">
        
        {/* HUGE HERO LOGO GRAPHIC */}
        <div className="relative h-32 sm:h-52 w-full max-w-2xl mx-auto mb-6 sm:mb-8">
          <Image
            src="/assets/logos/LogoSuasIdeias.png"
            alt="Suas ideias para as Marinas"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Candidate Photos & Center Pill CTAs Row */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 items-end min-h-[380px] sm:min-h-[440px]">
          
          {/* Left Candidate Photo: Marina Helou */}
          <div className="md:col-span-4 flex justify-center md:justify-start z-10 -mb-2">
            <div className="relative w-64 h-80 sm:w-80 sm:h-[420px]">
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
          <div className="md:col-span-4 flex flex-col items-center justify-center gap-4 py-8 md:py-16 z-20">
            <Link
              href="/suasideias/enviar"
              className="w-64 sm:w-72 bg-[#FFF6D5] hover:bg-[#8C1A13] text-[#8C1A13] hover:text-[#FFF6D5] text-center font-extrabold text-base py-3.5 px-6 rounded-full border-2 border-[#8C1A13] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              enviar minha ideia
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-64 sm:w-72 bg-[#FFF6D5] hover:bg-[#8C1A13] text-[#8C1A13] hover:text-[#FFF6D5] text-center font-extrabold text-base py-3.5 px-6 rounded-full border-2 border-[#8C1A13] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              conhecer e apoiar ideias
            </a>
          </div>

          {/* Right Candidate Photo: Marina Bragante */}
          <div className="md:col-span-4 flex justify-center md:justify-end z-10 -mb-2">
            <div className="relative w-64 h-80 sm:w-80 sm:h-[420px]">
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

      {/* BOTTOM WAVE BANNER (FAIXA INFERIOR EM VERDE COM CURVA SUAVE E LOGOS DAS CANDIDATAS) */}
      <div className="relative w-full bg-[#4F6219] text-white pt-6 pb-8 border-t-2 border-[#8C1A13]/20 z-20">
        
        {/* Soft Organic Curved Wave top shape */}
        <div className="absolute -top-6 inset-x-0 h-6 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 Q600,0 1200,40 L1200,40 L0,40 Z" fill="#4F6219" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Banner Lockup: Marina Helou */}
          <div className="flex items-center gap-4 text-white">
            <div className="relative h-14 w-64 sm:w-72">
              <Image
                src="/assets/logos/Prancheta 1.svg"
                alt="Marina Helou 4044"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          </div>

          {/* Right Banner Lockup: Marina Bragante */}
          <div className="flex items-center gap-4 text-white">
            <div className="relative h-14 w-64 sm:w-72">
              <Image
                src="/assets/logos/logo-bragante-horizontal-verde-numero-v2-202607@4x.png"
                alt="Marina Bragante 40 444"
                fill
                className="object-contain object-right brightness-0 invert"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
