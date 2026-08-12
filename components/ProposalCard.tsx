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
        return 'bg-[#14447B]/10 text-[#14447B] border-[#14447B]/30';
      case 'Saúde':
        return 'bg-[#A3B12D]/20 text-[#14447B] border-[#A3B12D]/40';
      case 'Meio Ambiente & Clima':
        return 'bg-[#A3B12D] text-[#14447B] border-[#14447B]/20 font-bold';
      case 'Mobilidade Urbana':
        return 'bg-[#14447B]/15 text-[#14447B] border-[#14447B]/30';
      case 'Segurança':
        return 'bg-[#0D2E55] text-white border-[#0D2E55]';
      default:
        return 'bg-[#FFF6D5] text-[#14447B] border-[#14447B]/20';
    }
  };

  return (
    <div className="group bg-[#FFF6D5] rounded-3xl p-6 border-2 border-[#14447B]/20 hover:border-[#14447B] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        
        {/* Top Pauta Badge & Apoios Count */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getBadgeStyle(proposal.pauta)}`}>
            {proposal.pauta}
          </span>
          <div className="flex items-center gap-1.5 bg-white/70 border border-[#14447B]/20 text-[#14447B] text-xs font-bold px-2.5 py-1 rounded-full">
            <Heart className="w-3.5 h-3.5 text-[#14447B] fill-[#14447B]" />
            <span>{proposal.apoiosCount} {proposal.apoiosCount === 1 ? 'apoio' : 'apoios'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[#14447B] text-xl leading-snug group-hover:text-[#A3B12D] transition-colors mb-2.5 line-clamp-2">
          {proposal.titulo}
        </h3>

        {/* Short Description */}
        <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-3">
          {descricaoResumida}
        </p>

      </div>

      <div>
        {/* Author & City Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-600 pt-3 border-t border-[#14447B]/10 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-[#14447B]" />
            <span>Por <strong className="text-[#14447B]">{primeiroNome}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#A3B12D]" />
            <span className="truncate text-slate-700">{proposal.cidade}</span>
          </div>
        </div>

        {/* CTA Link */}
        <Link
          href={`/suasideias/proposta/${proposal.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-[#14447B] text-[#14447B] hover:text-white font-bold text-xs py-3 px-4 rounded-2xl transition-all duration-200 border-2 border-[#14447B]"
        >
          <span>Conhecer e apoiar proposta</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
