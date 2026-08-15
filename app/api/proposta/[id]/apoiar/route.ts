import { NextRequest, NextResponse } from 'next/server';
import { addSupport } from '@/lib/db-store';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proposalId = params.id;
    const body = await req.json();
    const { nome, whatsapp, email, cidade, consentimentoContato } = body;

    if (!proposalId) {
      return NextResponse.json(
        { error: 'ID da proposta não informado.' },
        { status: 400 }
      );
    }

    if (!nome || !whatsapp || !email || !cidade) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios (nome, whatsapp, email, cidade) devem ser preenchidos.' },
        { status: 400 }
      );
    }

    const result = await addSupport(proposalId, {
      nome,
      whatsapp,
      email,
      cidade,
      consentimentoContato: Boolean(consentimentoContato),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Não foi possível registrar o apoio. Proposta inexistente.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      newCount: result.newCount,
    });
  } catch (error) {
    console.error('Erro no endpoint POST /api/proposta/[id]/apoiar:', error);
    return NextResponse.json(
      { error: 'Erro interno ao registrar apoio.' },
      { status: 500 }
    );
  }
}
