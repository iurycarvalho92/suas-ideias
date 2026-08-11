'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Send, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-emerald-100/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand logo & tagline */}
        <Link href="/suasideias" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                Marinas por SP
              </span>
              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/80">
                Suas Ideias
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block">
              Coragem pra fazer diferente • Marina Helou & Marina Bragante
            </p>
          </div>
        </Link>

        {/* Right CTA links */}
        <div className="flex items-center gap-3">
          <Link
            href="/suasideias#as-marinas"
            className="hidden lg:inline-flex text-sm font-semibold text-slate-600 hover:text-emerald-600 px-3 py-2 transition-colors"
          >
            As Marinas
          </Link>
          <Link
            href="/suasideias#nossas-prioridades"
            className="hidden md:inline-flex text-sm font-semibold text-slate-600 hover:text-emerald-600 px-3 py-2 transition-colors"
          >
            Nossas Prioridades
          </Link>
          <Link
            href="/suasideias#galeria-de-ideias"
            className="hidden sm:inline-flex text-sm font-semibold text-slate-600 hover:text-emerald-600 px-3 py-2 transition-colors"
          >
            Explorar Ideias
          </Link>
          
          <Link
            href="/suasideias#formulario-de-envio"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all scale-100 hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Minha Ideia</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
