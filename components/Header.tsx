'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF6D5]/95 backdrop-blur-md border-b-2 border-[#8C1A13]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <Link href="/suasideias" className="flex items-center gap-3 group">
          <div className="relative h-12 w-48 sm:w-56">
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
        <div className="flex items-center gap-4">
          <Link
            href="/suasideias#como-funciona"
            className="hidden md:inline-flex text-sm font-bold text-[#8C1A13] hover:text-[#F1891D] transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="/suasideias#galeria-de-ideias"
            className="hidden sm:inline-flex text-sm font-bold text-[#8C1A13] hover:text-[#F1891D] transition-colors"
          >
            Explorar Ideias
          </Link>
          
          <Link
            href="/suasideias#formulario-de-envio"
            className="inline-flex items-center gap-2 bg-[#F1891D] hover:bg-[#d9750e] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-all scale-100 hover:scale-105 active:scale-95 border-2 border-[#8C1A13]"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Ideia</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
