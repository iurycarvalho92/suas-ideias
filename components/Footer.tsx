'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';

export default function Footer() {
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      "Conheça e apoie propostas para São Paulo na plataforma 'Suas ideias para as Marinas': https://marinasporsp.com.br/suasideias"
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#506324] text-[#FEF6D5] border-t-4 border-[#CACB60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative h-14 w-60">
              <Image
                src="/assets/logos/LogoSuasIdeias.png"
                alt="Suas ideias para as Marinas"
                fill
                className="object-contain object-left brightness-200 invert-0"
              />
            </div>
            <p className="text-[#FEF6D5]/90 text-sm leading-relaxed max-w-md">
              Plataforma de participação cidadã para ouvir quem vive a realidade de São Paulo todos os dias e construir propostas para o nosso futuro.
            </p>
            <div className="pt-2">
              <button
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-xs px-5 py-2.5 rounded-full border-2 border-[#FEF6D5] transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compartilhar no WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#CACB60] font-bold tracking-wide uppercase text-xs">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-[#FEF6D5]/80">
              <li>
                <Link href="/suasideias#como-funciona" className="hover:text-[#CACB60] transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/suasideias#galeria-de-ideias" className="hover:text-[#CACB60] transition-colors">
                  Galeria de Propostas
                </Link>
              </li>
              <li>
                <Link href="/suasideias/enviar" className="hover:text-[#CACB60] transition-colors">
                  Enviar Nova Proposta
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Notice */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#CACB60] font-bold tracking-wide uppercase text-xs">
              Moderação & Transparência
            </h4>
            <p className="text-xs text-[#FEF6D5]/80 leading-relaxed">
              Todas as propostas passam por análise rápida antes de ir ao ar para garantir um ambiente seguro, respeitoso e construtivo.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-[#FEF6D5]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FEF6D5]/70 gap-4">
          <p>© 2026 Marinas por SP. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-[#F28919] fill-[#F28919] inline" /> para São Paulo
          </p>
        </div>
      </div>
    </footer>
  );
}
