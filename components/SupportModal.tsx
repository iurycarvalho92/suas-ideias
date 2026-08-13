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
  const [sobrenome, setSobrenome] = useState('');
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
    setWhatsapp(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const nomeCompleto = `${nome.trim()} ${sobrenome.trim()}`;

    try {
      const res = await fetch(`/api/suasideias/proposta/${proposalId}/apoiar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeCompleto,
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
      <div className="bg-[#FEF6D5] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-[#506324] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#506324] p-1.5 rounded-full hover:bg-white/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#CACB60] text-[#506324] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 fill-[#506324] text-[#506324]" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-[#506324] text-xl">
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
              
              {/* Separar Nome e Sobrenome */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    NOME*
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João"
                    className="w-full px-4 py-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    SOBRENOME*
                  </label>
                  <input
                    type="text"
                    required
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    placeholder="Ex: Souza"
                    className="w-full px-4 py-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    WHATSAPP*
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    placeholder="11980001111"
                    className="w-full px-4 py-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    E-MAIL*
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                  SUA CIDADE*
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
                    className="mt-0.5 w-4 h-4 text-[#506324] border-[#506324] rounded focus:ring-[#506324]"
                  />
                  <span>Autorizo que a equipe das Marinas entre em contato para atualizações sobre o projeto.</span>
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-base py-3.5 px-5 rounded-xl border-2 border-[#506324] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Registrando apoio...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-white text-white" />
                      <span>Confirmar meu apoio</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 bg-white text-[#506324] rounded-full flex items-center justify-center mx-auto border-2 border-[#506324]">
              <CheckCircle2 className="w-10 h-10 text-[#CACB60]" />
            </div>
            <h3 className="font-serif font-extrabold text-[#506324] text-xl">
              Apoio registrado com sucesso!
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed">
              Muito obrigado por se juntar a nós! Ajude essa ideia a crescer compartilhando no WhatsApp com seus amigos e grupos.
            </p>
            <div className="pt-2 space-y-3">
              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm py-3 px-5 rounded-xl border-2 border-[#506324] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compartilhar no WhatsApp agora</span>
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#FEF6D5] hover:bg-[#506324] hover:text-white text-[#506324] font-bold text-xs py-2.5 px-4 rounded-xl border-2 border-[#506324] transition-colors"
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
