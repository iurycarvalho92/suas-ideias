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
        return 'bg-[#506324]/10 text-[#506324] border-[#506324]/30';
      case 'Saúde':
        return 'bg-[#CACB60]/30 text-[#506324] border-[#CACB60]/60';
      case 'Meio Ambiente & Clima':
        return 'bg-[#506324] text-[#FEF6D5] border-[#506324] font-bold';
      case 'Mobilidade Urbana':
        return 'bg-[#F28919]/15 text-[#506324] border-[#F28919]/40';
      case 'Segurança':
        return 'bg-[#3A491A] text-white border-[#3A491A]';
      default:
        return 'bg-[#FEF6D5] text-[#506324] border-[#506324]/20';
    }
  };

  return (
    <div className="group bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#506324]/20 hover:border-[#506324] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        
        {/* Top Pauta Badge & Apoios Count */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getBadgeStyle(proposal.pauta)}`}>
            {proposal.pauta}
          </span>
          <div className="flex items-center gap-1.5 bg-[#FEF6D5] border border-[#506324]/20 text-[#506324] text-xs font-bold px-2.5 py-1 rounded-full">
            <Heart className="w-3.5 h-3.5 text-[#F28919] fill-[#F28919]" />
            <span>{proposal.apoiosCount} {proposal.apoiosCount === 1 ? 'apoio' : 'apoios'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[#506324] text-xl leading-snug group-hover:text-[#F28919] transition-colors mb-2.5 line-clamp-2">
          {proposal.titulo}
        </h3>

        {/* Short Description */}
        <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {descricaoResumida}
        </p>

      </div>

      <div>
        {/* Author & City Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-600 pt-3 border-t border-[#506324]/10 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#506324]" />
            <span>Por <strong className="text-[#506324]">{primeiroNome}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#F28919]" />
            <span className="truncate text-slate-700">{proposal.cidade}</span>
          </div>
        </div>

        {/* CTA Link - Background Laranja #F28919 */}
        <Link
          href={`/proposta/${proposal.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-xs py-3.5 px-4 rounded-2xl transition-all duration-200 border-2 border-[#506324] shadow-xs"
        >
          <span>Conhecer e apoiar proposta</span>
          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
