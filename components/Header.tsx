'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF6D5]/95 backdrop-blur-md border-b-2 border-[#14447B]/15 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Official Brand Logo - Scaled for Mobile & Desktop */}
        <Link href="/suasideias" className="flex items-center gap-2 group shrink-0">
          <div className="relative h-12 w-48 sm:h-16 sm:w-72 md:w-80">
            <Image
              src="/assets/logos/LogoSuasIdeias.png"
              alt="Suas ideias para as Marinas"
              fill
              className="object-contain object-left group-hover:scale-105 transition-transform"
              priority
            />
          </div>
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/suasideias#como-funciona"
            className="hidden md:inline-flex text-sm font-bold text-[#14447B] hover:text-[#A3B12D] transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/suasideias#galeria-de-ideias"
            className="hidden sm:inline-flex text-sm font-bold text-[#14447B] hover:text-[#A3B12D] transition-colors"
          >
            Explorar Ideias
          </Link>
          
          <Link
            href="/suasideias/enviar"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#14447B] hover:bg-[#0D2E55] text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-md transition-all border border-[#A3B12D] shrink-0"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A3B12D]" />
            <span>Enviar Ideia</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
