'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProposalCard from '@/components/ProposalCard';
import ProposalForm from '@/components/ProposalForm';
import CityAutocomplete from '@/components/CityAutocomplete';
import { PAUTAS, Proposal } from '@/lib/types';
import { 
  Sparkles, 
  Send, 
  Heart, 
  CheckCircle2, 
  Search, 
  Filter, 
  PenTool, 
  ShieldCheck, 
  Share2,
  Inbox,
  Award,
  Users,
  Sun,
  Shield,
  TreePine,
  Baby,
  ArrowRight,
  Quote,
  Check
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
    <div className="space-y-20 pb-20 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-[#FAFAFB] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-100">
        
        {/* Glowing background ambient lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 via-teal-200/20 to-amber-100/20 blur-3xl -z-10 rounded-full pointer-events-none" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-400/10 blur-2xl -z-10 rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Superior Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-emerald-800 text-xs font-bold rounded-full border border-emerald-200/80 shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Plataforma de Participação Cidadã</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Suas ideias para as <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">Marinas</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-base sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
            Nós queremos ouvir quem vive a realidade de São Paulo todos os dias. Compartilhe sua proposta para São Paulo e para o Brasil, conheça ideias de outras pessoas e ajude a construir uma vida mais justa e sustentável para todos.
          </p>

          {/* Highlights Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-700">
            <span className="px-3.5 py-1.5 bg-white/80 border border-slate-200 rounded-full shadow-2xs flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>+20 Leis Aprovadas</span>
            </span>
            <span className="px-3.5 py-1.5 bg-white/80 border border-slate-200 rounded-full shadow-2xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-teal-600" />
              <span>Escuta Ativa em todo SP</span>
            </span>
            <span className="px-3.5 py-1.5 bg-white/80 border border-slate-200 rounded-full shadow-2xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Transparência e Resultado</span>
            </span>
          </div>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#formulario-de-envio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 transition-all scale-100 hover:scale-105 active:scale-95"
            >
              <Send className="w-5 h-5" />
              <span>Enviar minha ideia</span>
            </a>

            <a
              href="#galeria-de-ideias"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base px-8 py-4 rounded-full border border-slate-200 shadow-sm hover:border-slate-300 transition-all scale-100 hover:scale-105 active:scale-95"
            >
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>Conhecer e apoiar ideias</span>
            </a>
          </div>

        </div>
      </section>

      {/* SEÇÃO: AS MARINAS (#TôComAsMarinas) */}
      <section id="as-marinas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            #TôComAsMarinas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            As Marinas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Duas trajetórias conectadas pelo compromisso com a infância, clima, segurança e justiça social.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Marina Helou */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-emerald-600/20">
                MH
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Marina Helou</h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Deputada Estadual (ALESP)
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dois mandatos na Assembleia Legislativa de São Paulo, mais de <strong>20 leis aprovadas</strong> e uma atuação referência no diálogo, na transparência e na defesa firme da primeira infância, mulheres e proteção ambiental.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Propostas para o Estado e Brasil</span>
              <span className="font-bold text-emerald-700">Conhecer prioridades →</span>
            </div>
          </div>

          {/* Card Marina Bragante */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-teal-600/20">
                MB
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">Marina Bragante</h3>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Vereadora de São Paulo
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mais de <strong>20 anos de experiência</strong> no setor público, atuando com força para reduzir desigualdades urbanas, fortalecer a saúde pública e preparar as cidades paulistas para os impactos da crise climática.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Propostas para os Municípios</span>
              <span className="font-bold text-teal-700">Conhecer prioridades →</span>
            </div>
          </div>

        </div>

        {/* Quote Card */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-3 relative z-10">
            <Quote className="w-8 h-8 text-emerald-400 opacity-60" />
            <p className="text-lg sm:text-xl font-medium leading-relaxed">
              "As Marinas mostram que é possível fazer política com escuta, coragem e resultado. Política feita com técnica e com afeto muda a vida de quem mais precisa."
            </p>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block pt-1">
              #TôComAsMarinas • Vozes da Sociedade Civil
            </span>
          </div>
        </div>

      </section>

      {/* SEÇÃO: NOSSAS PRIORIDADES */}
      <section id="nossas-prioridades" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nossas Prioridades
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            As Marinas estão juntas para cuidar do que mais importa em São Paulo e no Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Crianças e Famílias</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Escolas em tempo integral e protegidas do calor extremo, apoio contínuo às mães e regras firmes para enfrentar os riscos do ambiente digital e das apostas (bets).
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Natureza & Clima</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Enfrentamento à crise climática com prevenção de desastres, ampliação de áreas verdes e parques esponja, e firmeza contra retrocessos ambientais.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Segurança com Inteligência</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Investimento, inteligência e prevenção para acolher mulheres com Delegacias da Mulher 24h, combater o crime organizado e proteger as pessoas de golpes e roubos.
            </p>
          </div>

        </div>

      </section>

      {/* SEÇÃO: COMO FUNCIONA */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Como funciona a sua participação
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Um processo simples, rápido e transparente para transformar ideias em propostas de impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Passo 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">
              <PenTool className="w-7 h-7" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Passo 01</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
              1. Escreva sua ideia
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Preencha o formulário com a sua proposta, sugestão ou solução para o seu município ou para o estado!
            </p>
          </div>

          {/* Passo 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">Passo 02</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
              2. Validação rápida
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nossa equipe analisa o envio para garantir que a proposta respeita as diretrizes de viabilidade e constitucionalidade.
            </p>
          </div>

          {/* Passo 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-soft-lg transition-all relative group">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">
              <Share2 className="w-7 h-7" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Passo 03</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
              3. Mobilize apoios
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Assim que aprovada, você recebe um link exclusivo para compartilhar no WhatsApp e conseguir apoiadores da sua região.
            </p>
          </div>

        </div>
      </section>

      {/* SEÇÃO: GALERIA DE IDEIAS */}
      <section id="galeria-de-ideias" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Propostas para transformar São Paulo e o Brasil
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Explore as ideias enviadas por moradores de diversas cidades. Filtre por pauta ou município e dê seu apoio.
            </p>
          </div>
          
          <div className="text-xs text-slate-500 font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200 self-start md:self-auto">
            {proposals.length} {proposals.length === 1 ? 'proposta exibida' : 'propostas exibidas'}
          </div>
        </div>

        {/* Filtros Container */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-8 space-y-4">
          
          {/* Filtro 1: Pauta Horizontal Scroll */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Filtrar por Pauta / Tema:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedPauta('Todas')}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                  selectedPauta === 'Todas'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todas as pautas
              </button>
              {PAUTAS.map((pauta) => (
                <button
                  key={pauta}
                  onClick={() => setSelectedPauta(pauta)}
                  className={`px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                    selectedPauta === pauta
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {pauta}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro 2: Cidade Autocomplete Search */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-80">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
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
                className="text-xs font-bold text-rose-600 hover:text-rose-700 underline pt-5 sm:pt-6"
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
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 animate-pulse h-64 space-y-4">
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
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Nenhuma proposta encontrada para este filtro
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nenhuma proposta encontrada com os critérios selecionados. Seja o primeiro a enviar uma ideia para essa cidade ou tema!
            </p>
            <a
              href="#formulario-de-envio"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-full transition-all"
            >
              <Send className="w-4 h-4" />
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
