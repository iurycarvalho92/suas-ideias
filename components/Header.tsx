'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Send } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF6D5]/95 backdrop-blur-md border-b-2 border-[#8C1A13]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand logo */}
        <Link href="/suasideias" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-[#8C1A13] text-[#FFF6D5] flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-[#F1891D]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-xl tracking-tight text-[#8C1A13] group-hover:text-[#F1891D] transition-colors">
                Marinas por SP
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-[#F0AECA] text-[#8C1A13] rounded-full border border-[#8C1A13]/30">
                Suas Ideias
              </span>
            </div>
            <p className="text-xs text-[#8C1A13]/80 font-medium hidden md:block">
              Plataforma de Participação Cidadã
            </p>
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
