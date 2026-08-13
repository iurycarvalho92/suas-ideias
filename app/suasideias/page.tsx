'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProposalCard from '@/components/ProposalCard';
import CityAutocomplete from '@/components/CityAutocomplete';
import MarinasHeroDiagramation from '@/components/MarinasHeroDiagramation';
import OrganicWaveDivider from '@/components/svg/OrganicWaveDivider';
import { PAUTAS, Proposal } from '@/lib/types';
import { 
  Sparkles, 
  Send, 
  PenTool, 
  ShieldCheck, 
  Share2,
  Inbox,
  ArrowRight
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
    <div className="overflow-x-hidden bg-[#FEF6D5]">
      
      {/* ============================================================ */}
      {/* SEÇÃO 1: HERO (Fundo Bege #FEF6D5 com Faixa Verde Escuro #506324) */}
      {/* ============================================================ */}
      <MarinasHeroDiagramation />

      {/* WAVE DIVIDER: Transição DIRETA da Faixa Verde (#506324) para Seção Verde Escuro (#506324) */}
      <div className="bg-[#506324] -mt-1">
        <OrganicWaveDivider fillColor="#506324" />
      </div>

      {/* ============================================================ */}
      {/* SEÇÃO 2: COMO FUNCIONA (Fundo Verde Escuro #506324)          */}
      {/* ============================================================ */}
      <section id="como-funciona" className="bg-[#506324] text-white py-12 sm:py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#506324] bg-[#CACB60] px-3.5 py-1 rounded-full font-sans">
              Passo a Passo
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FEF6D5] tracking-tight">
              Como funciona a sua participação
            </h2>
            <p className="text-[#FEF6D5]/80 text-sm sm:text-base">
              Um processo simples, rápido e transparente para transformar ideias em propostas de impacto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Passo 1 */}
            <div className="bg-[#FEF6D5] rounded-3xl p-8 border-2 border-[#CACB60] text-[#506324] shadow-lg hover:scale-102 transition-transform relative group">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF6D5] text-[#506324] flex items-center justify-center mb-6 font-black text-xl border-2 border-[#506324]/20">
                <PenTool className="w-7 h-7 text-[#F28919]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F28919]">Passo 01</span>
              <h3 className="text-xl font-serif font-bold text-[#506324] mt-1 mb-2">
                1. Escreva sua ideia
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Acesse o formulário exclusivo e envie sua proposta ou solução para o seu município ou para o estado!
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-[#FEF6D5] rounded-3xl p-8 border-2 border-[#CACB60] text-[#506324] shadow-lg hover:scale-102 transition-transform relative group">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF6D5] text-[#506324] flex items-center justify-center mb-6 font-black text-xl border-2 border-[#506324]/20">
                <ShieldCheck className="w-7 h-7 text-[#506324]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#506324]">Passo 02</span>
              <h3 className="text-xl font-serif font-bold text-[#506324] mt-1 mb-2">
                2. Validação rápida
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Nossa equipe analisa o envio para garantir que a proposta respeita as diretrizes de viabilidade e constitucionalidade.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-[#FEF6D5] rounded-3xl p-8 border-2 border-[#CACB60] text-[#506324] shadow-lg hover:scale-102 transition-transform relative group">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF6D5] text-[#506324] flex items-center justify-center mb-6 font-black text-xl border-2 border-[#506324]/20">
                <Share2 className="w-7 h-7 text-[#506324]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#506324]">Passo 03</span>
              <h3 className="text-xl font-serif font-bold text-[#506324] mt-1 mb-2">
                3. Mobilize apoios
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Assim que aprovada, você recebe um link exclusivo para compartilhar no WhatsApp e conseguir apoiadores da sua região.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* WAVE DIVIDER: Transição de Verde Escuro (#506324) para Bege (#FEF6D5) */}
      <OrganicWaveDivider fillColor="#FEF6D5" />

      {/* ============================================================ */}
      {/* SEÇÃO 3: GALERIA DE IDEIAS (Fundo Bege #FEF6D5)              */}
      {/* ============================================================ */}
      <section id="galeria-de-ideias" className="bg-[#FEF6D5] py-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FEF6D5] bg-[#506324] px-3.5 py-1 rounded-full">
                Galeria Cidadã
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#506324] tracking-tight mt-2">
                Propostas para transformar São Paulo e o Brasil
              </h2>
              <p className="text-[#506324]/80 text-sm sm:text-base mt-1.5 max-w-2xl">
                Explore as ideias enviadas por moradores de diversas cidades. Filtre por pauta ou município e dê seu apoio.
              </p>
            </div>
            
            <div className="text-xs text-[#506324] font-bold bg-[#FEF6D5] px-3.5 py-1.5 rounded-full border-2 border-[#506324]/20 self-start md:self-auto">
              {proposals.length} {proposals.length === 1 ? 'proposta exibida' : 'propostas exibidas'}
            </div>
          </div>

          {/* Filtros Container */}
          <div className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#506324]/20 shadow-sm mb-8 space-y-4">
            
            {/* Filtro 1: Pauta Horizontal Scroll */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2.5">
                Filtrar por Pauta / Tema:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button
                  onClick={() => setSelectedPauta('Todas')}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap border-2 ${
                    selectedPauta === 'Todas'
                      ? 'bg-[#506324] text-white border-[#506324]'
                      : 'bg-[#FEF6D5] text-[#506324] border-[#506324]/20 hover:border-[#506324]'
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
                        ? 'bg-[#506324] text-white border-[#506324]'
                        : 'bg-[#FEF6D5] text-[#506324] border-[#506324]/20 hover:border-[#506324]'
                    }`}
                  >
                    {pauta}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro 2: Cidade Autocomplete Search */}
            <div className="pt-3 border-t border-[#506324]/10 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-80">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
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
                  className="text-xs font-bold text-[#506324] hover:underline pt-5 sm:pt-6"
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
                <div key={i} className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#506324]/15 animate-pulse h-64 space-y-4">
                  <div className="h-4 bg-[#506324]/10 rounded w-1/3" />
                  <div className="h-6 bg-[#506324]/10 rounded w-3/4" />
                  <div className="h-12 bg-[#506324]/10 rounded w-full" />
                  <div className="h-4 bg-[#506324]/10 rounded w-1/2" />
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
            <div className="bg-[#FEF6D5] rounded-3xl p-12 text-center border-2 border-[#506324]/20 shadow-sm max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-[#FEF6D5] text-[#506324] rounded-full flex items-center justify-center mx-auto border-2 border-[#506324]/20">
                <Inbox className="w-8 h-8 text-[#506324]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#506324]">
                Nenhuma proposta encontrada para este filtro
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Nenhuma proposta encontrada com os critérios selecionados. Seja o primeiro a enviar uma ideia para essa cidade ou tema!
              </p>
              <Link
                href="/suasideias/enviar"
                className="inline-flex items-center gap-2 bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-sm px-6 py-3 rounded-full border-2 border-[#506324] transition-all"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Enviar a primeira ideia</span>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* WAVE DIVIDER: Transição para a Chamada do Formulário em Verde Escuro */}
      <OrganicWaveDivider fillColor="#506324" />

      {/* ============================================================ */}
      {/* SEÇÃO 4: CHAMADA PARA O FORMULÁRIO DE ENVIO (#506324)        */}
      {/* ============================================================ */}
      <section className="bg-[#506324] text-[#FEF6D5] py-16 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          
          <div className="w-16 h-16 bg-[#F28919] text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg border-2 border-[#FEF6D5]">
            <Send className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#FEF6D5] tracking-tight">
            Qual é a sua ideia para melhorar São Paulo e o Brasil?
          </h2>

          <p className="text-[#FEF6D5] text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
            Sua experiência e suas ideias podem ajudar a construir políticas públicas melhores. Clique abaixo e preencha nosso formulário simples!
          </p>

          <div className="pt-4">
            <Link
              href="/suasideias/enviar"
              className="inline-flex items-center gap-3 bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl transition-all scale-100 hover:scale-105 active:scale-95 border-2 border-[#FEF6D5]"
            >
              <span>Preencher formulário de envio de ideia</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
