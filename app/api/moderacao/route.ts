import { NextRequest, NextResponse } from 'next/server';
import { 
  updateProposalStatus, 
  getProposalByIdOrSlug, 
  getAllProposalsForAdmin,
  updateProposalDetails,
  deleteProposal
} from '@/lib/db-store';
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

    if (!proposalId || !['aprovado', 'rejeitado', 'pendente'].includes(status)) {
      return NextResponse.json(
        { error: 'ID da proposta e novo status válido (aprovado/rejeitado/pendente) são obrigatórios.' },
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
    const host = req.headers.get('host') || 'suasideias.marinasporsp.com.br';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const proposalUrl = `${protocol}://${host}/proposta/${updatedProposal.slug}`;

    // Dispatch transactional email
    if (status === 'aprovado') {
      try {
        await sendEmailProposta({
          email: updatedProposal.email,
          nome: updatedProposal.nome,
          titulo: updatedProposal.titulo,
          cidade: updatedProposal.cidade,
          url: proposalUrl,
          status: 'aprovado',
        });
      } catch (e) {
        console.warn("Email send error:", e);
      }
    } else if (status === 'rejeitado') {
      try {
        await sendEmailProposta({
          email: updatedProposal.email,
          nome: updatedProposal.nome,
          titulo: updatedProposal.titulo,
          cidade: updatedProposal.cidade,
          url: proposalUrl,
          status: 'rejeitado',
          motivoRejeicao: motivoRejeicao,
        });
      } catch (e) {
        console.warn("Email send error:", e);
      }
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

// Edição de Proposta (PUT)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { proposalId, titulo, descricao, pauta, cidade, nome, email, whatsapp } = body;

    if (!proposalId || !titulo || !descricao || !pauta || !cidade) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const updated = await updateProposalDetails(proposalId, {
      titulo,
      descricao,
      pauta,
      cidade,
      nome,
      email,
      whatsapp,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Proposta não encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, proposal: updated });
  } catch (error) {
    console.error('Erro ao editar proposta:', error);
    return NextResponse.json({ error: 'Erro ao atualizar dados da proposta.' }, { status: 500 });
  }
}

// Exclusão de Proposta (DELETE)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let proposalId = searchParams.get('proposalId');
    if (!proposalId) {
      try {
        const body = await req.json();
        proposalId = body.proposalId;
      } catch (e) {}
    }

    if (!proposalId) {
      return NextResponse.json({ error: 'ID da proposta não informado.' }, { status: 400 });
    }

    const success = await deleteProposal(proposalId);
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Erro ao excluir proposta:', error);
    return NextResponse.json({ error: 'Erro ao excluir proposta.' }, { status: 500 });
  }
}
