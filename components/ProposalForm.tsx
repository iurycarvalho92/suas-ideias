'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CityAutocomplete from './CityAutocomplete';
import { PAUTAS, Pauta } from '@/lib/types';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

function ProposalFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [pauta, setPauta] = useState<Pauta | ''>('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [lgpd1, setLgpd1] = useState(false);
  const [lgpd2, setLgpd2] = useState(false);
  const [lgpd3, setLgpd3] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-prefill from query parameters ?cidade=...&pauta=...
  useEffect(() => {
    const qCidade = searchParams.get('cidade');
    const qPauta = searchParams.get('pauta');

    if (qCidade) {
      setCidade(qCidade);
    }
    if (qPauta && PAUTAS.includes(qPauta as Pauta)) {
      setPauta(qPauta as Pauta);
    }
  }, [searchParams]);

  // Phone mask formatting
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

    if (!lgpd1 || !lgpd2 || !lgpd3) {
      setErrorMsg('Por favor, confirme os 3 termos de consentimento e LGPD para prosseguir.');
      return;
    }

    if (descricao.trim().length < 50) {
      setErrorMsg('A descrição da proposta precisa ter no mínimo 50 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/suasideias/propostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp,
          email,
          cidade,
          pauta,
          titulo,
          descricao,
          lgpd1,
          lgpd2,
          lgpd3,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Não foi possível enviar a proposta.');
      }

      // Redirect to proposal pending page
      router.push(`/suasideias/proposta/${data.proposal.slug}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar sua proposta. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div id="formulario-de-envio" className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#8C1A13] shadow-lg relative overflow-hidden">
      
      {/* Header Badge & Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFF6D5] text-[#8C1A13] text-xs font-bold rounded-full border border-[#8C1A13]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F1891D]" />
          <span>Participe do Plano de Ação</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#8C1A13] tracking-tight">
          Qual é a sua ideia?
        </h2>
        <p className="text-slate-700 text-sm sm:text-base mt-1.5">
          Preencha os campos abaixo. Leva menos de 2 minutos.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-[#F0AECA]/30 border-2 border-[#8C1A13] text-[#8C1A13] text-sm rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#8C1A13] shrink-0 mt-0.5" />
          <div>{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Personal info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Nome */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-2">
              Nome completo*
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Marina Silva"
              className="w-full px-4 py-3 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-2">
              WhatsApp / Celular*
            </label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={handleWhatsappChange}
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13] transition-all placeholder:text-slate-400"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-2">
              E-mail principal*
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13] transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Cidade Autocomplete */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-2">
              Sua cidade em SP*
            </label>
            <CityAutocomplete
              value={cidade}
              onChange={setCidade}
              required
              placeholder="Selecione sua cidade em SP"
            />
          </div>

        </div>

        {/* Pauta / Tema Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13] mb-2">
            Qual a pauta principal da sua ideia?*
          </label>
          <select
            required
            value={pauta}
            onChange={(e) => setPauta(e.target.value as Pauta)}
            className="w-full px-4 py-3 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13] transition-all"
          >
            <option value="">Selecione o tema</option>
            {PAUTAS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Título da Ideia */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13]">
              Título da sua proposta*
            </label>
            <span className={`text-xs ${titulo.length > 80 ? 'text-[#8C1A13] font-bold' : 'text-slate-500'}`}>
              {titulo.length}/80 caracteres
            </span>
          </div>
          <input
            type="text"
            required
            maxLength={80}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Regulação de Publicidade de Bets — máx. 80 caracteres"
            className="w-full px-4 py-3 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13] transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Descrição em Detalhes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8C1A13]">
              Descreva sua ideia em detalhes*
            </label>
            <span className={`text-xs ${descricao.length < 50 || descricao.length > 1000 ? 'text-[#F1891D] font-bold' : 'text-[#4F6219] font-bold'}`}>
              {descricao.length}/1000 caracteres (mín. 50)
            </span>
          </div>
          <textarea
            required
            rows={5}
            minLength={50}
            maxLength={1000}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Conte para nós o problema atual e qual mudança você sugere... — min. 50 e máx. 1000 caracteres"
            className="w-full px-4 py-3 bg-[#FFF6D5]/40 border-2 border-[#8C1A13]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#8C1A13] transition-all placeholder:text-slate-400 leading-relaxed"
          />
        </div>

        {/* LGPD Checkboxes */}
        <div className="space-y-3 pt-2 border-t border-[#8C1A13]/10 text-xs text-slate-700">
          
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={lgpd1}
              onChange={(e) => setLgpd1(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#F1891D] border-[#8C1A13] rounded focus:ring-[#F1891D] cursor-pointer"
            />
            <span className="group-hover:text-[#8C1A13] transition-colors">
              Li e concordo com os Termos de Uso e Política de Privacidade.*
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={lgpd2}
              onChange={(e) => setLgpd2(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#F1891D] border-[#8C1A13] rounded focus:ring-[#F1891D] cursor-pointer"
            />
            <span className="group-hover:text-[#8C1A13] transition-colors">
              Autorizo a exibição pública do meu primeiro nome, cidade e proposta neste site.*
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={lgpd3}
              onChange={(e) => setLgpd3(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#F1891D] border-[#8C1A13] rounded focus:ring-[#F1891D] cursor-pointer"
            />
            <span className="group-hover:text-[#8C1A13] transition-colors">
              Autorizo que a equipe das Marinas entre em contato comigo por WhatsApp ou e-mail para conversar sobre esta proposta.*
            </span>
          </label>

        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F1891D] hover:bg-[#d9750e] disabled:bg-[#F1891D]/60 text-white font-bold text-base py-4 px-6 rounded-2xl shadow-md border-2 border-[#8C1A13] transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Enviando proposta e gerando seu link...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                <span>Enviar minha proposta para análise</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

export default function ProposalForm() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-3xl p-10 border-2 border-[#8C1A13] text-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#8C1A13] mx-auto mb-2" />
        <p className="text-slate-600 text-sm">Carregando formulário...</p>
      </div>
    }>
      <ProposalFormContent />
    </Suspense>
  );
}
