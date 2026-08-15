'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CityAutocomplete from './CityAutocomplete';
import { PAUTAS, Pauta } from '@/lib/types';
import { Send, AlertCircle, Loader2, Sparkles } from 'lucide-react';

function ProposalFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form Fields
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [pauta, setPauta] = useState<Pauta | ''>('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    setWhatsapp(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!lgpdConsent) {
      setErrorMsg('Por favor, autorize a publicação e o contato para enviar sua proposta.');
      return;
    }

    if (descricao.trim().length < 50) {
      setErrorMsg('A descrição da proposta precisa ter no mínimo 50 caracteres.');
      return;
    }

    setLoading(true);

    const nomeCompleto = `${nome.trim()} ${sobrenome.trim()}`;

    try {
      const res = await fetch('/api/suasideias/propostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeCompleto,
          whatsapp,
          email,
          cidade,
          pauta,
          titulo,
          descricao,
          lgpd1: true,
          lgpd2: true,
          lgpd3: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Não foi possível enviar a proposta.');
      }

      router.push(`/proposta/${data.proposal.slug}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocorreu um erro ao enviar sua proposta. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div id="formulario-de-envio" className="bg-[#FEF6D5] rounded-3xl p-6 sm:p-10 border-2 border-[#506324] shadow-xl relative overflow-hidden">
      
      {/* Header Badge & Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FEF6D5] text-[#506324] text-xs font-bold rounded-full border border-[#506324]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F28919]" />
          <span>Participe do Plano de Ação</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#506324] tracking-tight">
          Qual é a sua ideia?
        </h2>
        <p className="text-[#506324]/80 text-sm sm:text-base mt-1.5">
          Preencha os campos abaixo. Leva menos de 2 minutos.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-50 border-2 border-[#506324] text-[#506324] text-sm rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#506324] shrink-0 mt-0.5" />
          <div>{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Separar Nome e Sobrenome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
              NOME*
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Marina"
              className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
              SOBRENOME*
            </label>
            <input
              type="text"
              required
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Ex: Silva"
              className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
              WHATSAPP / CELULAR*
            </label>
            <input
              type="text"
              required
              value={whatsapp}
              onChange={handleWhatsappChange}
              placeholder="11999998888"
              className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
              E-MAIL PRINCIPAL*
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Cidade Autocomplete */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
            SUA CIDADE EM SP*
          </label>
          <CityAutocomplete
            value={cidade}
            onChange={setCidade}
            required
            placeholder="Selecione sua cidade em SP"
          />
        </div>

        {/* Pauta / Tema Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
            QUAL A PAUTA PRINCIPAL DA SUA IDEIA?*
          </label>
          <select
            required
            value={pauta}
            onChange={(e) => setPauta(e.target.value as Pauta)}
            className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#506324]">
              TÍTULO DA SUA PROPOSTA*
            </label>
            <span className={`text-xs ${titulo.length > 80 ? 'text-[#506324] font-bold' : 'text-slate-500'}`}>
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
            className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Descrição em Detalhes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#506324]">
              DESCREVA SUA IDEIA EM DETALHES*
            </label>
            <span className={`text-xs ${descricao.length < 50 || descricao.length > 1000 ? 'text-[#506324] font-bold' : 'text-[#F28919] font-bold'}`}>
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
            className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324] transition-all placeholder:text-slate-400 leading-relaxed"
          />
        </div>

        {/* Single Succinct Checkbox */}
        <div className="pt-2 border-t border-[#506324]/10 text-xs text-slate-700">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={lgpdConsent}
              onChange={(e) => setLgpdConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#506324] border-[#506324] rounded focus:ring-[#506324] cursor-pointer shrink-0"
            />
            <span className="group-hover:text-[#506324] transition-colors leading-relaxed">
              Autorizo a publicação da proposta no site e o contato da equipe das Marinas por WhatsApp ou e-mail.*
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F28919] hover:bg-[#d9750e] disabled:bg-[#F28919]/60 text-white font-bold text-base py-4 px-6 rounded-2xl shadow-md border-2 border-[#506324] transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Enviando proposta e gerando seu link...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
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
      <div className="bg-[#FEF6D5] rounded-3xl p-10 border-2 border-[#506324] text-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#506324] mx-auto mb-2" />
        <p className="text-slate-600 text-sm">Carregando formulário...</p>
      </div>
    }>
      <ProposalFormContent />
    </Suspense>
  );
}
