'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FEF6D5]/95 backdrop-blur-md border-b-2 border-[#506324]/15 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Official Brand Logo */}
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
            className="hidden md:inline-flex text-sm font-bold text-[#506324] hover:text-[#F28919] transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/suasideias#galeria-de-ideias"
            className="hidden sm:inline-flex text-sm font-bold text-[#506324] hover:text-[#F28919] transition-colors"
          >
            Explorar Ideias
          </Link>
          
          <Link
            href="/suasideias/enviar"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F28919] hover:bg-[#d9750e] text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full shadow-md transition-all border border-[#506324] shrink-0 active:scale-95"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span>Enviar Ideia</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
