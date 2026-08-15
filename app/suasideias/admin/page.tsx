'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/lib/types';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Search,
  Loader2,
  Lock,
  X,
  AlertTriangle
} from 'lucide-react';

export default function AdminModerationPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'todos' | 'pendente' | 'aprovado' | 'rejeitado'>('pendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modal de Rejeição State
  const [rejectingProposal, setRejectingProposal] = useState<Proposal | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');
  const [rejectError, setRejectError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'marinas2026') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta! Tente novamente.');
    }
  };

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/moderacao');
      const data = await res.json();
      if (data.proposals) {
        setProposals(data.proposals);
      }
    } catch (err) {
      console.error('Erro ao buscar propostas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProposals();
    }
  }, [isAuthenticated]);

  const handleApprove = async (id: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/moderacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposalId: id, status: 'aprovado' }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProposals((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: 'aprovado' } : p))
        );
      } else {
        alert(data.error || 'Erro ao aprovar proposta.');
      }
    } catch (err) {
      alert('Erro de conexão ao aprovar proposta.');
    } finally {
      setUpdatingId(null);
    }
  };

  const openRejectModal = (proposal: Proposal) => {
    setRejectingProposal(proposal);
    setMotivoRejeicao('');
    setRejectError('');
  };

  const handleConfirmReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingProposal) return;
    if (!motivoRejeicao.trim()) {
      setRejectError('Por favor, informe a justificativa da rejeição.');
      return;
    }

    setUpdatingId(rejectingProposal.id);
    setRejectError('');

    try {
      const res = await fetch('/api/moderacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          proposalId: rejectingProposal.id, 
          status: 'rejeitado',
          motivoRejeicao: motivoRejeicao.trim()
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProposals((prev) =>
          prev.map((p) => (p.id === rejectingProposal.id ? { ...p, status: 'rejeitado', motivoRejeicao: motivoRejeicao.trim() } : p))
        );
        setRejectingProposal(null);
        setMotivoRejeicao('');
      } else {
        setRejectError(data.error || 'Erro ao rejeitar proposta.');
      }
    } catch (err) {
      setRejectError('Erro de conexão ao rejeitar proposta.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProposals = proposals.filter((p) => {
    if (filterStatus !== 'todos' && p.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.titulo.toLowerCase().includes(q) ||
        p.nome.toLowerCase().includes(q) ||
        p.cidade.toLowerCase().includes(q) ||
        p.pauta.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FEF6D5] flex items-center justify-center p-4">
        <div className="bg-[#FEF6D5] border-2 border-[#506324] rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#506324] text-[#FEF6D5] rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#506324]">Moderação de Propostas</h2>
            <p className="text-xs text-slate-600">Acesso restrito para a equipe das campanhas.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
                Senha de Acesso:
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha..."
                className="w-full px-4 py-3 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#506324]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#506324] hover:bg-[#3A491A] text-white font-bold text-sm py-3 px-4 rounded-xl transition-all"
            >
              Acessar Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEF6D5] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FEF6D5] p-6 rounded-3xl border-2 border-[#506324] shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#506324] bg-[#CACB60]/30 px-3 py-1 rounded-full border border-[#CACB60] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Administrativo</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#506324]">Moderação de Propostas</h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-bold text-slate-500 hover:text-[#506324] self-start sm:self-auto"
          >
            Sair do Painel
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#FEF6D5] p-6 rounded-3xl border-2 border-[#506324]/20 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {(['todos', 'pendente', 'aprovado', 'rejeitado'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 text-xs font-bold rounded-full capitalize border-2 transition-all ${
                  filterStatus === status
                    ? 'bg-[#506324] text-white border-[#506324]'
                    : 'bg-[#FEF6D5] text-[#506324] border-[#506324]/20 hover:border-[#506324]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, autor..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-xs focus:outline-none focus:border-[#506324]"
            />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#506324] mx-auto mb-2" />
            <p className="text-slate-600 text-sm">Carregando propostas...</p>
          </div>
        ) : filteredProposals.length > 0 ? (
          <div className="space-y-4">
            {filteredProposals.map((p) => (
              <div
                key={p.id}
                className="bg-[#FEF6D5] rounded-3xl p-6 border-2 border-[#506324]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#506324] text-white">
                      {p.pauta}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">• {p.cidade}</span>
                    <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md border ${
                      p.status === 'aprovado' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      p.status === 'rejeitado' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                      'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-[#506324]">{p.titulo}</h3>
                  <p className="text-slate-700 text-sm line-clamp-2">{p.descricao}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>Autor: <strong>{p.nome}</strong> ({p.email} | {p.whatsapp})</span>
                    <span>• Apoios: <strong>{p.apoiosCount}</strong></span>
                  </div>

                  {p.motivoRejeicao && (
                    <div className="text-xs bg-rose-50 text-rose-800 border border-rose-200 rounded-xl p-3 mt-2">
                      <strong>Motivo da rejeição:</strong> {p.motivoRejeicao}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[#506324]/10">
                  <button
                    onClick={() => handleApprove(p.id)}
                    disabled={updatingId === p.id || p.status === 'aprovado'}
                    className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Aprovar</span>
                  </button>

                  <button
                    onClick={() => openRejectModal(p)}
                    disabled={updatingId === p.id || p.status === 'rejeitado'}
                    className="flex-1 md:flex-initial bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Rejeitar</span>
                  </button>

                  <Link
                    href={`/proposta/${p.slug}`}
                    target="_blank"
                    className="p-2.5 text-slate-400 hover:text-[#506324] rounded-xl hover:bg-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#FEF6D5] rounded-3xl p-12 text-center border-2 border-[#506324]/20">
            <p className="text-slate-600 text-sm font-medium">Nenhuma proposta encontrada para o filtro atual.</p>
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL DE REJEIÇÃO COM CAMPO DE JUSTIFICATIVA                 */}
      {/* ============================================================ */}
      {rejectingProposal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FEF6D5] border-2 border-[#506324] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            
            <button
              onClick={() => setRejectingProposal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#506324] p-1.5 rounded-full hover:bg-[#506324]/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#506324]/15 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-300">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#506324]">Justificativa da Rejeição</h3>
                <p className="text-xs text-slate-600">Este motivo será enviado por e-mail para o autor da proposta.</p>
              </div>
            </div>

            <div className="bg-[#FEF6D5] border border-[#506324]/20 rounded-2xl p-3 text-xs space-y-1">
              <p className="font-bold text-[#506324]">Proposta: "{rejectingProposal.titulo}"</p>
              <p className="text-slate-600">Autor: {rejectingProposal.nome} ({rejectingProposal.email})</p>
            </div>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              
              {/* Opções de Justificativa Rápida */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
                  Sugestões Rápidas:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Fora do escopo constitucional do cargo.',
                    'Proposta duplicada já existente no site.',
                    'Linguagem inadequada ou descumprimento das diretrizes.',
                    'Falta de detalhamento sobre a solução proposta.'
                  ].map((sugestao) => (
                    <button
                      key={sugestao}
                      type="button"
                      onClick={() => setMotivoRejeicao(sugestao)}
                      className="text-[11px] font-semibold bg-[#FEF6D5] hover:bg-[#506324] text-[#506324] hover:text-white border border-[#506324]/30 rounded-lg px-2.5 py-1 transition-all text-left"
                    >
                      + {sugestao}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea do Motivo */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-2">
                  Escreva a Justificativa (Obrigatório):
                </label>
                <textarea
                  required
                  rows={4}
                  value={motivoRejeicao}
                  onChange={(e) => setMotivoRejeicao(e.target.value)}
                  placeholder="Explique o motivo para o autor poder entender e refazer a ideia..."
                  className="w-full p-3.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#506324] transition-colors"
                />
              </div>

              {rejectError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  {rejectError}
                </p>
              )}

              {/* Ações */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectingProposal(null)}
                  className="flex-1 bg-[#FEF6D5] hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-300 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updatingId === rejectingProposal.id || !motivoRejeicao.trim()}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {updatingId === rejectingProposal.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span>Confirmar Rejeição</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
