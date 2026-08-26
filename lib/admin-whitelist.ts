/**
 * Whitelist de e-mails autorizados para acessar o Painel Administrativo de Moderação
 * Você pode adicionar novos e-mails diretamente nesta lista ou na variável de ambiente ADMIN_WHITELIST (separada por vírgula).
 */

const DEFAULT_WHITELIST = [
  'thiago.dsg@alumni.usp.br',
  'iury.decarvalho@gmail.com',
  'iury.carvalho92@gmail.com',
  'marinahelou@gmail.com',
  'marinabragante@gmail.com',
  'contato@marinasporsp.com.br',
];

export function getAdminWhitelist(): string[] {
  const envWhitelist = process.env.NEXT_PUBLIC_ADMIN_WHITELIST || process.env.ADMIN_WHITELIST;
  if (envWhitelist) {
    const parsed = envWhitelist.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean);
    return Array.from(new Set([...DEFAULT_WHITELIST, ...parsed]));
  }
  return DEFAULT_WHITELIST;
}

export function isEmailAuthorized(email?: string | null): boolean {
  if (!email) return false;
  const whitelist = getAdminWhitelist();
  return whitelist.includes(email.trim().toLowerCase());
}
