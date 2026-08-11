'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';

export default function Footer() {
  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      "Tô com as Marinas! Conheça as propostas de Marina Helou e Marina Bragante para São Paulo e para o Brasil e envie suas ideias: https://marinasporsp.com.br/suasideias"
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Marinas por SP
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              <strong>Coragem pra fazer diferente.</strong> Marina Helou e Marina Bragante estão juntas para proteger as pessoas, cuidar das cidades e preparar São Paulo para os desafios do presente e do futuro.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={shareWhatsApp}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-full transition-all shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compartilhar no WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide">Plataforma Suas Ideias</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/suasideias#como-funciona" className="hover:text-emerald-400 transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/suasideias#galeria-de-ideias" className="hover:text-emerald-400 transition-colors">
                  Galeria de Propostas
                </Link>
              </li>
              <li>
                <Link href="/suasideias#formulario-de-envio" className="hover:text-emerald-400 transition-colors">
                  Enviar Nova Proposta
                </Link>
              </li>
              <li>
                <Link href="/suasideias/admin" className="hover:text-emerald-400 transition-colors">
                  Painel de Moderação
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Notice */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide">Participação Cidadã</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Todas as propostas enviadas nesta plataforma passam por uma análise rápida antes da publicação pública para garantir um espaço seguro, respeitoso e construtivo de debate.
            </p>
            <p className="text-xs text-slate-500 pt-2">
              Plataforma desenvolvida para a pré-campanha e campanha 2026.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Marinas por SP. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline" /> para São Paulo
          </p>
        </div>
      </div>
    </footer>
  );
}
