interface SendEmailParams {
  email: string;
  nome: string;
  titulo: string;
  cidade: string;
  url: string;
  status: 'recebido' | 'aprovado' | 'rejeitado';
  motivoRejeicao?: string;
}

export async function sendEmailProposta({
  email,
  nome,
  titulo,
  cidade,
  url,
  status,
  motivoRejeicao = '',
}: SendEmailParams) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey || apiKey === 'YOUR_BREVO_API_KEY') {
    console.log(`\n================ [BREVO EMAIL DEV MOCK] ================`);
    console.log(`To: ${nome} <${email}>`);
    console.log(`Status: ${status}`);
    console.log(`Proposal: "${titulo}" (${cidade})`);
    console.log(`URL: ${url}`);
    if (motivoRejeicao) console.log(`Motivo Rejeição: ${motivoRejeicao}`);
    console.log(`=======================================================\n`);
    return { success: true, mocked: true };
  }

  let subject = '';
  let htmlContent = '';

  if (status === 'recebido') {
    subject = "Recebemos sua ideia para as Marinas! 💡";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1a202c; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #506324;">Olá, ${nome}!</h2>
        <p>Obrigado por compartilhar sua proposta para <strong>${cidade}</strong> na plataforma <strong>"Suas ideias para as Marinas"</strong>.</p>
        <div style="background-color: #f7fafc; padding: 15px; border-left: 4px solid #506324; border-radius: 4px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold;">Título da sua proposta:</p>
          <p style="margin: 5px 0 0 0; font-size: 16px;">"${titulo}"</p>
        </div>
        <p>Nossa equipe já recebeu o seu envio. Para garantir um ambiente construtivo e alinhado com as diretrizes do projeto, realizamos uma análise rápida de cada contribuição antes de torná-la pública.</p>
        <p>Você pode acompanhar o status da sua ideia por este link:</p>
        <p style="text-align: center; margin: 25px 0;">
          <a href="${url}" style="background-color: #F28919; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Acompanhar Minha Ideia →</a>
        </p>
        <p>Assim que a proposta for aprovada, enviaremos um novo e-mail avisando para que você possa começar a pedir apoios e mobilizar sua região!</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #718096; font-size: 14px;">Um abraço,<br/><strong>Equipe de Mobilização — Marinas Por SP</strong></p>
      </div>
    `;
  } else if (status === 'aprovado') {
    const whatsappMsg = encodeURIComponent(`Acabei de ver uma excelente proposta para ${cidade} na plataforma 'Suas ideias para as Marinas': '${titulo}'. Leia e dê seu apoio aqui: ${url}. Vamos construir juntos um São Paulo melhor!`);
    const whatsappUrl = `https://wa.me/?text=${whatsappMsg}`;

    subject = "Sua ideia está no ar! Hora de mobilizar apoios 🎉";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1a202c; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #506324;">Olá, ${nome}!</h2>
        <p>Ótimas notícias! Sua proposta <strong>"${titulo}"</strong> foi aprovada e já está publicada na plataforma <strong>"Suas ideias para as Marinas"</strong>.</p>
        <p>Agora é a hora de fazer a sua voz ecoar por <strong>${cidade}</strong>!</p>
        <p style="text-align: center; margin: 25px 0;">
          <a href="${url}" style="background-color: #506324; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Ver Minha Proposta Publicada</a>
        </p>
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin: 0 0 8px 0; color: #166534;">💡 Dica de mobilização:</h4>
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #15803d;">Envie este link nos seus grupos de WhatsApp, para familiares, amigos e vizinhos. Quanto mais apoios sua proposta receber, maior será a visibilidade da sua causa para o nosso plano de ação!</p>
          <p style="margin: 0; text-align: center;">
            <a href="${whatsappUrl}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-weight: bold; display: inline-block;">Compartilhar no WhatsApp</a>
          </p>
        </div>
        <p>Agradecemos sua participação ativa!</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #718096; font-size: 14px;">Um abraço,<br/><strong>Equipe das Marinas</strong></p>
      </div>
    `;
  } else if (status === 'rejeitado') {
    subject = "Atualização sobre a sua proposta no Suas Ideias";
    htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1a202c; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #2d3748;">Olá, ${nome}!</h2>
        <p>Agradecemos muito por ter dedicado seu tempo para enviar a proposta <strong>"${titulo}"</strong> na plataforma "Suas ideias para as Marinas".</p>
        <p>Nossa equipe revisou o conteúdo enviado e, neste momento, não conseguimos publicar a proposta na galeria pública pelo seguinte motivo:</p>
        <div style="background-color: #fff5f5; border-left: 4px solid #e53e3e; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; color: #c53030; font-weight: bold;">Motivo da moderação:</p>
          <p style="margin: 5px 0 0 0; color: #9b2c2c;">${motivoRejeicao || 'Conteúdo necessita de ajustes de adequação.'}</p>
        </div>
        <p>Queremos muito contar com a sua participação! Convidamos você a revisar a ideia e fazer um novo envio ajustado no site:</p>
        <p style="text-align: center; margin: 25px 0;">
          <a href="https://suasideias.marinasporsp.com.br" style="background-color: #506324; color: white; padding: 12px 24px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Enviar Nova Proposta</a>
        </p>
        <p style="font-size: 14px; color: #718096;">Se tiver qualquer dúvida, basta responder a este e-mail para conversar diretamente com a nossa equipe de mobilização.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #718096; font-size: 14px;">Um abraço,<br/><strong>Equipe de Mobilização — Marinas Por SP</strong></p>
      </div>
    `;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey.trim(),
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: "Suas Ideias - Marinas Por SP",
          email: "contato@marinasporsp.com.br",
        },
        to: [{ email: email, name: nome }],
        subject,
        htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[BREVO API ERROR]", response.status, data);
      return { success: false, status: response.status, error: data };
    }

    console.log("[BREVO EMAIL SUCCESS]", data);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error("[BREVO FETCH ERROR]", error);
    return { success: false, error: String(error) };
  }
}
