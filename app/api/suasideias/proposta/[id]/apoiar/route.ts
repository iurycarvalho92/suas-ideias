import { NextRequest, NextResponse } from 'next/server';
import { addSupport, getProposalByIdOrSlug } from '@/lib/db-store';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalIdOrSlug = params.id;
    const body = await req.json();
    const { nome, whatsapp, email, cidade, consentimentoContato } = body;

    if (!nome || !whatsapp || !email || !cidade) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios para apoiar.' },
        { status: 400 }
      );
    }

    const proposal = await getProposalByIdOrSlug(proposalIdOrSlug);
    if (!proposal) {
      return NextResponse.json(
        { error: 'Proposta não encontrada.' },
        { status: 404 }
      );
    }

    if (proposal.status !== 'aprovado') {
      return NextResponse.json(
        { error: 'Apenas propostas aprovadas podem receber apoios públicos.' },
        { status: 400 }
      );
    }

    const result = await addSupport(proposal.id, {
      nome,
      whatsapp,
      email,
      cidade,
      consentimentoContato: Boolean(consentimentoContato),
    });

    return NextResponse.json({
      success: true,
      newCount: result.newCount,
    });
  } catch (error) {
    console.error('Erro ao registrar apoio:', error);
    return NextResponse.json(
      { error: 'Erro interno ao registrar seu apoio.' },
      { status: 500 }
    );
  }
}
