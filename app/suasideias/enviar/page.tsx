'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProposalForm from '@/components/ProposalForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function EnviarIdeiaPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F2] pb-20 pt-8 sm:pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Back Link */}
        <div>
          <Link
            href="/suasideias"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#14447B] hover:text-[#A3B12D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a Página Principal</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="relative h-20 sm:h-24 w-full max-w-md mx-auto">
            <Image
              src="/assets/logos/LogoSuasIdeias.png"
              alt="Suas ideias para as Marinas"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#14447B] text-white text-xs font-bold rounded-full border border-[#A3B12D]">
            <Sparkles className="w-3.5 h-3.5 text-[#A3B12D]" />
            <span>Formulário de Participação Cidadã</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#14447B] tracking-tight">
            Envie sua proposta para São Paulo
          </h1>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Sua experiência e suas ideias podem ajudar a construir políticas públicas melhores. Preencha o formulário abaixo para enviar sua proposta.
          </p>
        </div>

        {/* Dedicated Form Component */}
        <ProposalForm />

      </div>
    </div>
  );
}
