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

    const proposals = await getAllProposalsForAdmin();
    const supports = await getAllSupportsForAdmin();

    const proposalMap = new Map(proposals.map(p => [p.id, p]));

    let contacts: Array<{
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
        contacts.push({
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
        contacts.push({
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
      contacts = contacts.filter(c => c.pauta === pautaFilter);
    }

    if (cidadeFilter && cidadeFilter !== 'Todas') {
      const q = cidadeFilter.toLowerCase().trim();
      contacts = contacts.filter(c => c.cidade.toLowerCase().includes(q));
    }

    if (proposalIdFilter && proposalIdFilter !== 'Todas') {
      contacts = contacts.filter(c => c.proposalId === proposalIdFilter);
    }

    if (consentimentoOnly) {
      contacts = contacts.filter(c => c.consentimentoContato);
    }

    // Sort by date descending
    contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // CSV Output Format (With UTF-8 BOM for Microsoft Excel compatibility)
    if (format === 'csv') {
      const headers = ['Nome', 'E-mail', 'WhatsApp', 'Cidade', 'Papel', 'Pauta / Tema', 'Proposta Associada', 'Consentimento de Contato', 'Data de Cadastro'];
      
      const rows = contacts.map(c => [
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
      total: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error('Erro no GET /api/export-contatos:', error);
    return NextResponse.json({ error: 'Erro ao compilar lista de contatos.' }, { status: 500 });
  }
}
