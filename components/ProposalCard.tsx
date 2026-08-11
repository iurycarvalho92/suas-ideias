'use client';

import React from 'react';
import Link from 'next/link';
import { Proposal } from '@/lib/types';
import { Heart, MapPin, ArrowRight, User } from 'lucide-react';

interface ProposalCardProps {
  proposal: Proposal;
}

export default function ProposalCard({ proposal }: ProposalCardProps) {
  const primeiroNome = proposal.nome.split(' ')[0];
  const descricaoResumida = proposal.descricao.length > 75 
    ? `${proposal.descricao.substring(0, 75).trim()}...` 
    : proposal.descricao;

  // Theme badge styling using official brand palette
  const getBadgeStyle = (pauta: string) => {
    switch (pauta) {
      case 'Educação':
        return 'bg-[#16437F]/10 text-[#16437F] border-[#16437F]/30';
      case 'Saúde':
        return 'bg-[#F0AECA] text-[#8C1A13] border-[#8C1A13]/20';
      case 'Meio Ambiente & Clima':
        return 'bg-[#4F6219]/10 text-[#4F6219] border-[#4F6219]/30';
      case 'Mobilidade Urbana':
        return 'bg-[#F1891D]/10 text-[#F1891D] border-[#F1891D]/30';
      case 'Segurança':
        return 'bg-[#8C1A13]/10 text-[#8C1A13] border-[#8C1A13]/30';
      case 'Economia & Emprego':
        return 'bg-[#CACB5F]/30 text-[#8C1A13] border-[#8C1A13]/20';
      case 'Cidadania & Direitos':
        return 'bg-[#F0AECA]/50 text-[#8C1A13] border-[#8C1A13]/30';
      default:
        return 'bg-[#FFF6D5] text-[#8C1A13] border-[#8C1A13]/20';
    }
  };

  return (
    <div className="group bg-white rounded-3xl p-6 border-2 border-[#8C1A13]/15 hover:border-[#8C1A13] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        
        {/* Top Pauta Badge & Apoios Count */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getBadgeStyle(proposal.pauta)}`}>
            {proposal.pauta}
          </span>
          <div className="flex items-center gap-1.5 bg-[#FFF6D5] border border-[#8C1A13]/20 text-[#8C1A13] text-xs font-bold px-2.5 py-1 rounded-full">
            <Heart className="w-3.5 h-3.5 text-[#8C1A13] fill-[#8C1A13]" />
            <span>{proposal.apoiosCount} {proposal.apoiosCount === 1 ? 'apoio' : 'apoios'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[#8C1A13] text-xl leading-snug group-hover:text-[#F1891D] transition-colors mb-2.5 line-clamp-2">
          {proposal.titulo}
        </h3>

        {/* Short Description (75 chars) */}
        <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {descricaoResumida}
        </p>

      </div>

      <div>
        {/* Author & City Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-600 pt-3 border-t border-[#8C1A13]/10 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#8C1A13]" />
            <span>Por <strong className="text-[#8C1A13]">{primeiroNome}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#4F6219]" />
            <span className="truncate text-slate-700">{proposal.cidade}</span>
          </div>
        </div>

        {/* CTA Link */}
        <Link
          href={`/suasideias/proposta/${proposal.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#FFF6D5] hover:bg-[#8C1A13] text-[#8C1A13] hover:text-[#FFF6D5] font-bold text-xs py-3 px-4 rounded-2xl transition-all duration-200 border-2 border-[#8C1A13]"
        >
          <span>Conhecer e apoiar proposta</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
