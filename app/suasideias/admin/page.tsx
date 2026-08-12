'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/lib/types';
import { isAuthorizedAdmin } from '@/lib/auth-config';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Mail, 
  ExternalLink, 
  MapPin, 
  User, 
  Phone, 
  RefreshCw,
  AlertCircle,
  LogOut,
  Lock,
  Loader2,
  ShieldAlert
} from 'lucide-react';

export default function ModerationAdminPage() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  // Rejection modal state
  const [rejectingProposal, setRejectingProposal] = useState<Proposal | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Monitor Firebase Auth state
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user && isAuthorizedAdmin(user.email)) {
        fetchProposals();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setAuthError('');
    if (!auth) {
      setAuthError('Configurações de autenticação do Firebase ausentes no ambiente.');
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Erro de Login Google:', err);
      setAuthError(err.message || 'Erro ao realizar login com o Google.');
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      setCurrentUser(null);
    }
  };

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/suasideias/moderacao');
      const data = await res.json();
      if (data.proposals) {
        setProposals(data.proposals);
      }
    } catch (err) {
      console.error("Erro ao buscar propostas para moderação:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (proposalId: string) => {
    setProcessingId(proposalId);
    setFeedbackMsg(null);
    try {
      const res = await fetch('/api/suasideias/moderacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId,
          status: 'aprovado',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao aprovar proposta.');
      }

      setFeedbackMsg({
        type: 'success',
        text: `Proposta "${data.proposal.titulo}" APROVADA com sucesso! E-mail transacional enviado via Brevo.`,
      });
      fetchProposals();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingProposal || !motivoRejeicao.trim()) return;

    setProcessingId(rejectingProposal.id);
    setFeedbackMsg(null);

    try {
      const res = await fetch('/api/suasideias/moderacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId: rejectingProposal.id,
          status: 'rejeitado',
          motivoRejeicao,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erro ao rejeitar proposta.');
      }

      setFeedbackMsg({
        type: 'success',
        text: `Proposta de ${rejectingProposal.nome} REJEITADA. E-mail com motivo enviado via Brevo.`,
      });

      setRejectingProposal(null);
      setMotivoRejeicao('');
      fetchProposals();
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message });
    } finally {
      setProcessingId(null);
    }
  };

  // Auth Loading screen
  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-[#FFF6D5]">
        <Loader2 className="w-10 h-10 animate-spin text-[#14447B]" />
        <p className="text-[#14447B] text-sm font-medium">Verificando autenticação de moderação...</p>
      </div>
    );
  }

  // 1. STATE: NOT LOGGED IN
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FFF6D5]">
        <div className="bg-[#FFF6D5] rounded-3xl p-8 sm:p-12 border-2 border-[#14447B] shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-white text-[#14447B] rounded-3xl flex items-center justify-center mx-auto border-2 border-[#14447B]">
            <Lock className="w-8 h-8 text-[#14447B]" />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-extrabold text-[#14447B] tracking-tight">
              Painel de Moderação
            </h1>
            <p className="text-slate-700 text-xs mt-1.5 leading-relaxed">
              Área restrita à equipe de mobilização. Faça login com o seu e-mail autorizado para gerenciar as propostas.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-[#14447B] text-[#14447B] text-xs rounded-xl flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-[#14447B] shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-[#14447B] hover:bg-[#0D2E55] text-white font-bold text-sm py-4 px-6 rounded-2xl border-2 border-[#A3B12D] shadow-md transition-all flex items-center justify-center gap-3 scale-100 hover:scale-[1.02] active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Entrar com o Google</span>
          </button>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-[#14447B]/10">
            Acesso liberado para e-mails autorizados (ex: iury.decarvalho@gmail.com).
          </p>
        </div>
      </div>
    );
  }

  // 2. STATE: LOGGED IN BUT NOT AUTHORIZED
  if (!isAuthorizedAdmin(currentUser.email)) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FFF6D5]">
        <div className="bg-[#FFF6D5] rounded-3xl p-8 sm:p-12 border-2 border-[#14447B] shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-[#A3B12D] text-[#14447B] rounded-3xl flex items-center justify-center mx-auto border-2 border-[#14447B]">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-serif font-extrabold text-[#14447B] tracking-tight">
              Acesso Não Autorizado
            </h1>
            <p className="text-slate-700 text-xs mt-2 leading-relaxed">
              O e-mail <strong>{currentUser.email}</strong> não possui permissões de moderação no sistema.
            </p>
          </div>

          <div className="p-4 bg-white border-2 border-[#14447B]/30 rounded-2xl text-xs text-[#14447B] text-left">
            Caso você faça parte da equipe, solicite a liberação para o seu e-mail ou entre com a conta autorizada (ex: <code>iury.decarvalho@gmail.com</code>).
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-[#14447B] hover:bg-[#0D2E55] text-white font-bold text-sm py-3.5 px-6 rounded-2xl border-2 border-[#A3B12D] transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair e Trocar de Conta</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. STATE: LOGGED IN & AUTHORIZED ADMIN
  const filteredProposals = proposals.filter((p) => {
    if (filterStatus === 'todos') return true;
    return p.status === filterStatus;
  });

  const totalPropostas = proposals.length;
  const pendentes = proposals.filter((p) => p.status === 'pendente').length;
  const aprovadas = proposals.filter((p) => p.status === 'aprovado').length;
  const rejeitadas = proposals.filter((p) => p.status === 'rejeitado').length;

  return (
    <div className="min-h-screen bg-[#FFF6D5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Admin User Info Bar */}
        <div className="flex items-center justify-between bg-[#14447B] text-white rounded-2xl px-6 py-3 shadow-sm text-xs border-2 border-[#A3B12D]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A3B12D] animate-pulse" />
            <span>Autenticado como: <strong>{currentUser.email}</strong></span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 hover:text-[#A3B12D] transition-colors font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFF6D5] rounded-3xl p-6 border-2 border-[#14447B] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#14447B] text-white flex items-center justify-center font-bold shadow-sm border border-[#A3B12D]">
              <ShieldCheck className="w-6 h-6 text-[#A3B12D]" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-extrabold text-[#14447B] tracking-tight">
                Painel de Moderação Interna
              </h1>
              <p className="text-xs text-slate-600">
                Análise de propostas cidadãs e disparo de e-mails transacionais via Brevo
              </p>
            </div>
          </div>

          <button
            onClick={fetchProposals}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#14447B] hover:text-white text-[#14447B] font-bold text-xs px-4 py-2.5 rounded-xl border-2 border-[#14447B] transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Atualizar Lista</span>
          </button>
        </div>

        {feedbackMsg && (
          <div className={`p-4 rounded-2xl text-sm flex items-start gap-3 border-2 ${
            feedbackMsg.type === 'success' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-rose-50 border-rose-500 text-rose-900'
          }`}>
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>{feedbackMsg.text}</div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <button
            onClick={() => setFilterStatus('todos')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              filterStatus === 'todos' ? 'bg-[#14447B] text-white border-[#14447B] shadow-md' : 'bg-[#FFF6D5] text-[#14447B] border-[#14447B]/20 hover:border-[#14447B]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Total Enviado</span>
            <span className="text-3xl font-black mt-1 block">{totalPropostas}</span>
          </button>

          <button
            onClick={() => setFilterStatus('pendente')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              filterStatus === 'pendente' ? 'bg-[#A3B12D] text-[#14447B] border-[#14447B] shadow-md' : 'bg-[#FFF6D5] text-[#14447B] border-[#14447B]/20 hover:border-[#14447B]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Pendentes</span>
            <span className="text-3xl font-black mt-1 block">{pendentes}</span>
          </button>

          <button
            onClick={() => setFilterStatus('aprovado')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              filterStatus === 'aprovado' ? 'bg-[#14447B] text-white border-[#14447B] shadow-md' : 'bg-[#FFF6D5] text-[#14447B] border-[#14447B]/20 hover:border-[#14447B]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Aprovadas</span>
            <span className="text-3xl font-black mt-1 block">{aprovadas}</span>
          </button>

          <button
            onClick={() => setFilterStatus('rejeitado')}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              filterStatus === 'rejeitado' ? 'bg-rose-100 text-rose-900 border-[#14447B] shadow-md' : 'bg-[#FFF6D5] text-[#14447B] border-[#14447B]/20 hover:border-[#14447B]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider block opacity-80">Rejeitadas</span>
            <span className="text-3xl font-black mt-1 block">{rejeitadas}</span>
          </button>

        </div>

        {/* Proposals List */}
        <div className="bg-[#FFF6D5] rounded-3xl border-2 border-[#14447B] shadow-sm overflow-hidden">
          
          <div className="p-6 border-b-2 border-[#14447B]/10 flex items-center justify-between">
            <h3 className="font-serif font-bold text-[#14447B] text-lg">
              Propostas ({filteredProposals.length})
            </h3>
            <span className="text-xs text-slate-500">
              Filtro atual: <strong className="capitalize text-[#14447B]">{filterStatus}</strong>
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">Carregando propostas...</div>
          ) : filteredProposals.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Nenhuma proposta encontrada neste status.
            </div>
          ) : (
            <div className="divide-y border-[#14447B]/10">
              {filteredProposals.map((proposal) => (
                <div key={proposal.id} className="p-6 hover:bg-white/40 transition-colors space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
                        proposal.status === 'aprovado'
                          ? 'bg-[#14447B] text-white border-[#14447B]'
                          : proposal.status === 'rejeitado'
                          ? 'bg-rose-200 text-rose-900 border-rose-400'
                          : 'bg-[#A3B12D] text-[#14447B] border-[#14447B]/30'
                      }`}>
                        {proposal.status.toUpperCase()}
                      </span>

                      <span className="px-2.5 py-0.5 text-xs font-bold bg-white text-[#14447B] rounded-full border border-[#14447B]/20">
                        {proposal.pauta}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400 font-mono">
                      ID: {proposal.id} • {new Date(proposal.createdAt).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-serif font-bold text-[#14447B] mb-1">
                      {proposal.titulo}
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {proposal.descricao}
                    </p>
                  </div>

                  {/* Author Info metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white/70 rounded-xl p-3 text-xs text-slate-800 border border-[#14447B]/10">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#14447B]" />
                      <span>Autor: <strong>{proposal.nome}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A3B12D]" />
                      <span>Cidade: <strong>{proposal.cidade}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{proposal.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{proposal.whatsapp}</span>
                    </div>
                  </div>

                  {proposal.motivoRejeicao && (
                    <div className="p-3 bg-rose-50 text-rose-900 text-xs rounded-xl border border-rose-200">
                      <strong>Motivo da rejeição enviado:</strong> {proposal.motivoRejeicao}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <Link
                      href={`/suasideias/proposta/${proposal.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14447B] hover:underline"
                    >
                      <span>Ver Página Pública</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {proposal.status !== 'aprovado' && (
                        <button
                          onClick={() => handleApprove(proposal.id)}
                          disabled={processingId === proposal.id}
                          className="inline-flex items-center gap-1.5 bg-[#14447B] hover:bg-[#0D2E55] disabled:bg-[#14447B]/50 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs border border-[#A3B12D]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A3B12D]" />
                          <span>Aprovar & Enviar E-mail 2</span>
                        </button>
                      )}

                      {proposal.status !== 'rejeitado' && (
                        <button
                          onClick={() => setRejectingProposal(proposal)}
                          disabled={processingId === proposal.id}
                          className="inline-flex items-center gap-1.5 bg-rose-700 hover:bg-rose-800 disabled:bg-rose-400 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Rejeitar & Informar Motivo</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Reject Reason Modal */}
        {rejectingProposal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <div className="bg-[#FFF6D5] rounded-3xl max-w-lg w-full p-6 space-y-4 border-2 border-[#14447B] shadow-2xl">
              <h3 className="font-serif font-extrabold text-[#14447B] text-lg">
                Rejeitar Proposta: "{rejectingProposal.titulo}"
              </h3>
              <p className="text-slate-700 text-xs">
                Escreva o motivo explicativo que será enviado por e-mail para {rejectingProposal.nome} ({rejectingProposal.email}):
              </p>

              <form onSubmit={handleConfirmReject} className="space-y-4">
                <textarea
                  required
                  rows={4}
                  value={motivoRejeicao}
                  onChange={(e) => setMotivoRejeicao(e.target.value)}
                  placeholder="Exemplos: Conteúdo duplicado / Informações incompletas / Não atende às diretrizes de respeito da plataforma."
                  className="w-full px-4 py-3 bg-white border-2 border-[#14447B]/20 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-[#14447B]"
                />

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRejectingProposal(null)}
                    className="px-4 py-2.5 bg-white text-[#14447B] font-bold text-xs rounded-xl border border-[#14447B]/20"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#14447B] text-white font-bold text-xs rounded-xl shadow-md border border-[#A3B12D]"
                  >
                    Confirmar Rejeição & Disparar E-mail 3
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
