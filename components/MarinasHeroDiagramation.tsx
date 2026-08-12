'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarinasHeroDiagramation() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FFF6D5] pt-1 sm:pt-2">
      
      {/* Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        
        {/* HUGE CENTRAL HERO LOGO GRAPHIC (+20% Scale) */}
        <div className="relative h-44 sm:h-72 lg:h-80 w-full max-w-5xl mx-auto pt-1 -mb-24 sm:-mb-44">
          <Image
            src="/assets/logos/LogoSuasIdeias.png"
            alt="Suas ideias para as Marinas"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ============================================================ */}
        {/* DESKTOP LAYOUT (md:grid 3 columns: Photo - Buttons - Photo) */}
        {/* ============================================================ */}
        <div className="hidden md:grid md:grid-cols-12 items-end">
          
          {/* Left Photo: Marina Helou */}
          <div className="md:col-span-4 flex justify-start z-10 -mb-10">
            <div className="relative w-80 h-[460px] lg:w-96 lg:h-[510px]">
              <Image
                src="/assets/fotos/MH-03.png"
                alt="Marina Helou"
                fill
                className="object-cover object-top filter drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Center Action Buttons - Tight & Well Distributed */}
          <div className="md:col-span-4 flex flex-col items-center justify-center gap-3 pb-12 lg:pb-16 z-20 -mt-16 lg:-mt-24">
            <Link
              href="/suasideias/enviar"
              className="w-64 lg:w-72 bg-[#14447B] hover:bg-[#0D2E55] text-white text-center font-bold text-sm lg:text-base py-3 px-6 rounded-full border-2 border-[#A3B12D] shadow-md transition-all scale-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Enviar minha ideia</span>
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-64 lg:w-72 bg-[#FFF6D5] hover:bg-[#14447B] text-[#14447B] hover:text-white text-center font-bold text-sm lg:text-base py-3 px-6 rounded-full border-2 border-[#14447B] shadow-sm transition-all scale-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Conhecer e apoiar ideias</span>
            </a>
          </div>

          {/* Right Photo: Marina Bragante */}
          <div className="md:col-span-4 flex justify-end z-10 -mb-10">
            <div className="relative w-80 h-[460px] lg:w-96 lg:h-[510px]">
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

        {/* ============================================================ */}
        {/* MOBILE LAYOUT (Tight Gap & Side-by-Side Photos & CTAs)       */}
        {/* ============================================================ */}
        <div className="flex md:hidden flex-col items-center gap-3 pt-0">
          
          {/* Action Buttons (Positioned close to logo on mobile) */}
          <div className="flex flex-col items-center gap-2 w-full z-20 px-4 -mt-2">
            <Link
              href="/suasideias/enviar"
              className="w-full max-w-xs bg-[#14447B] hover:bg-[#0D2E55] text-white text-center font-bold text-xs py-2.5 px-5 rounded-full border border-[#A3B12D] shadow-sm transition-all active:scale-95"
            >
              Enviar minha ideia
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-full max-w-xs bg-[#FFF6D5] hover:bg-[#14447B] text-[#14447B] text-center font-bold text-xs py-2.5 px-5 rounded-full border border-[#14447B] shadow-xs transition-all active:scale-95"
            >
              Conhecer e apoiar ideias
            </a>
          </div>

          {/* Mobile Photos: SIDE BY SIDE standing on the green wave */}
          <div className="flex flex-row items-end justify-center gap-2 w-full -mb-8 z-10 pt-1">
            
            {/* Marina Helou (Left) */}
            <div className="relative w-36 h-52 sm:w-44 sm:h-60">
              <Image
                src="/assets/fotos/MH-03.png"
                alt="Marina Helou"
                fill
                className="object-cover object-top filter drop-shadow-lg"
                priority
              />
            </div>

            {/* Marina Bragante (Right) */}
            <div className="relative w-36 h-52 sm:w-44 sm:h-60">
              <Image
                src="/assets/fotos/MAB 02.png"
                alt="Marina Bragante"
                fill
                className="object-cover object-top filter drop-shadow-lg"
                priority
              />
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* ORGANIC GREEN WAVE BANNER (#A3B12D)                          */}
      {/* ============================================================ */}
      <div className="relative w-full bg-[#A3B12D] text-[#14447B] pt-8 pb-10 z-20 -mt-6 sm:-mt-10">
        
        {/* Soft Organic Wave Divider Top Transition */}
        <div className="absolute -top-8 inset-x-0 h-8 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 C300,10 900,80 1200,20 L1200,60 L0,60 Z" fill="#A3B12D" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-6">
          
          {/* DESKTOP LOGOS: Horizontal Lockups Side by Side */}
          <div className="hidden md:flex md:flex-row items-center justify-between gap-10 pt-2">
            
            {/* Marina Helou Lockup */}
            <div className="relative h-20 sm:h-24 w-80 sm:w-[380px]">
              <Image
                src="/assets/logos/lockup-marina-helou-white.png"
                alt="Marina Helou 4044 Deputada Federal"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Marina Bragante Lockup */}
            <div className="relative h-24 sm:h-28 w-96 sm:w-[480px]">
              <Image
                src="/assets/logos/lockup-marina-bragante-white.png"
                alt="Marina Bragante 40444 Deputada Estadual"
                fill
                className="object-contain object-right"
                priority
              />
            </div>

          </div>

          {/* MOBILE LOGOS: Vertical Version SIDE BY SIDE (Marina Helou on Left, Marina Bragante on Right) */}
          <div className="flex md:hidden flex-row items-center justify-center gap-6 pt-2">
            
            {/* Marina Helou 4044 (Left Candidate Logo) */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
              <Image
                src="/assets/logos/logo-marina-vertical-verde-numero-v2-202607@4x.png"
                alt="Marina Helou 4044 Deputada Federal"
                fill
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>

            {/* Marina Bragante 40444 (Right Candidate Logo) */}
            <div className="relative h-28 w-28 sm:h-32 sm:w-32">
              <Image
                src="/assets/logos/logo-bragante-vertical-bege-numero-v2-202607@4x.png"
                alt="Marina Bragante 40444 Deputada Estadual"
                fill
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>

          </div>

          {/* DESCRIPTIVE COPY */}
          <div className="max-w-3xl mx-auto text-center pt-4 border-t border-[#14447B]/20">
            <p className="text-[#14447B] text-sm sm:text-lg font-sans font-semibold leading-relaxed">
              Política se faz com presença e escuta de quem vive a realidade todos os dias. Compartilhe suas ideias e ajude a construir as propostas das campanhas de Marina Helou para deputada federal e Marina Bragante para deputada estadual.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
