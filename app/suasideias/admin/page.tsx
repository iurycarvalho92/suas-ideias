'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal, PAUTAS } from '@/lib/types';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { isEmailAuthorized } from '@/lib/admin-whitelist';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  ExternalLink,
  Search,
  Loader2,
  Lock,
  X,
  AlertTriangle,
  LogOut,
  UserCheck,
  Download,
  Users,
  FileSpreadsheet,
  Filter,
  MessageCircle,
  Mail,
  MapPin,
  Tag
} from 'lucide-react';

interface ContactRecord {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cidade: string;
  papel: 'Autor' | 'Apoiador';
  pauta: string;
  proposalId: string;
  proposalTitulo: string;
  consentimentoContato: boolean;
  createdAt: string;
}

export default function AdminModerationPage() {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Active Tab: 'moderacao' | 'export'
  const [activeTab, setActiveTab] = useState<'moderacao' | 'export'>('moderacao');

  // Moderação State
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loadingProposals, setLoadingProposals] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'todos' | 'pendente' | 'aprovado' | 'rejeitado'>('pendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modal de Rejeição State
  const [rejectingProposal, setRejectingProposal] = useState<Proposal | null>(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');
  const [rejectError, setRejectError] = useState('');

  // Export & CRM State
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [exportPapel, setExportPapel] = useState<'todos' | 'autor' | 'apoiador'>('todos');
  const [exportPauta, setExportPauta] = useState<string>('Todas');
  const [exportCidade, setExportCidade] = useState<string>('Todas');
  const [exportProposalId, setExportProposalId] = useState<string>('Todas');
  const [exportConsentimentoOnly, setExportConsentimentoOnly] = useState<boolean>(false);

  // Firebase Auth Observer
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isEmailAuthorized(user.email)) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setAuthError('');
      } else if (user) {
        if (auth) signOut(auth);
        setCurrentUser(null);
        setIsAuthenticated(false);
        setAuthError(`O e-mail (${user.email}) não está na Whitelist de administradores autorizados.`);
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    if (!auth) {
      setAuthError('Autenticação do Firebase não configurada.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user && isEmailAuthorized(user.email)) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        if (auth) await signOut(auth);
        setCurrentUser(null);
        setIsAuthenticated(false);
        setAuthError(`O e-mail (${user?.email}) não possui permissão para acessar o painel.`);
      }
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Erro ao autenticar com o Google.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'marinas2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha incorreta! Tente novamente.');
    }
  };

  const handleLogout = async () => {
    if (auth && currentUser) {
      await signOut(auth);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const fetchProposals = async () => {
    setLoadingProposals(true);
    try {
      const res = await fetch('/api/moderacao');
      const data = await res.json();
      if (data.proposals) {
        setProposals(data.proposals);
      }
    } catch (err) {
      console.error('Erro ao buscar propostas:', err);
    } finally {
      setLoadingProposals(false);
    }
  };

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const params = new URLSearchParams();
      params.set('papel', exportPapel);
      params.set('pauta', exportPauta);
      params.set('cidade', exportCidade);
      params.set('proposalId', exportProposalId);
      if (exportConsentimentoOnly) params.set('consentimentoOnly', 'true');

      const res = await fetch(`/api/export-contatos?${params.toString()}`);
      const data = await res.json();
      if (data.contacts) {
        setContacts(data.contacts);
      }
    } catch (err) {
      console.error('Erro ao buscar contatos para exportação:', err);
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProposals();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'export') {
      fetchContacts();
    }
  }, [isAuthenticated, activeTab, exportPapel, exportPauta, exportCidade, exportProposalId, exportConsentimentoOnly]);

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

  const handleDownloadCSV = () => {
    const params = new URLSearchParams();
    params.set('format', 'csv');
    params.set('papel', exportPapel);
    params.set('pauta', exportPauta);
    params.set('cidade', exportCidade);
    params.set('proposalId', exportProposalId);
    if (exportConsentimentoOnly) params.set('consentimentoOnly', 'true');

    window.open(`/api/export-contatos?${params.toString()}`, '_blank');
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FEF6D5] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#506324] mx-auto" />
          <p className="text-slate-600 text-sm font-medium">Verificando permissões de acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FEF6D5] flex items-center justify-center p-4">
        <div className="bg-[#FEF6D5] border-2 border-[#506324] rounded-3xl p-8 max-w-md w-full shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#506324] text-[#FEF6D5] rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#506324]">Moderação de Propostas</h2>
            <p className="text-xs text-slate-600">Acesso restrito para a equipe autorizada das campanhas.</p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-2xl font-medium space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-rose-900">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Acesso Não Autorizado</span>
              </p>
              <p>{authError}</p>
            </div>
          )}

          {/* BOTÃO OFICIAL DE LOGIN VIA GOOGLE */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm py-3.5 px-4 rounded-2xl border-2 border-[#506324] shadow-md transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Entrar com o Google</span>
          </button>

          {/* Divisor */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#506324]/20 w-full" />
            <span className="bg-[#FEF6D5] px-3 text-xs text-slate-500 font-bold uppercase">ou senha</span>
            <div className="border-t border-[#506324]/20 w-full" />
          </div>

          {/* Form com Senha de Fallback */}
          <form onSubmit={handlePasswordLogin} className="space-y-4">
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
              Acessar com Senha
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
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#506324] bg-[#CACB60]/30 px-3 py-1 rounded-full border border-[#CACB60]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Administrativo</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#506324]">Central de Controle das Marinas</h1>
            
            {currentUser && (
              <p className="text-xs text-[#506324] font-medium flex items-center gap-1.5 pt-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Conectado como <strong>{currentUser.displayName || currentUser.email}</strong> ({currentUser.email})</span>
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-slate-300 hover:border-rose-300 px-4 py-2 rounded-xl transition-all self-start sm:self-auto shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair do Painel</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-[#506324]/20 gap-2">
          <button
            onClick={() => setActiveTab('moderacao')}
            className={`pb-3 px-5 text-sm font-bold border-b-4 transition-all flex items-center gap-2 ${
              activeTab === 'moderacao'
                ? 'border-[#506324] text-[#506324]'
                : 'border-transparent text-slate-500 hover:text-[#506324]'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Moderação de Propostas</span>
            <span className="bg-[#506324]/15 text-[#506324] text-xs px-2 py-0.5 rounded-full font-sans font-black">
              {proposals.filter(p => p.status === 'pendente').length} pendentes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 px-5 text-sm font-bold border-b-4 transition-all flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#506324] text-[#506324]'
                : 'border-transparent text-slate-500 hover:text-[#506324]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>📊 CRM & Exportação de Contatos</span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: MODERAÇÃO DE PROPOSTAS                                */}
        {/* ============================================================ */}
        {activeTab === 'moderacao' && (
          <div className="space-y-6">
            
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
            {loadingProposals ? (
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
        )}

        {/* ============================================================ */}
        {/* TAB 2: CRM & EXPORTAÇÃO DE CONTATOS                           */}
        {/* ============================================================ */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            
            {/* Filter Panel for CRM */}
            <div className="bg-[#FEF6D5] p-6 rounded-3xl border-2 border-[#506324]/20 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#506324]/15 pb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#506324]" />
                  <h3 className="font-serif font-bold text-lg text-[#506324]">Segmentação e Filtros do Relatório</h3>
                </div>
                <button
                  onClick={handleDownloadCSV}
                  className="bg-[#F28919] hover:bg-[#d9750e] text-white font-bold text-xs py-3 px-6 rounded-2xl border-2 border-[#506324] shadow-md transition-all flex items-center gap-2 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Relatório em CSV (Excel)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Papel */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    Papel do Contato:
                  </label>
                  <select
                    value={exportPapel}
                    onChange={(e) => setExportPapel(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-[#506324]"
                  >
                    <option value="todos">Todos (Autores + Apoiadores)</option>
                    <option value="autor">Apenas Autores de Propostas</option>
                    <option value="apoiador">Apenas Apoiadores de Ideias</option>
                  </select>
                </div>

                {/* 2. Proposta Específica */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    Projeto / Proposta Específica:
                  </label>
                  <select
                    value={exportProposalId}
                    onChange={(e) => setExportProposalId(e.target.value)}
                    className="w-full p-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-[#506324] truncate"
                  >
                    <option value="Todas">Todas as propostas</option>
                    {proposals.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.titulo} ({p.cidade})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Pauta / Tema */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    Pauta / Tema:
                  </label>
                  <select
                    value={exportPauta}
                    onChange={(e) => setExportPauta(e.target.value)}
                    className="w-full p-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-[#506324]"
                  >
                    <option value="Todas">Todas as pautas</option>
                    {PAUTAS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Cidade */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#506324] mb-1.5">
                    Cidade em SP:
                  </label>
                  <input
                    type="text"
                    value={exportCidade === 'Todas' ? '' : exportCidade}
                    onChange={(e) => setExportCidade(e.target.value.trim() ? e.target.value : 'Todas')}
                    placeholder="Todas as cidades (ou digite para filtrar)"
                    className="w-full p-2.5 bg-[#FEF6D5] border-2 border-[#506324]/30 rounded-xl text-xs text-slate-800 font-bold focus:outline-none focus:border-[#506324]"
                  />
                </div>

              </div>

              {/* Toggle Consentimento LGPD */}
              <div className="pt-2 flex items-center justify-between border-t border-[#506324]/10">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#506324]">
                  <input
                    type="checkbox"
                    checked={exportConsentimentoOnly}
                    onChange={(e) => setExportConsentimentoOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-[#506324] focus:ring-[#506324]"
                  />
                  <span>Exportar apenas contatos com consentimento de comunicação (WhatsApp / E-mail)</span>
                </label>

                {(exportPapel !== 'todos' || exportPauta !== 'Todas' || exportCidade !== 'Todas' || exportProposalId !== 'Todas' || exportConsentimentoOnly) && (
                  <button
                    onClick={() => {
                      setExportPapel('todos');
                      setExportPauta('Todas');
                      setExportCidade('Todas');
                      setExportProposalId('Todas');
                      setExportConsentimentoOnly(false);
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-[#506324] underline"
                  >
                    Limpar filtros do relatório
                  </button>
                )}
              </div>

            </div>

            {/* Metrics Counter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#FEF6D5] p-5 rounded-3xl border-2 border-[#506324]/20 text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contatos Filtrados</span>
                <p className="text-3xl font-serif font-black text-[#506324]">{contacts.length}</p>
              </div>
              <div className="bg-[#FEF6D5] p-5 rounded-3xl border-2 border-[#506324]/20 text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Autores de Propostas</span>
                <p className="text-3xl font-serif font-black text-[#F28919]">
                  {contacts.filter(c => c.papel === 'Autor').length}
                </p>
              </div>
              <div className="bg-[#FEF6D5] p-5 rounded-3xl border-2 border-[#506324]/20 text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Apoiadores Registrados</span>
                <p className="text-3xl font-serif font-black text-[#3A491A]">
                  {contacts.filter(c => c.papel === 'Apoiador').length}
                </p>
              </div>
            </div>

            {/* Preview Table */}
            <div className="bg-[#FEF6D5] rounded-3xl border-2 border-[#506324]/20 shadow-sm overflow-hidden">
              <div className="p-4 bg-[#506324] text-white flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm">Pré-visualização dos Registros ({contacts.length})</h4>
                <span className="text-xs text-[#FEF6D5]/80 font-sans">Exibindo dados sanitizados em tempo real</span>
              </div>

              {loadingContacts ? (
                <div className="text-center py-16">
                  <Loader2 className="w-8 h-8 animate-spin text-[#506324] mx-auto mb-2" />
                  <p className="text-slate-600 text-sm">Gerando visualização dos contatos...</p>
                </div>
              ) : contacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#FEF6D5] text-[#506324] font-bold uppercase tracking-wider border-b-2 border-[#506324]/20">
                        <th className="p-3.5">Nome</th>
                        <th className="p-3.5">Contato</th>
                        <th className="p-3.5">Cidade</th>
                        <th className="p-3.5">Papel</th>
                        <th className="p-3.5">Pauta</th>
                        <th className="p-3.5">Projeto / Proposta</th>
                        <th className="p-3.5">Data</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#506324]/10">
                      {contacts.map((c) => (
                        <tr key={c.id} className="hover:bg-[#506324]/5 transition-colors">
                          <td className="p-3.5 font-bold text-[#506324] whitespace-nowrap">{c.nome}</td>
                          <td className="p-3.5 space-y-1">
                            <div className="flex items-center gap-1 text-slate-700">
                              <Mail className="w-3 h-3 text-[#506324]" />
                              <span>{c.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3 text-[#25D366]" />
                              <a
                                href={`https://wa.me/55${c.whatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-700 hover:text-[#25D366] underline font-mono"
                              >
                                {c.whatsapp}
                              </a>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-700 whitespace-nowrap font-medium">{c.cidade}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                              c.papel === 'Autor' 
                                ? 'bg-[#F28919]/15 text-[#F28919] border-[#F28919]/40' 
                                : 'bg-[#506324]/15 text-[#506324] border-[#506324]/40'
                            }`}>
                              {c.papel}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-700 whitespace-nowrap">{c.pauta}</td>
                          <td className="p-3.5 text-slate-700 max-w-xs truncate font-medium" title={c.proposalTitulo}>
                            {c.proposalTitulo}
                          </td>
                          <td className="p-3.5 text-slate-500 whitespace-nowrap">
                            {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-600 text-sm">
                  Nenhum contato atende aos critérios dos filtros selecionados.
                </div>
              )}

            </div>

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
