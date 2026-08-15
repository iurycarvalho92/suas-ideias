import { NextRequest, NextResponse } from 'next/server';
import { getAllProposalsForAdmin, getAllSupportsForAdmin } from '@/lib/db-store';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'json';
    const papel = searchParams.get('papel') || 'todos';
    const pautaFilter = searchParams.get('pauta') || 'Todas';
    const cidadeFilter = searchParams.get('cidade') || 'Todas';
    const proposalIdFilter = searchParams.get('proposalId') || 'Todas';
    const consentimentoOnly = searchParams.get('consentimentoOnly') === 'true';
    const groupDuplicates = searchParams.get('groupDuplicates') !== 'false'; // Default to true

    const proposals = await getAllProposalsForAdmin();
    const supports = await getAllSupportsForAdmin();

    const proposalMap = new Map(proposals.map(p => [p.id, p]));

    let rawContacts: Array<{
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
    }> = [];

    // Process Autores (Propositores)
    if (papel === 'todos' || papel === 'autor') {
      for (const p of proposals) {
        rawContacts.push({
          id: `autor-${p.id}`,
          nome: p.nome,
          email: p.email,
          whatsapp: p.whatsapp,
          cidade: p.cidade,
          papel: 'Autor',
          pauta: p.pauta,
          proposalId: p.id,
          proposalTitulo: p.titulo,
          consentimentoContato: p.lgpd1 && p.lgpd2,
          createdAt: p.createdAt,
        });
      }
    }

    // Process Apoiadores
    if (papel === 'todos' || papel === 'apoiador') {
      for (const s of supports) {
        const parentProp = proposalMap.get(s.proposalId);
        rawContacts.push({
          id: `sup-${s.id}`,
          nome: s.nome,
          email: s.email,
          whatsapp: s.whatsapp,
          cidade: s.cidade,
          papel: 'Apoiador',
          pauta: parentProp ? parentProp.pauta : 'Outros',
          proposalId: s.proposalId,
          proposalTitulo: parentProp ? parentProp.titulo : 'Proposta Desconhecida',
          consentimentoContato: s.consentimentoContato,
          createdAt: s.createdAt,
        });
      }
    }

    // Apply Filters
    if (pautaFilter && pautaFilter !== 'Todas') {
      rawContacts = rawContacts.filter(c => c.pauta === pautaFilter);
    }

    if (cidadeFilter && cidadeFilter !== 'Todas') {
      const q = cidadeFilter.toLowerCase().trim();
      rawContacts = rawContacts.filter(c => c.cidade.toLowerCase().includes(q));
    }

    if (proposalIdFilter && proposalIdFilter !== 'Todas') {
      rawContacts = rawContacts.filter(c => c.proposalId === proposalIdFilter);
    }

    if (consentimentoOnly) {
      rawContacts = rawContacts.filter(c => c.consentimentoContato);
    }

    // Sort by date descending
    rawContacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Deduplication / Grouping Logic if groupDuplicates === true
    if (groupDuplicates) {
      const groupedMap = new Map<string, {
        id: string;
        nome: string;
        email: string;
        whatsapp: string;
        cidade: string;
        papéis: Set<string>;
        pautas: Set<string>;
        propostas: Set<string>;
        totalParticipacoes: number;
        consentimentoContato: boolean;
        createdAt: string;
      }>();

      for (const item of rawContacts) {
        // Key by email or whatsapp
        const key = item.email.toLowerCase().trim() || item.whatsapp.trim();
        if (!groupedMap.has(key)) {
          groupedMap.set(key, {
            id: item.id,
            nome: item.nome,
            email: item.email,
            whatsapp: item.whatsapp,
            cidade: item.cidade,
            papéis: new Set([item.papel]),
            pautas: new Set([item.pauta]),
            propostas: new Set([item.proposalTitulo]),
            totalParticipacoes: 1,
            consentimentoContato: item.consentimentoContato,
            createdAt: item.createdAt,
          });
        } else {
          const existing = groupedMap.get(key)!;
          existing.papéis.add(item.papel);
          existing.pautas.add(item.pauta);
          existing.propostas.add(item.proposalTitulo);
          existing.totalParticipacoes += 1;
          if (item.consentimentoContato) existing.consentimentoContato = true;
          if (new Date(item.createdAt).getTime() > new Date(existing.createdAt).getTime()) {
            existing.createdAt = item.createdAt;
          }
        }
      }

      const groupedContacts = Array.from(groupedMap.values()).map(g => ({
        id: g.id,
        nome: g.nome,
        email: g.email,
        whatsapp: g.whatsapp,
        cidade: g.cidade,
        papel: Array.from(g.papéis).join(' & '),
        pauta: Array.from(g.pautas).join(', '),
        proposalId: 'grouped',
        proposalTitulo: Array.from(g.propostas).join(' | '),
        totalParticipacoes: g.totalParticipacoes,
        consentimentoContato: g.consentimentoContato,
        createdAt: g.createdAt,
      }));

      if (format === 'csv') {
        const headers = ['Nome', 'E-mail', 'WhatsApp', 'Cidade', 'Papel(is)', 'Pautas', 'Participações / Projetos', 'Total de Ações', 'Consentimento LGPD', 'Última Atividade'];
        
        const rows = groupedContacts.map(c => [
          `"${c.nome.replace(/"/g, '""')}"`,
          `"${c.email.replace(/"/g, '""')}"`,
          `"${c.whatsapp.replace(/"/g, '""')}"`,
          `"${c.cidade.replace(/"/g, '""')}"`,
          `"${c.papel}"`,
          `"${c.pauta.replace(/"/g, '""')}"`,
          `"${c.proposalTitulo.replace(/"/g, '""')}"`,
          `"${c.totalParticipacoes}"`,
          `"${c.consentimentoContato ? 'Sim' : 'Não'}"`,
          `"${new Date(c.createdAt).toLocaleDateString('pt-BR')} ${new Date(c.createdAt).toLocaleTimeString('pt-BR')}"`,
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

        return new NextResponse(csvContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="contatos-agrupados-suasideias-${new Date().toISOString().slice(0, 10)}.csv"`,
          },
        });
      }

      return NextResponse.json({
        total: groupedContacts.length,
        contacts: groupedContacts,
      });
    }

    // Standard Non-Grouped CSV Output
    if (format === 'csv') {
      const headers = ['Nome', 'E-mail', 'WhatsApp', 'Cidade', 'Papel', 'Pauta / Tema', 'Proposta Associada', 'Consentimento LGPD', 'Data de Cadastro'];
      
      const rows = rawContacts.map(c => [
        `"${c.nome.replace(/"/g, '""')}"`,
        `"${c.email.replace(/"/g, '""')}"`,
        `"${c.whatsapp.replace(/"/g, '""')}"`,
        `"${c.cidade.replace(/"/g, '""')}"`,
        `"${c.papel}"`,
        `"${c.pauta.replace(/"/g, '""')}"`,
        `"${c.proposalTitulo.replace(/"/g, '""')}"`,
        `"${c.consentimentoContato ? 'Sim' : 'Não'}"`,
        `"${new Date(c.createdAt).toLocaleDateString('pt-BR')} ${new Date(c.createdAt).toLocaleTimeString('pt-BR')}"`,
      ]);

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="contatos-suasideias-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({
      total: rawContacts.length,
      contacts: rawContacts,
    });
  } catch (error) {
    console.error('Erro no GET /api/export-contatos:', error);
    return NextResponse.json({ error: 'Erro ao compilar lista de contatos.' }, { status: 500 });
  }
}
