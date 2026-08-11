'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import SupportModal from '@/components/SupportModal';
import { Proposal } from '@/lib/types';
import { 
  Clock, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  User, 
  MessageCircle, 
  ArrowLeft, 
  Send, 
  AlertTriangle,
  Loader2,
  Share2,
  Sparkles
} from 'lucide-react';

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slugOrId = params.slug as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchProposal = async () => {
    try {
      const res = await fetch(`/api/suasideias/moderacao`);
      const data = await res.json();
      if (data.proposals) {
        const found = (data.proposals as Proposal[]).find(
          (p) => p.slug === slugOrId || p.id === slugOrId
        );
        if (found) {
          setProposal(found);
        } else {
          setErrorMsg('Proposta não encontrada.');
        }
      }
    } catch (err) {
      setErrorMsg('Erro ao carregar detalhes da proposta.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slugOrId) {
      fetchProposal();
    }
  }, [slugOrId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#8C1A13]" />
        <p className="text-[#8C1A13] text-sm font-medium">Carregando detalhes da proposta...</p>
      </div>
    );
  }

  if (errorMsg || !proposal) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-[#F0AECA] text-[#8C1A13] rounded-full flex items-center justify-center mx-auto border-2 border-[#8C1A13]">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-[#8C1A13]">Proposta Não Encontrada</h2>
        <p className="text-slate-700 text-sm">
          A proposta que você está procurando não existe ou foi removida.
        </p>
        <Link
          href="/suasideias"
          className="inline-flex items-center gap-2 bg-[#F1891D] text-white font-bold text-sm px-6 py-3 rounded-full border-2 border-[#8C1A13] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Galeria de Ideias</span>
        </Link>
      </div>
    );
  }

  const primeiroNome = proposal.nome.split(' ')[0];
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://marinasporsp.com.br/suasideias/proposta/${proposal.slug}`;

  // WhatsApp share link
  const whatsappMsg = encodeURIComponent(
    `Acabei de ver uma excelente proposta para ${proposal.cidade} na plataforma 'Suas ideias para as Marinas': '${proposal.titulo}'. Leia e dê seu apoio aqui: ${currentUrl}. Vamos construir juntos um São Paulo melhor!`
  );
  const whatsappShareUrl = `https://wa.me/?text=${whatsappMsg}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // 1. STATE: PENDENTE
  if (proposal.status === 'pendente') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#8C1A13] shadow-xl space-y-8">
          
          {/* Status Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8C1A13]/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF6D5] text-[#8C1A13] text-xs font-bold rounded-full border-2 border-[#8C1A13]">
              <Clock className="w-4 h-4 text-[#F1891D] animate-pulse" />
              <span>Proposta em Análise</span>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Enviada em {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>

          {/* Title & Metadata */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#8C1A13] leading-tight mb-3">
              "{proposal.titulo}"
            </h1>
            <p className="text-slate-700 text-sm sm:text-base font-medium flex items-center gap-2">
              <span>Enviada por <strong className="text-[#8C1A13]">{primeiroNome}</strong> em <strong>{proposal.cidade}</strong></span>
              <span>•</span>
              <span className="text-[#F1891D] font-bold">Aguardando aprovação</span>
            </p>
          </div>

          {/* Visitor Notice Callout */}
          <div className="bg-[#FFF6D5] border-2 border-[#8C1A13] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#8C1A13] font-serif font-bold text-lg">
              <Sparkles className="w-5 h-5 text-[#F1891D]" />
              <span>Sua ideia chegou com sucesso e já está com nossa equipe!</span>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed">
              Para garantir a qualidade e o respeito no debate público, toda proposta passa por uma análise rápida antes de ir ao ar. Guarde este link — assim que for aprovada, esta página exibirá o botão de apoio e o contador de votos!
            </p>
          </div>

          {/* Proposal Preview Content */}
          <div className="bg-[#FFF6D5]/30 rounded-2xl p-6 border border-[#8C1A13]/20 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C1A13]">
              Descrição da Proposta ({proposal.pauta}):
            </h3>
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {proposal.descricao}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#8C1A13]/10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/suasideias#galeria-de-ideias"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F1891D] text-white font-bold text-sm px-6 py-3.5 rounded-2xl border-2 border-[#8C1A13] transition-all shadow-md"
            >
              <Heart className="w-4 h-4" />
              <span>Ver ideias que já estão publicadas</span>
            </Link>

            <Link
              href="/suasideias#formulario-de-envio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF6D5] text-[#8C1A13] font-bold text-sm px-6 py-3.5 rounded-2xl border-2 border-[#8C1A13] transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Enviar outra proposta</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. STATE: REJEITADO
  if (proposal.status === 'rejeitado') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#8C1A13] shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F0AECA] text-[#8C1A13] text-xs font-bold rounded-full border border-[#8C1A13]">
            <AlertTriangle className="w-4 h-4 text-[#8C1A13]" />
            <span>Atualização de Moderação</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#8C1A13]">
            "{proposal.titulo}"
          </h1>

          <div className="bg-[#FFF6D5] border-2 border-[#8C1A13] rounded-2xl p-6 space-y-2">
            <h4 className="font-bold text-[#8C1A13] text-sm">
              Sua proposta precisa de alguns ajustes para ser publicada:
            </h4>
            <p className="text-slate-800 text-sm leading-relaxed">
              {proposal.motivoRejeicao || 'O conteúdo enviado não preenche os requisitos mínimos de viabilidade ou adequação.'}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`/suasideias#formulario-de-envio`}
              className="inline-flex items-center gap-2 bg-[#F1891D] text-white font-bold text-sm px-6 py-3.5 rounded-2xl border-2 border-[#8C1A13] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Enviar nova versão ajustada</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. STATE: APROVADO (Pública)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/suasideias#galeria-de-ideias"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#8C1A13] hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Galeria de Propostas</span>
        </Link>
      </div>

      {/* Main Proposal Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#8C1A13] shadow-xl space-y-8">
        
        {/* Pauta Badge & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#8C1A13]/10 pb-6">
          <span className="px-3.5 py-1.5 text-xs font-bold bg-[#FFF6D5] text-[#8C1A13] rounded-full border-2 border-[#8C1A13]/30">
            {proposal.pauta}
          </span>

          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#8C1A13]" />
              <span>Ideia enviada por <strong className="text-[#8C1A13]">{primeiroNome}</strong></span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-[#4F6219]">
              <MapPin className="w-3.5 h-3.5" />
              <span><strong>{proposal.cidade} / SP</strong></span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-serif font-extrabold text-[#8C1A13] tracking-tight leading-tight">
          {proposal.titulo}
        </h1>

        {/* Support Counter & Main Support CTA */}
        <div className="bg-[#FFF6D5] border-2 border-[#8C1A13] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C1A13]">
              Placar de Apoios
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#8C1A13]">
              <Heart className="w-6 h-6 text-[#8C1A13] fill-[#8C1A13] animate-pulse" />
              <span className="text-2xl sm:text-3xl font-serif font-extrabold">
                {proposal.apoiosCount} {proposal.apoiosCount === 1 ? 'pessoa apoiou' : 'pessoas já apoiaram'}
              </span>
            </div>
            {proposal.apoiosCount === 0 && (
              <p className="text-xs text-slate-700">Que pena, ninguém apoiou esse projeto ainda. Seja o primeiro! :)</p>
            )}
          </div>

          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F1891D] hover:bg-[#d9750e] text-white font-bold text-base px-8 py-4 rounded-2xl border-2 border-[#8C1A13] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>Apoiar esta proposta agora</span>
          </button>

        </div>

        {/* Full Proposal Description */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C1A13]">
            Texto Completo da Proposta:
          </h3>
          <p className="text-slate-900 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal">
            {proposal.descricao}
          </p>
        </div>

        {/* Seção de Compartilhamento Viral */}
        <div className="pt-8 border-t border-[#8C1A13]/10 space-y-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#8C1A13]">
              Faça essa proposta ganhar força!
            </h3>
            <p className="text-slate-700 text-sm mt-1">
              Compartilhe com amigos, vizinhos e grupos da sua cidade.
            </p>
          </div>

          {/* Pre-formatted WhatsApp Message Box */}
          <div className="bg-[#FFF6D5]/60 rounded-2xl p-5 border-2 border-[#8C1A13]/20 text-slate-800 text-xs sm:text-sm font-mono leading-relaxed relative">
            <span className="font-sans font-bold text-[#8C1A13] block mb-1 uppercase tracking-wider text-[10px]">
              Mensagem pré-formatada para o WhatsApp:
            </span>
            "{`Acabei de ver uma excelente proposta para ${proposal.cidade} na plataforma 'Suas ideias para as Marinas': '${proposal.titulo}'. Leia e dê seu apoio aqui: ${currentUrl}. Vamos construir juntos um São Paulo melhor!`}"
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3.5 rounded-2xl border-2 border-[#8C1A13] shadow-md transition-all scale-100 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Compartilhar no WhatsApp</span>
            </a>

            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFF6D5] text-[#8C1A13] font-bold text-sm px-6 py-3.5 rounded-2xl border-2 border-[#8C1A13] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link da Página'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Support Modal */}
      <SupportModal
        proposalId={proposal.id}
        authorFirstName={primeiroNome}
        proposalTitle={proposal.titulo}
        proposalCity={proposal.cidade}
        proposalSlug={proposal.slug}
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        onSuccess={(newCount) => {
          setProposal((prev) => prev ? { ...prev, apoiosCount: newCount } : null);
        }}
      />

    </div>
  );
}
