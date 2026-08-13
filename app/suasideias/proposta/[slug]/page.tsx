'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SupportModal from '@/components/SupportModal';
import { Proposal } from '@/lib/types';
import { 
  Heart, 
  MapPin, 
  Share2, 
  MessageCircle, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  User,
  Calendar,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ProposalDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchProposal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/suasideias/propostas?slug=${slug}`);
      const data = await res.json();

      if (!res.ok || !data.proposal) {
        throw new Error(data.error || 'Proposta não encontrada.');
      }

      setProposal(data.proposal);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao carregar proposta.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProposal();
    }
  }, [slug]);

  const handleSupportSuccess = (newCount: number) => {
    if (proposal) {
      setProposal({ ...proposal, apoiosCount: newCount });
    }
  };

  const handleShareWhatsApp = () => {
    if (!proposal) return;
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(
      `Acabei de ver uma excelente proposta para ${proposal.cidade} na plataforma 'Suas ideias para as Marinas': '${proposal.titulo}'. Leia e dê seu apoio aqui: ${currentUrl}. Vamos construir juntos um São Paulo melhor!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEF6D5] flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#506324] mx-auto" />
          <p className="text-slate-600 text-sm font-medium">Carregando proposta...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !proposal) {
    return (
      <div className="min-h-screen bg-[#FEF6D5] py-16 px-4 flex items-center justify-center">
        <div className="bg-[#FEF6D5] border-2 border-[#506324] rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-lg">
          <AlertCircle className="w-12 h-12 text-[#506324] mx-auto" />
          <h2 className="text-2xl font-serif font-bold text-[#506324]">Proposta não encontrada</h2>
          <p className="text-slate-600 text-sm">{errorMsg || 'A proposta solicitada não existe ou foi removida.'}</p>
          <Link
            href="/suasideias"
            className="inline-flex items-center gap-2 bg-[#506324] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#3A491A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    );
  }

  const primeiroNome = proposal.nome.split(' ')[0];

  return (
    <div className="min-h-screen bg-[#FEF6D5] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/suasideias#galeria-de-ideias"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#506324] hover:text-[#F28919] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a galeria de ideias</span>
          </Link>
        </div>

        {/* Main Proposal Card Container */}
        <div className="bg-[#FEF6D5] rounded-3xl p-6 sm:p-10 border-2 border-[#506324] shadow-xl space-y-8 relative overflow-hidden">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-[#506324] text-white border border-[#506324]">
                {proposal.pauta}
              </span>
              
              <div className="inline-flex items-center gap-1.5 bg-[#FEF6D5] border-2 border-[#506324] text-[#506324] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                <Heart className="w-4 h-4 text-[#F28919] fill-[#F28919]" />
                <span>{proposal.apoiosCount} {proposal.apoiosCount === 1 ? 'apoio recebido' : 'apoios recebidos'}</span>
              </div>
            </div>

            {/* Proposal Title */}
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#506324] tracking-tight leading-tight">
              {proposal.titulo}
            </h1>

            {/* Author, City & Date */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-700 pt-2 border-t border-[#506324]/10">
              <div className="flex items-center gap-1.5 font-bold text-[#506324]">
                <User className="w-4 h-4 text-[#506324]" />
                <span>Proposta enviada por {primeiroNome}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <MapPin className="w-4 h-4 text-[#F28919]" />
                <span>{proposal.cidade}</span>
              </div>
            </div>

          </div>

          {/* Detailed Proposal Content */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#506324]">
              DETALHES DA PROPOSTA
            </h3>
            <div className="prose prose-slate max-w-none text-slate-800 text-base sm:text-lg leading-relaxed whitespace-pre-line bg-[#FEF6D5] p-6 rounded-2xl border-2 border-[#506324]/20 font-sans">
              {proposal.descricao}
            </div>
          </div>

          {/* Action CTAs: Apoiar & Compartilhar */}
          <div className="pt-6 border-t-2 border-[#506324]/10 flex flex-col sm:flex-row items-center gap-4">
            
            {/* Botão Principal de Apoiar: Laranja #F28919 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex-1 bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-base py-4 px-8 rounded-2xl border-2 border-[#506324] shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-95"
            >
              <Heart className="w-5 h-5 fill-white text-white" />
              <span>Apoiar esta proposta</span>
            </button>

            {/* Botão WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base py-4 px-6 rounded-2xl border-2 border-[#506324] shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Compartilhar no WhatsApp</span>
            </button>

            {/* Botão Copiar Link */}
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto bg-[#FEF6D5] hover:bg-[#506324] hover:text-white text-[#506324] font-bold text-sm py-4 px-5 rounded-2xl border-2 border-[#506324] transition-all flex items-center justify-center gap-2"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#CACB60]" />
                  <span>Link copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Copiar link</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

      {/* Support Modal */}
      {proposal && (
        <SupportModal
          proposalId={proposal.id}
          authorFirstName={primeiroNome}
          proposalTitle={proposal.titulo}
          proposalCity={proposal.cidade}
          proposalSlug={proposal.slug}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSupportSuccess}
        />
      )}
    </div>
  );
}
