'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/lib/types';
import { 
  Trophy, 
  Sparkles, 
  Heart, 
  MapPin, 
  Tag, 
  ArrowRight, 
  Award,
  Flame,
  User,
  Shuffle
} from 'lucide-react';

interface Props {
  allProposals: Proposal[];
  baseUrlPrefix?: string;
}

export default function MarinasFeaturedAndRanking({ allProposals, baseUrlPrefix = '' }: Props) {
  const [featuredProposal, setFeaturedProposal] = useState<Proposal | null>(null);

  // Determine top 3 proposals by apoiosCount
  const topProposals = [...allProposals]
    .sort((a, b) => b.apoiosCount - a.apoiosCount)
    .slice(0, 3);

  // Pick a random proposal for "Projeto em Destaque Especial" on load
  useEffect(() => {
    if (allProposals.length > 0) {
      const randomIndex = Math.floor(Math.random() * allProposals.length);
      setFeaturedProposal(allProposals[randomIndex]);
    }
  }, [allProposals]);

  const handleShuffleFeatured = () => {
    if (allProposals.length > 1) {
      let nextIndex = Math.floor(Math.random() * allProposals.length);
      if (featuredProposal && allProposals.length > 1) {
        while (allProposals[nextIndex].id === featuredProposal.id) {
          nextIndex = Math.floor(Math.random() * allProposals.length);
        }
      }
      setFeaturedProposal(allProposals[nextIndex]);
    }
  };

  if (allProposals.length === 0) return null;

  return (
    <section className="bg-[#FEF6D5] pt-6 pb-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ============================================================ */}
        {/* 1. SEÇÃO: PROJETO EM DESTAQUE ESPECIAL ALEATÓRIO             */}
        {/* ============================================================ */}
        {featuredProposal && (
          <div className="relative bg-gradient-to-br from-[#506324] to-[#3A491A] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#CACB60] overflow-hidden">
            {/* Background Accent Deco */}
            <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-[#F28919]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute right-20 top-0 w-48 h-48 bg-[#CACB60]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              
              {/* Header Badge & Shuffle Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 bg-[#F28919] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 shadow-md">
                  <Sparkles className="w-4 h-4 text-[#FEF6D5] animate-pulse" />
                  <span>DESTAQUE ESPECIAL DA COMUNIDADE</span>
                </div>

                <button
                  onClick={handleShuffleFeatured}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FEF6D5] hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-white/20 transition-all backdrop-blur-xs active:scale-95"
                  title="Sortear outro projeto destaque"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Ver Outro Destaque</span>
                </button>
              </div>

              {/* Proposal Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="bg-[#CACB60] text-[#506324] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {featuredProposal.pauta}
                    </span>
                    <span className="text-xs text-[#FEF6D5]/90 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F28919]" />
                      {featuredProposal.cidade}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#FEF6D5] leading-tight">
                    {featuredProposal.titulo}
                  </h3>

                  <p className="text-[#FEF6D5]/90 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredProposal.descricao}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#FEF6D5]/80">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#CACB60]" />
                      Autor(a): <strong className="text-white">{featuredProposal.nome}</strong>
                    </span>
                  </div>
                </div>

                {/* Right Call To Action Box */}
                <div className="bg-[#FEF6D5] text-[#506324] rounded-2xl p-6 border-2 border-[#CACB60] shadow-xl text-center space-y-4 lg:self-stretch flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-wider text-[#F28919]">Apoio Popular</span>
                    <div className="flex items-center justify-center gap-2 text-4xl font-serif font-black text-[#506324]">
                      <Heart className="w-8 h-8 fill-[#F28919] text-[#F28919]" />
                      <span>{featuredProposal.apoiosCount}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">apoios registrados nesta ideia</p>
                  </div>

                  <Link
                    href={`${baseUrlPrefix}/proposta/${featuredProposal.slug}`}
                    className="w-full bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-sm py-3.5 px-4 rounded-xl border-2 border-[#506324] shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102 active:scale-95"
                  >
                    <span>Conhecer e Apoiar Destaque</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 2. SEÇÃO: RANKING TOP 3 PROJETOS MAIS APOIADOS               */}
        {/* ============================================================ */}
        {topProposals.length > 0 && (
          <div className="space-y-6">
            
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#506324] bg-[#CACB60] px-4 py-1 rounded-full border border-[#506324]/20">
                <Trophy className="w-4 h-4 text-[#F28919]" />
                <span>RANKING DE MOBILIZAÇÃO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#506324] tracking-tight pt-1">
                Top 3 Propostas Mais Apoiadas
              </h2>
              <p className="text-slate-700 text-xs sm:text-sm">
                As ideias que ganharam o coração dos moradores de São Paulo e lideram em mobilização!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {topProposals.map((proposal, index) => {
                const rankConfigs = [
                  {
                    rankLabel: '🥇 1º LUGAR',
                    badgeBg: 'bg-amber-400 text-amber-950 border-amber-500',
                    cardBorder: 'border-4 border-amber-400',
                    headerBg: 'bg-amber-400/20 text-amber-900 border-amber-400/40',
                    glow: 'shadow-2xl shadow-amber-500/10',
                  },
                  {
                    rankLabel: '🥈 2º LUGAR',
                    badgeBg: 'bg-slate-300 text-slate-900 border-slate-400',
                    cardBorder: 'border-2 border-slate-300',
                    headerBg: 'bg-slate-200/50 text-slate-800 border-slate-300',
                    glow: 'shadow-lg',
                  },
                  {
                    rankLabel: '🥉 3º LUGAR',
                    badgeBg: 'bg-amber-700 text-white border-amber-800',
                    cardBorder: 'border-2 border-amber-700/40',
                    headerBg: 'bg-amber-800/10 text-amber-900 border-amber-700/20',
                    glow: 'shadow-lg',
                  },
                ];

                const config = rankConfigs[index] || rankConfigs[2];

                return (
                  <div
                    key={proposal.id}
                    className={`bg-[#FEF6D5] rounded-3xl p-6 text-[#506324] shadow-md flex flex-col justify-between space-y-4 relative transition-transform hover:-translate-y-1 ${config.cardBorder} ${config.glow}`}
                  >
                    <div className="space-y-3">
                      {/* Rank Position Header */}
                      <div className="flex items-center justify-between border-b border-[#506324]/10 pb-3">
                        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${config.badgeBg}`}>
                          {config.rankLabel}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#F28919]">
                          <Flame className="w-4 h-4 fill-[#F28919]" />
                          <span>{proposal.apoiosCount} apoios</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#506324] text-white">
                          {proposal.pauta}
                        </span>
                        <span className="text-[11px] font-medium text-slate-600">• {proposal.cidade}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-lg text-[#506324] line-clamp-2">
                        {proposal.titulo}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-700 text-xs line-clamp-3 leading-relaxed">
                        {proposal.descricao}
                      </p>
                    </div>

                    {/* Footer Link */}
                    <div className="pt-2 border-t border-[#506324]/10">
                      <Link
                        href={`${baseUrlPrefix}/proposta/${proposal.slug}`}
                        className="w-full bg-[#506324] hover:bg-[#3A491A] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>Ver e Apoiar Proposta</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
