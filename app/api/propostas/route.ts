import { NextRequest, NextResponse } from 'next/server';
import { createProposal, getProposalByIdOrSlug, getProposals } from '@/lib/db-store';
import { sendEmailProposta } from '@/lib/brevo';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (slug || id) {
      const target = slug || id || '';
      const proposal = await getProposalByIdOrSlug(target);

      if (!proposal) {
        return NextResponse.json(
          { error: 'Proposta não encontrada.' },
          { status: 404 }
        );
      }

      return NextResponse.json({ proposal });
    }

    const pauta = searchParams.get('pauta') || undefined;
    const cidade = searchParams.get('cidade') || undefined;
    const proposals = await getProposals({ pauta, cidade, status: 'aprovado' });

    return NextResponse.json({ proposals });
  } catch (error) {
    console.error('Erro no GET /api/propostas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar propostas.' },
      { status: 500 }
    );
  }
}

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

    // Save proposal to database
    const proposal = await createProposal({
      nome,
      whatsapp,
      email,
      cidade,
      pauta,
      titulo,
      descricao,
      lgpd1: Boolean(lgpd1 ?? true),
      lgpd2: Boolean(lgpd2 ?? true),
      lgpd3: Boolean(lgpd3 ?? true),
    });

    // Build public proposal URL
    const host = req.headers.get('host') || 'suasideias.marinasporsp.com.br';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const proposalUrl = `${protocol}://${host}/proposta/${proposal.slug}`;

    // Trigger Brevo transactional Email
    try {
      await sendEmailProposta({
        email: proposal.email,
        nome: proposal.nome,
        titulo: proposal.titulo,
        cidade: proposal.cidade,
        url: proposalUrl,
        status: 'recebido',
      });
    } catch (emailErr) {
      console.warn("Email notification error (non-fatal):", emailErr);
    }

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
    console.error('Erro no endpoint POST /api/propostas:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a proposta.' },
      { status: 500 }
    );
  }
}
