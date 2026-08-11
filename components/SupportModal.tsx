'use client';

import React, { useState } from 'react';
import CityAutocomplete from './CityAutocomplete';
import { Heart, X, CheckCircle2, MessageCircle, Loader2 } from 'lucide-react';

interface SupportModalProps {
  proposalId: string;
  authorFirstName: string;
  proposalTitle: string;
  proposalCity: string;
  proposalSlug: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newCount: number) => void;
}

export default function SupportModal({
  proposalId,
  authorFirstName,
  proposalTitle,
  proposalCity,
  proposalSlug,
  isOpen,
  onClose,
  onSuccess,
}: SupportModalProps) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [consentimento, setConsentimento] = useState(true);

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    setWhatsapp(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`/api/suasideias/proposta/${proposalId}/apoiar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp,
          email,
          cidade,
          consentimentoContato: consentimento,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Não foi possível registrar o apoio.');
      }

      setIsSuccess(true);
      onSuccess(data.newCount);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro ao registrar apoio.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://marinasporsp.com.br/suasideias/proposta/${proposalSlug}`;
    const text = encodeURIComponent(
      `Acabei de ver uma excelente proposta para ${proposalCity} na plataforma 'Suas ideias para as Marinas': '${proposalTitle}'. Leia e dê seu apoio aqui: ${currentUrl}. Vamos construir juntos um São Paulo melhor!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-[#8C1A13] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#8C1A13] p-1.5 rounded-full hover:bg-[#FFF6D5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#F0AECA] text-[#8C1A13] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 fill-[#8C1A13] text-[#8C1A13]" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-[#8C1A13] text-xl">
                  Apoie a ideia de {authorFirstName}
                </h3>
                <p className="text-xs text-slate-600 truncate max-w-xs">
                  "{proposalTitle}"
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-1.5">
                  Seu Nome completo*
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: João Souza"
                  className="w-full px-4 py-2.5 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-1.5">
                    WhatsApp*
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-2.5 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-1.5">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2.5 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-1.5">
                  Sua Cidade*
                </label>
                <CityAutocomplete
                  value={cidade}
                  onChange={setCidade}
                  required
                  placeholder="Sua cidade em SP"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={consentimento}
                    onChange={(e) => setConsentimento(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#F1891D] border-[#8C1A13] rounded focus:ring-[#F1891D]"
                  />
                  <span>Autorizo que a equipe das Marinas entre em contato para atualizações sobre o projeto.</span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F1891D] hover:bg-[#d9750e] text-white font-bold text-sm py-3.5 px-5 rounded-xl border-2 border-[#8C1A13] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registrando apoio...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Confirmar meu apoio</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-[#FFF6D5] text-[#8C1A13] rounded-full flex items-center justify-center mx-auto border-2 border-[#8C1A13]">
              <CheckCircle2 className="w-10 h-10 text-[#4F6219]" />
            </div>
            <h3 className="font-serif font-extrabold text-[#8C1A13] text-xl">
              Apoio registrado com sucesso!
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Muito obrigado por se juntar a nós! Ajude essa ideia a crescer compartilhando no WhatsApp com seus amigos e grupos.
            </p>
            <div className="pt-2 space-y-3">
              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm py-3 px-5 rounded-xl border-2 border-[#8C1A13] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compartilhar no WhatsApp agora</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#FFF6D5] hover:bg-[#8C1A13] hover:text-[#FFF6D5] text-[#8C1A13] font-bold text-xs py-2.5 px-4 rounded-xl border-2 border-[#8C1A13] transition-colors"
              >
                Fechar janela
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
