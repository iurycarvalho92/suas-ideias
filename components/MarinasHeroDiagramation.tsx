'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarinasHeroDiagramation() {
  return (
    <div className="relative w-full overflow-hidden bg-[#FEF6D5] pt-1 sm:pt-2">
      
      {/* Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        
        {/* CENTRAL HERO LOGO GRAPHIC */}
        <div className="relative h-20 sm:h-32 lg:h-36 w-full max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-16 mb-2 md:-mb-32 lg:-mb-36">
          <Image
            src="/assets/logos/LogoSuasIdeias.png"
            alt="Suas ideias para as Marinas"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* ============================================================ */}
        {/* DESKTOP LAYOUT                                               */}
        {/* ============================================================ */}
        <div className="hidden md:grid md:grid-cols-12 items-end max-w-5xl mx-auto">
          
          {/* Left Photo: Marina Helou */}
          <div className="md:col-span-4 flex justify-end z-10 -mb-10 pr-2 lg:pr-6">
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

          {/* Center Action Buttons (Subidos no desktop) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center gap-2.5 pb-28 lg:pb-36 z-20 -mt-28 lg:-mt-36">
            <Link
              href="/enviar"
              className="w-52 lg:w-56 bg-[#F28919] hover:bg-[#d9750e] text-white text-center font-bold text-xs py-2.5 px-4 rounded-full border border-[#506324] shadow-md transition-all scale-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Enviar minha ideia</span>
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-52 lg:w-56 bg-[#FEF6D5] hover:bg-[#506324] text-[#506324] hover:text-white text-center font-bold text-xs py-2.5 px-4 rounded-full border border-[#506324] shadow-xs transition-all scale-100 hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>Conhecer e apoiar ideias</span>
            </a>
          </div>

          {/* Right Photo: Marina Bragante */}
          <div className="md:col-span-4 flex justify-start z-10 -mb-10 pl-2 lg:pl-6">
            <div className="relative w-[350px] h-[500px] lg:w-[420px] lg:h-[560px]">
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
        {/* MOBILE LAYOUT                                                */}
        {/* ============================================================ */}
        <div className="flex md:hidden flex-col items-center gap-2 pt-2">
          
          {/* Action Buttons (Abaixo do logo no mobile, sem sobreposição) */}
          <div className="flex flex-col items-center gap-2 w-full z-20 px-4 mt-2 mb-3">
            <Link
              href="/enviar"
              className="w-52 bg-[#F28919] hover:bg-[#d9750e] text-white text-center font-bold text-[11px] py-2 px-4 rounded-full border border-[#506324] shadow-sm transition-all active:scale-95"
            >
              Enviar minha ideia
            </Link>

            <a
              href="#galeria-de-ideias"
              className="w-52 bg-[#FEF6D5] hover:bg-[#506324] text-[#506324] text-center font-bold text-[11px] py-2 px-4 rounded-full border border-[#506324] shadow-xs transition-all active:scale-95"
            >
              Conhecer e apoiar ideias
            </a>
          </div>

          {/* Mobile Photos */}
          <div className="flex flex-row items-end justify-center gap-2 w-full -mb-8 z-10 pt-1">
            <div className="relative w-36 h-52 sm:w-44 sm:h-60">
              <Image
                src="/assets/fotos/MH-03.png"
                alt="Marina Helou"
                fill
                className="object-cover object-top filter drop-shadow-lg"
                priority
              />
            </div>

            <div className="relative w-[160px] h-[230px] sm:w-[210px] sm:h-[265px]">
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
      {/* ORGANIC GREEN WAVE BANNER (#506324)                          */}
      {/* ============================================================ */}
      <div className="relative w-full bg-[#506324] text-[#FEF6D5] pt-6 pb-6 sm:pb-8 z-20 -mt-6 md:-mt-16">
        
        {/* Soft Organic Wave Divider Top Transition */}
        <div className="absolute -top-8 inset-x-0 h-8 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 C300,10 900,80 1200,20 L1200,60 L0,60 Z" fill="#506324" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-10 space-y-4">
          
          {/* DESKTOP LOGOS */}
          <div className="hidden md:flex md:flex-row items-center justify-between gap-10 pt-2">
            <div className="relative h-20 sm:h-24 w-80 sm:w-[380px]">
              <Image
                src="/assets/logos/lockup-marina-helou-white.png"
                alt="Marina Helou 4044 Deputada Federal"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

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

          {/* MOBILE LOGOS */}
          <div className="flex md:hidden flex-row items-center justify-center gap-4 pt-0 -mt-2">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28">
              <Image
                src="/assets/logos/lockup-marina-helou-vertical.png"
                alt="Marina Helou 4044 Deputada Federal"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="relative h-[116px] w-[116px] sm:h-[132px] sm:w-[132px]">
              <Image
                src="/assets/logos/lockup-marina-bragante-vertical.png"
                alt="Marina Bragante 40444 Deputada Estadual"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* DESCRIPTIVE COPY */}
          <div className="max-w-3xl mx-auto text-center pt-[50px] mt-[50px] border-t border-[#FEF6D5]/20">
            <p className="text-[#FEF6D5] text-sm sm:text-base font-sans font-semibold leading-relaxed">
              Política se faz com presença, escutando de quem vive a realidade todos os dias! Compartilhe suas ideias e ajude a construir as propostas das campanhas de Marina Helou para deputada federal e Marina Bragante para deputada estadual.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
