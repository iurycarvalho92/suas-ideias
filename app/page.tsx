'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProposalCard from '@/components/ProposalCard';
import CityAutocomplete from '@/components/CityAutocomplete';
import MarinasHeroDiagramation from '@/components/MarinasHeroDiagramation';
import MarinasFeaturedAndRanking from '@/components/MarinasFeaturedAndRanking';
import OrganicWaveDivider from '@/components/svg/OrganicWaveDivider';
import { PAUTAS, Proposal } from '@/lib/types';
import { 
  PenTool, 
  ShieldCheck, 
  Share2,
  Inbox,
  ArrowRight,
  Send,
  Shuffle
} from 'lucide-react';

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function HomeHub() {
  const [allProposals, setAllProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [randomizedGalleryProposals, setRandomizedGalleryProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedPauta, setSelectedPauta] = useState<string>('Todas');
  const [selectedCidade, setSelectedCidade] = useState<string>('Todas');

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/moderacao`);
      const data = await res.json();

      if (data.proposals) {
        let approved = (data.proposals as Proposal[]).filter(p => p.status === 'aprovado');
        setAllProposals(approved);
      }
    } catch (err) {
      console.error("Erro ao buscar propostas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  // Filter and randomize gallery proposals
  useEffect(() => {
    let result = [...allProposals];

    if (selectedPauta !== 'Todas') {
      result = result.filter(p => p.pauta === selectedPauta);
    }
    if (selectedCidade !== 'Todas' && selectedCidade.trim() !== '') {
      result = result.filter(p => p.cidade.toLowerCase().includes(selectedCidade.toLowerCase()));
    }

    setFilteredProposals(result);
    setRandomizedGalleryProposals(shuffleArray(result));
  }, [allProposals, selectedPauta, selectedCidade]);

  const handleShuffleGallery = () => {
    setRandomizedGalleryProposals(shuffleArray(filteredProposals));
  };

  const displayProposals = randomizedGalleryProposals.slice(0, 9);

  return (
    <div className="overflow-x-hidden bg-[#FEF6D5]">
      
      {/* ============================================================ */}
      {/* SEÇÃO 1: HERO                                               */}
      {/* ============================================================ */}
      <MarinasHeroDiagramation />

      {/* ============================================================ */}
      {/* SEÇÃO 2: COMO FUNCIONA                                       */}
      {/* ============================================================ */}
      <section id="como-funciona" className="bg-[#506324] text-white pt-[50px] pb-8 sm:pb-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#506324] bg-[#CACB60] px-3.5 py-1 rounded-full font-sans inline-block">
              PASSO A PASSO
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FEF6D5] tracking-tight pt-1">
              Como funciona a sua participação
            </h2>
            <p className="text-[#FEF6D5]/80 text-xs sm:text-sm">
              Um processo simples, rápido e transparente para transformar ideias em propostas de impacto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Passo 1 */}
            <div className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#CACB60] text-[#506324] shadow-lg hover:scale-102 transition-transform relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF6D5] text-[#506324] flex items-center justify-center mb-4 font-black text-xl border-2 border-[#506324]/20">
                <PenTool className="w-6 h-6 text-[#F28919]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F28919]">Passo 01</span>
              <h3 className="text-lg font-serif font-bold text-[#506324] mt-1 mb-1.5">
                1. Escreva sua ideia
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Acesse o formulário exclusivo e envie sua proposta ou solução para o seu município ou para o estado!
              </p>
            </div>

            {/* Passo 2 */}
            <div className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#CACB60] text-[#506324] shadow-lg hover:scale-102 transition-transform relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF6D5] text-[#506324] flex items-center justify-center mb-4 font-black text-xl border-2 border-[#506324]/20">
                <ShieldCheck className="w-6 h-6 text-[#506324]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#506324]">Passo 02</span>
              <h3 className="text-lg font-serif font-bold text-[#506324] mt-1 mb-1.5">
                2. Validação rápida
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Nossa equipe analisa o envio para garantir que a proposta respeita as diretrizes de viabilidade e constitucionalidade.
              </p>
            </div>

            {/* Passo 3 */}
            <div className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#CACB60] text-[#506324] shadow-lg hover:scale-102 transition-transform relative group">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF6D5] text-[#506324] flex items-center justify-center mb-4 font-black text-xl border-2 border-[#506324]/20">
                <Share2 className="w-6 h-6 text-[#506324]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#506324]">Passo 03</span>
              <h3 className="text-lg font-serif font-bold text-[#506324] mt-1 mb-1.5">
                3. Mobilize apoios
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                Assim que aprovada, você recebe um link exclusivo para compartilhar no WhatsApp e conseguir apoiadores da sua região.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* WAVE DIVIDER */}
      <OrganicWaveDivider fillColor="#FEF6D5" />

      {/* ============================================================ */}
      {/* SEÇÃO ESPECIAL: PROJETO DESTAQUE & RANKING TOP 3             */}
      {/* ============================================================ */}
      <MarinasFeaturedAndRanking allProposals={allProposals} baseUrlPrefix="" />

      {/* ============================================================ */}
      {/* SEÇÃO 3: GALERIA DE IDEIAS (9 Projetos Randomizados)          */}
      {/* ============================================================ */}
      <section id="galeria-de-ideias" className="bg-[#FEF6D5] py-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FEF6D5] bg-[#506324] px-3.5 py-1 rounded-full">
              Galeria Cidadã
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#506324] tracking-tight mt-2">
              Propostas para transformar São Paulo e o Brasil
            </h2>
          </div>

          {/* Filtros Container */}
          <div className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#506324]/20 shadow-sm mb-8 space-y-4">
            
            {/* Filtro 1: Pauta */}
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

            {/* Filtro 2: Cidade */}
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

          {/* Gallery Grid (Até 9 propostas randomizadas) */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div key={i} className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#506324]/15 animate-pulse h-64 space-y-4">
                  <div className="h-4 bg-[#506324]/10 rounded w-1/3" />
                  <div className="h-6 bg-[#506324]/10 rounded w-3/4" />
                  <div className="h-12 bg-[#506324]/10 rounded w-full" />
                  <div className="h-4 bg-[#506324]/10 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : displayProposals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProposals.map((proposal) => (
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
                href="/enviar"
                className="inline-flex items-center gap-2 bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-sm px-6 py-3 rounded-full border-2 border-[#506324] transition-all"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Enviar a primeira ideia</span>
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* WAVE DIVIDER */}
      <OrganicWaveDivider fillColor="#506324" />

      {/* ============================================================ */}
      {/* SEÇÃO 4: CHAMADA PARA O FORMULÁRIO DE ENVIO                 */}
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
              href="/enviar"
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
