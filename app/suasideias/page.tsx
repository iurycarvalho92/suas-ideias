'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProposalCard from '@/components/ProposalCard';
import ProposalForm from '@/components/ProposalForm';
import CityAutocomplete from '@/components/CityAutocomplete';
import MarinasHeroPortrait from '@/components/MarinasHeroPortrait';
import { PAUTAS, Proposal } from '@/lib/types';
import { 
  Sparkles, 
  Send, 
  Heart, 
  PenTool, 
  ShieldCheck, 
  Share2,
  Inbox,
  Award,
  Users
} from 'lucide-react';

export default function HomeHub() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedPauta, setSelectedPauta] = useState<string>('Todas');
  const [selectedCidade, setSelectedCidade] = useState<string>('Todas');

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedPauta && selectedPauta !== 'Todas') params.set('pauta', selectedPauta);
      if (selectedCidade && selectedCidade !== 'Todas' && selectedCidade.trim() !== '') {
        params.set('cidade', selectedCidade);
      }

      const res = await fetch(`/api/suasideias/moderacao?${params.toString()}`);
      const data = await res.json();

      if (data.proposals) {
        let approved = (data.proposals as Proposal[]).filter(p => p.status === 'aprovado');
        
        if (selectedPauta !== 'Todas') {
          approved = approved.filter(p => p.pauta === selectedPauta);
        }
        if (selectedCidade !== 'Todas' && selectedCidade.trim() !== '') {
          approved = approved.filter(p => p.cidade.toLowerCase().includes(selectedCidade.toLowerCase()));
        }
        setProposals(approved);
      }
    } catch (err) {
      console.error("Erro ao buscar propostas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [selectedPauta, selectedCidade]);

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden">
      
      {/* HERO SECTION WITH MAXIMUM PHOTO PROMINENCE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F2] via-[#F4F2E8] to-[#FAF8F2] pt-10 sm:pt-16 pb-16 border-b-2 border-[#14447B]/10">
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Superior Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#14447B] text-white text-xs font-bold rounded-full border border-[#A3B12D] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-4 h-4 text-[#A3B12D]" />
            <span>Plataforma de Participação Cidadã</span>
          </div>

          {/* Large Hero Logo Header Graphic */}
          <div className="relative h-24 sm:h-32 w-full max-w-lg mx-auto my-2">
            <Image
              src="/assets/logos/LogoSuasIdeias.png"
              alt="Suas ideias para as Marinas"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Subtitle */}
          <p className="text-[#14447B]/90 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
            Nós queremos ouvir quem vive a realidade de São Paulo todos os dias. Compartilhe sua proposta para São Paulo e para o Brasil, conheça ideias de outras pessoas e ajude a construir uma vida mais justa e sustentável para todos.
          </p>

          {/* Maximum Prominence Photo Showcase Frame */}
          <MarinasHeroPortrait />

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#formulario-de-envio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#14447B] hover:bg-[#0D2E55] text-white font-bold text-base px-8 py-4 rounded-full shadow-lg border-2 border-[#A3B12D] transition-all scale-100 hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5 text-[#A3B12D]" />
              <span>Enviar minha ideia</span>
            </a>

            <a
              href="#galeria-de-ideias"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF8F2] text-[#14447B] font-bold text-base px-8 py-4 rounded-full border-2 border-[#14447B] shadow-xs transition-all scale-100 hover:scale-105 active:scale-95"
            >
              <Heart className="w-5 h-5 text-[#14447B] fill-[#14447B]" />
              <span>Conhecer e apoiar ideias</span>
            </a>
          </div>

        </div>
      </section>

      {/* SEÇÃO: COMO FUNCIONA */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#14447B] px-3.5 py-1 rounded-full border border-[#A3B12D]">
            Passo a Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#14447B] tracking-tight">
            Como funciona a sua participação
          </h2>
          <p className="text-[#14447B]/80 text-sm sm:text-base">
            Um processo simples, rápido e transparente para transformar ideias em propostas de impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Passo 1 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#14447B]/20 shadow-sm hover:border-[#14447B] transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F2] text-[#14447B] flex items-center justify-center mb-6 font-black text-xl border-2 border-[#14447B]/20 group-hover:scale-110 transition-transform">
              <PenTool className="w-7 h-7 text-[#A3B12D]" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#14447B]">Passo 01</span>
            <h3 className="text-xl font-serif font-bold text-[#14447B] mt-1 mb-2">
              1. Escreva sua ideia
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Preencha o formulário com a sua proposta, sugestão ou solução para o seu município ou para o estado!
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#14447B]/20 shadow-sm hover:border-[#14447B] transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F2] text-[#14447B] flex items-center justify-center mb-6 font-black text-xl border-2 border-[#14447B]/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7 text-[#14447B]" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#A3B12D]">Passo 02</span>
            <h3 className="text-xl font-serif font-bold text-[#14447B] mt-1 mb-2">
              2. Validação rápida
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Nossa equipe analisa o envio para garantir que a proposta respeita as diretrizes de viabilidade e constitucionalidade.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#14447B]/20 shadow-sm hover:border-[#14447B] transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF8F2] text-[#14447B] flex items-center justify-center mb-6 font-black text-xl border-2 border-[#14447B]/20 group-hover:scale-110 transition-transform">
              <Share2 className="w-7 h-7 text-[#14447B]" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#14447B]">Passo 03</span>
            <h3 className="text-xl font-serif font-bold text-[#14447B] mt-1 mb-2">
              3. Mobilize apoios
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Assim que aprovada, você recebe um link exclusivo para compartilhar no WhatsApp e conseguir apoiadores da sua região.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO: GALERIA DE IDEIAS */}
      <section id="galeria-de-ideias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#14447B] tracking-tight">
              Propostas para transformar São Paulo e o Brasil
            </h2>
            <p className="text-[#14447B]/80 text-sm sm:text-base mt-1.5 max-w-2xl">
              Explore as ideias enviadas por moradores de diversas cidades. Filtre por pauta ou município e dê seu apoio.
            </p>
          </div>
          
          <div className="text-xs text-[#14447B] font-bold bg-white px-3.5 py-1.5 rounded-full border-2 border-[#14447B]/20 self-start md:self-auto">
            {proposals.length} {proposals.length === 1 ? 'proposta exibida' : 'propostas exibidas'}
          </div>
        </div>

        {/* Filtros Container */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#14447B]/20 shadow-sm mb-8 space-y-4">
          
          {/* Filtro 1: Pauta Horizontal Scroll */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14447B] mb-2.5">
              Filtrar por Pauta / Tema:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedPauta('Todas')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap border-2 ${
                  selectedPauta === 'Todas'
                    ? 'bg-[#14447B] text-white border-[#14447B]'
                    : 'bg-[#FAF8F2] text-[#14447B] border-[#14447B]/20 hover:border-[#14447B]'
                }`}
              >
                Todas as pautas
              </button>
              {PAUTAS.map((pauta) => (
                <button
                  key={pauta}
                  onClick={() => setSelectedPauta(pauta)}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap border-2 ${
                    selectedPauta === pauta
                      ? 'bg-[#14447B] text-white border-[#14447B]'
                      : 'bg-[#FAF8F2] text-[#14447B] border-[#14447B]/20 hover:border-[#14447B]'
                  }`}
                >
                  {pauta}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro 2: Cidade Autocomplete Search */}
          <div className="pt-3 border-t border-[#14447B]/10 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-80">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14447B] mb-1.5">
                Filtrar por Cidade em SP:
              </label>
              <CityAutocomplete
                value={selectedCidade === 'Todas' ? '' : selectedCidade}
                onChange={(c) => setSelectedCidade(c || 'Todas')}
                placeholder="Todas as cidades (ou digite para buscar)"
              />
            </div>
            
            {(selectedPauta !== 'Todas' || selectedCidade !== 'Todas') && (
              <button
                onClick={() => {
                  setSelectedPauta('Todas');
                  setSelectedCidade('Todas');
                }}
                className="text-xs font-bold text-[#14447B] hover:underline pt-5 sm:pt-6"
              >
                Limpar todos os filtros
              </button>
            )}
          </div>

        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border-2 border-[#14447B]/15 animate-pulse h-64 space-y-4">
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-12 bg-slate-100 rounded w-full" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : proposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        ) : (
          /* ESTADO VAZIO */
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#14447B]/20 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-[#FAF8F2] text-[#14447B] rounded-full flex items-center justify-center mx-auto border-2 border-[#14447B]/20">
              <Inbox className="w-8 h-8 text-[#14447B]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#14447B]">
              Nenhuma proposta encontrada para este filtro
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Nenhuma proposta encontrada com os critérios selecionados. Seja o primeiro a enviar uma ideia para essa cidade ou tema!
            </p>
            <a
              href="#formulario-de-envio"
              className="inline-flex items-center gap-2 bg-[#14447B] text-white font-bold text-sm px-6 py-3 rounded-full border-2 border-[#A3B12D] transition-all"
            >
              <Send className="w-4 h-4 text-[#A3B12D]" />
              <span>Enviar a primeira ideia</span>
            </a>
          </div>
        )}

      </section>

      {/* FORMULÁRIO DE ENVIO DE PROPOSTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <ProposalForm />
      </section>

    </div>
  );
}
