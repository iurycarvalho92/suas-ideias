import { NextRequest, NextResponse } from 'next/server';
import { createProposal } from '@/lib/db-store';
import { sendEmailProposta } from '@/lib/brevo';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, whatsapp, email, cidade, pauta, titulo, descricao, lgpd1, lgpd2, lgpd3 } = body;

    // Validation
    if (!nome || !whatsapp || !email || !cidade || !pauta || !titulo || !descricao) {
      return NextResponse.json(
        { error: 'Todos os campos obrigatórios devem ser preenchidos.' },
        { status: 400 }
      );
    }

    if (!lgpd1 || !lgpd2 || !lgpd3) {
      return NextResponse.json(
        { error: 'É necessário aceitar os termos da LGPD e divulgação para enviar sua proposta.' },
        { status: 400 }
      );
    }

    if (titulo.length > 80) {
      return NextResponse.json(
        { error: 'O título deve ter no máximo 80 caracteres.' },
        { status: 400 }
      );
    }

    if (descricao.length < 50 || descricao.length > 1000) {
      return NextResponse.json(
        { error: 'A descrição deve ter entre 50 e 1000 caracteres.' },
        { status: 400 }
      );
    }

    // Save proposal to database with status 'pendente'
    const proposal = await createProposal({
      nome,
      whatsapp,
      email,
      cidade,
      pauta,
      titulo,
      descricao,
      lgpd1: Boolean(lgpd1),
      lgpd2: Boolean(lgpd2),
      lgpd3: Boolean(lgpd3),
    });

    // Build public proposal URL
    const host = req.headers.get('host') || 'marinasporsp.com.br';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const proposalUrl = `${protocol}://${host}/suasideias/proposta/${proposal.slug}`;

    // Trigger Brevo transactional Email 1
    await sendEmailProposta({
      email: proposal.email,
      nome: proposal.nome,
      titulo: proposal.titulo,
      cidade: proposal.cidade,
      url: proposalUrl,
      status: 'recebido',
    });

    return NextResponse.json({
      success: true,
      proposal: {
        id: proposal.id,
        slug: proposal.slug,
        status: proposal.status,
        url: proposalUrl,
      },
    });
  } catch (error) {
    console.error('Erro no endpoint POST /api/suasideias/propostas:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a proposta.' },
      { status: 500 }
    );
  }
}
