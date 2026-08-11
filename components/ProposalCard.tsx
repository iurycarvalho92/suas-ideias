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

  // Theme color mapper for badges
  const getBadgeStyle = (pauta: string) => {
    switch (pauta) {
      case 'Educação':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Saúde':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Meio Ambiente & Clima':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Mobilidade Urbana':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Segurança':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Economia & Emprego':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Cidadania & Direitos':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        
        {/* Top Pauta Badge & Apoios Count */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeStyle(proposal.pauta)}`}>
            {proposal.pauta}
          </span>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{proposal.apoiosCount} {proposal.apoiosCount === 1 ? 'apoio' : 'apoios'}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-emerald-600 transition-colors mb-2.5 line-clamp-2">
          {proposal.titulo}
        </h3>

        {/* Short Description (75 chars) */}
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {descricaoResumida}
        </p>

      </div>

      <div>
        {/* Author & City Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-slate-100 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Por <strong>{primeiroNome}</strong></span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate">{proposal.cidade}</span>
          </div>
        </div>

        {/* CTA Link */}
        <Link
          href={`/suasideias/proposta/${proposal.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white font-bold text-xs py-3 px-4 rounded-2xl transition-all duration-200 border border-slate-200 hover:border-emerald-600 shadow-xs"
        >
          <span>Conhecer e apoiar proposta</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
