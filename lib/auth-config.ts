export const AUTHORIZED_ADMIN_EMAILS: string[] = [
  'iury.decarvalho@gmail.com',
  // Adicione outros e-mails autorizados aqui conforme necessário
];

export function isAuthorizedAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  
  // Also check environment variable for additional comma-separated emails if set
  const envEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS
    ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(',').map(e => e.toLowerCase().trim())
    : [];

  return AUTHORIZED_ADMIN_EMAILS.includes(normalized) || envEmails.includes(normalized);
}
