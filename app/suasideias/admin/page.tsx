'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/lib/types';
import { 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Heart, 
  ExternalLink,
  Search,
  Loader2,
  Filter,
  Lock
} from 'lucide-react';

export default function AdminModerationPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'todos' | 'pendente' | 'aprovado' | 'rejeitado'>('pendente');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
      const res = await fetch('/api/suasideias/moderacao');
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

  const handleStatusUpdate = async (id: string, newStatus: 'aprovado' | 'rejeitado') => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/suasideias/moderacao', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProposals((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      } else {
        alert(data.error || 'Erro ao atualizar status.');
      }
    } catch (err) {
      alert('Erro de conexão ao atualizar status.');
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
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-[#506324]/10">
                  <button
                    onClick={() => handleStatusUpdate(p.id, 'aprovado')}
                    disabled={updatingId === p.id || p.status === 'aprovado'}
                    className="flex-1 md:flex-initial bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Aprovar</span>
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(p.id, 'rejeitado')}
                    disabled={updatingId === p.id || p.status === 'rejeitado'}
                    className="flex-1 md:flex-initial bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Rejeitar</span>
                  </button>

                  <Link
                    href={`/suasideias/proposta/${p.slug}`}
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
    </div>
  );
}
