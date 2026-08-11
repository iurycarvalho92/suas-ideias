import { NextRequest, NextResponse } from 'next/server';
import { updateProposalStatus, getProposalByIdOrSlug, getAllProposalsForAdmin } from '@/lib/db-store';
import { sendEmailProposta } from '@/lib/brevo';

export async function GET() {
  try {
    const proposals = await getAllProposalsForAdmin();
    return NextResponse.json({ proposals });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar propostas para moderação.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { proposalId, status, motivoRejeicao } = body;

    if (!proposalId || !['aprovado', 'rejeitado'].includes(status)) {
      return NextResponse.json(
        { error: 'ID da proposta e novo status válido (aprovado/rejeitado) são obrigatórios.' },
        { status: 400 }
      );
    }

    if (status === 'rejeitado' && !motivoRejeicao?.trim()) {
      return NextResponse.json(
        { error: 'Por favor, informe o motivo da rejeição para orientar o autor.' },
        { status: 400 }
      );
    }

    const proposalBefore = await getProposalByIdOrSlug(proposalId);
    if (!proposalBefore) {
      return NextResponse.json({ error: 'Proposta não encontrada.' }, { status: 404 });
    }

    const updatedProposal = await updateProposalStatus(proposalId, status, motivoRejeicao);
    if (!updatedProposal) {
      return NextResponse.json({ error: 'Erro ao atualizar status da proposta.' }, { status: 500 });
    }

    // Build public proposal URL
    const host = req.headers.get('host') || 'marinasporsp.com.br';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const proposalUrl = `${protocol}://${host}/suasideias/proposta/${updatedProposal.slug}`;

    // Dispatch transactional email
    if (status === 'aprovado') {
      await sendEmailProposta({
        email: updatedProposal.email,
        nome: updatedProposal.nome,
        titulo: updatedProposal.titulo,
        cidade: updatedProposal.cidade,
        url: proposalUrl,
        status: 'aprovado',
      });
    } else if (status === 'rejeitado') {
      await sendEmailProposta({
        email: updatedProposal.email,
        nome: updatedProposal.nome,
        titulo: updatedProposal.titulo,
        cidade: updatedProposal.cidade,
        url: proposalUrl,
        status: 'rejeitado',
        motivoRejeicao: motivoRejeicao,
      });
    }

    return NextResponse.json({
      success: true,
      proposal: updatedProposal,
    });
  } catch (error) {
    console.error('Erro na moderação:', error);
    return NextResponse.json({ error: 'Erro ao processar moderação.' }, { status: 500 });
  }
}
