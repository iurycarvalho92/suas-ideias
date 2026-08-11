export type Pauta = 
  | 'Educação'
  | 'Saúde'
  | 'Meio Ambiente & Clima'
  | 'Mobilidade Urbana'
  | 'Segurança'
  | 'Economia & Emprego'
  | 'Cidadania & Direitos';

export const PAUTAS: Pauta[] = [
  'Educação',
  'Saúde',
  'Meio Ambiente & Clima',
  'Mobilidade Urbana',
  'Segurança',
  'Economia & Emprego',
  'Cidadania & Direitos',
];

export type ProposalStatus = 'pendente' | 'aprovado' | 'rejeitado';

export interface Proposal {
  id: string;
  slug: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  pauta: Pauta;
  titulo: string;
  descricao: string;
  status: ProposalStatus;
  apoiosCount: number;
  motivoRejeicao?: string;
  lgpd1: boolean;
  lgpd2: boolean;
  lgpd3: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Support {
  id: string;
  proposalId: string;
  nome: string;
  whatsapp: string;
  email: string;
  cidade: string;
  consentimentoContato: boolean;
  createdAt: string;
}
