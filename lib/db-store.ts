import { Proposal, Support, ProposalStatus } from './types';
import { adminDb, admin } from './firebase-admin';

// Sample seed proposals for initial demonstration if database is clean/empty
const SEED_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    slug: 'escolas-em-tempo-integral-e-ar-condicionado-sp',
    nome: 'Carolina Mendes',
    whatsapp: '11998765432',
    email: 'carolina.mendes@exemplo.com',
    cidade: 'São Paulo',
    pauta: 'Educação',
    titulo: 'Escolas municipais em tempo integral com climatização solar',
    descricao: 'Proposta para implementar ar-condicionado movido a energia solar fotovoltaica nas escolas de tempo integral da rede estadual e municipal de São Paulo, garantindo conforto térmico e aprendizado de qualidade nas ondas de calor.',
    status: 'aprovado',
    apoiosCount: 142,
    lgpd1: true,
    lgpd2: true,
    lgpd3: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'prop-2',
    slug: 'delegacias-da-mulher-24h-campinas',
    nome: 'Beatriz Rocha',
    whatsapp: '19987651234',
    email: 'beatriz.rocha@exemplo.com',
    cidade: 'Campinas',
    pauta: 'Segurança',
    titulo: 'Delegacias da Mulher 24h com equipe 100% feminina em Campinas',
    descricao: 'Ampliação do atendimento da Delegacia da Mulher para funcionamento ininterrupto 24 horas por dia, com atendimento especializado e equipes treinadas compostas por policiais femininas.',
    status: 'aprovado',
    apoiosCount: 98,
    lgpd1: true,
    lgpd2: true,
    lgpd3: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'prop-3',
    slug: 'parques-esponja-e-corredores-verdes-santos',
    nome: 'Gabriel Fonseca',
    whatsapp: '13991234567',
    email: 'gabriel.fonseca@exemplo.com',
    cidade: 'Santos',
    pauta: 'Meio Ambiente & Clima',
    titulo: 'Criação de Parques Esponja e reflorestamento urbano contra alagamentos',
    descricao: 'Implementação de bacias de retenção naturais e jardins de chuva ao longo das avenidas principais de Santos para absorver a água das chuvas extremas e reduzir ressacas na orla marítima.',
    status: 'aprovado',
    apoiosCount: 115,
    lgpd1: true,
    lgpd2: true,
    lgpd3: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'prop-4',
    slug: 'corredores-de-onibus-e-tarifa-zero-estudantil-sjc',
    nome: 'Lucas Silveira',
    whatsapp: '12997654321',
    email: 'lucas.silveira@exemplo.com',
    cidade: 'São José dos Campos',
    pauta: 'Mobilidade Urbana',
    titulo: 'Passe livre estudantil e faixa exclusiva para transporte público',
    descricao: 'Reorganização das rotas intermunicipais com faixas exclusivas para ônibus elétricos e implantação de tarifa zero para estudantes do ensino fundamental, médio e universitários da região.',
    status: 'aprovado',
    apoiosCount: 76,
    lgpd1: true,
    lgpd2: true,
    lgpd3: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'prop-5',
    slug: 'telemedicina-e-mutirao-de-exames-ribeirao-preto',
    nome: 'Mariana Alves',
    whatsapp: '16996543210',
    email: 'mariana.alves@exemplo.com',
    cidade: 'Ribeirão Preto',
    pauta: 'Saúde',
    titulo: 'Mutirão de especialidades médicas e prontuário único via app no SUS',
    descricao: 'Integração tecnológica para zerar filas de espera em consultas de especialidades e exames complexos, permitindo agendamento rápido e acesso ao prontuário pelo celular.',
    status: 'aprovado',
    apoiosCount: 89,
    lgpd1: true,
    lgpd2: true,
    lgpd3: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'prop-6',
    slug: 'incubadoras-de-emprego-jovem-e-tecnologia-osasco',
    nome: 'Thiago Martins',
    whatsapp: '11987654321',
    email: 'thiago.martins@exemplo.com',
    cidade: 'Osasco',
    pauta: 'Economia & Emprego',
    titulo: 'Hub de Inovação e Qualificação Tecnológica para Jovens Periféricos',
    descricao: 'Criação de centros públicos de treinamento em programação, inteligência artificial e economia verde, com bolsa de incentivo para jovens em situação de vulnerabilidade social.',
    status: 'aprovado',
    apoiosCount: 64,
    lgpd1: true,
    lgpd2: true,
    lgpd3: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const SEED_SUPPORTS: Support[] = [
  {
    id: 'sup-1',
    proposalId: 'prop-1',
    nome: 'Marcelo Rossi',
    whatsapp: '11981234567',
    email: 'marcelo.rossi@exemplo.com',
    cidade: 'São Paulo',
    consentimentoContato: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'sup-2',
    proposalId: 'prop-1',
    nome: 'Fernanda Lima',
    whatsapp: '11976543210',
    email: 'fernanda.lima@exemplo.com',
    cidade: 'São Paulo',
    consentimentoContato: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'sup-3',
    proposalId: 'prop-2',
    nome: 'Juliana Costa',
    whatsapp: '19991238888',
    email: 'juliana.costa@exemplo.com',
    cidade: 'Campinas',
    consentimentoContato: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

// Memory store fallback if Firestore admin is offline/unconfigured
const memoryProposalsStore = new Map<string, Proposal>(SEED_PROPOSALS.map(p => [p.id, p]));
const memorySupportsStore = new Map<string, Support>(SEED_SUPPORTS.map(s => [s.id, s]));

export function generateSlug(titulo: string): string {
  const baseSlug = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 50);
  
  const shortId = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${shortId}`;
}

export async function createProposal(data: Omit<Proposal, 'id' | 'slug' | 'status' | 'apoiosCount' | 'createdAt' | 'updatedAt'>): Promise<Proposal> {
  const id = `prop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const slug = generateSlug(data.titulo);
  const now = new Date().toISOString();

  const newProposal: Proposal = {
    ...data,
    id,
    slug,
    status: 'pendente',
    apoiosCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  if (adminDb) {
    try {
      await adminDb.collection('propostas').doc(id).set(newProposal);
      return newProposal;
    } catch (err) {
      console.warn("Firestore save failed, using fallback:", err);
    }
  }

  memoryProposalsStore.set(id, newProposal);
  return newProposal;
}

export async function getProposalByIdOrSlug(idOrSlug: string): Promise<Proposal | null> {
  if (adminDb) {
    try {
      // Check by ID
      const docById = await adminDb.collection('propostas').doc(idOrSlug).get();
      if (docById.exists) {
        return docById.data() as Proposal;
      }
      // Check by Slug
      const snapshotBySlug = await adminDb.collection('propostas').where('slug', '==', idOrSlug).limit(1).get();
      if (!snapshotBySlug.empty) {
        return snapshotBySlug.docs[0].data() as Proposal;
      }
    } catch (err) {
      console.warn("Firestore fetch error, using fallback:", err);
    }
  }

  // Memory fallback lookup
  for (const prop of Array.from(memoryProposalsStore.values())) {
    if (prop.id === idOrSlug || prop.slug === idOrSlug) {
      return prop;
    }
  }

  return null;
}

export async function getProposals(filters?: { pauta?: string; cidade?: string; status?: ProposalStatus }): Promise<Proposal[]> {
  const targetStatus = filters?.status || 'aprovado';

  if (adminDb) {
    try {
      let query: admin.firestore.Query = adminDb.collection('propostas').where('status', '==', targetStatus);

      if (filters?.pauta && filters.pauta !== 'Todas as pautas' && filters.pauta !== 'Todas') {
        query = query.where('pauta', '==', filters.pauta);
      }
      if (filters?.cidade && filters.cidade !== 'Todas as cidades' && filters.cidade !== 'Todas') {
        query = query.where('cidade', '==', filters.cidade);
      }

      const snapshot = await query.get();
      const results: Proposal[] = [];
      snapshot.forEach(doc => {
        results.push(doc.data() as Proposal);
      });
      return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn("Firestore getProposals error, using fallback memory store:", err);
    }
  }

  // Memory fallback query
  let list = Array.from(memoryProposalsStore.values());

  if (targetStatus) {
    list = list.filter(p => p.status === targetStatus);
  }
  if (filters?.pauta && filters.pauta !== 'Todas as pautas' && filters.pauta !== 'Todas') {
    list = list.filter(p => p.pauta === filters.pauta);
  }
  if (filters?.cidade && filters.cidade !== 'Todas as cidades' && filters.cidade !== 'Todas') {
    list = list.filter(p => p.cidade.toLowerCase() === filters.cidade?.toLowerCase());
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addSupport(proposalId: string, supportData: Omit<Support, 'id' | 'proposalId' | 'createdAt'>): Promise<{ success: boolean; newCount: number }> {
  const supportId = `sup-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const support: Support = {
    ...supportData,
    id: supportId,
    proposalId,
    createdAt: now,
  };

  if (adminDb) {
    try {
      const proposalRef = adminDb.collection('propostas').doc(proposalId);
      const supportRef = adminDb.collection('apoios').doc(supportId);

      await adminDb.runTransaction(async (transaction) => {
        transaction.set(supportRef, support);
        transaction.update(proposalRef, {
          apoiosCount: admin.firestore.FieldValue.increment(1),
          updatedAt: now,
        });
      });

      const updatedSnap = await proposalRef.get();
      const updatedData = updatedSnap.data() as Proposal;
      return { success: true, newCount: updatedData.apoiosCount };
    } catch (err) {
      console.warn("Firestore addSupport transaction failed, using fallback:", err);
    }
  }

  // Memory fallback support increment
  const prop = await getProposalByIdOrSlug(proposalId);
  if (prop) {
    prop.apoiosCount = (prop.apoiosCount || 0) + 1;
    prop.updatedAt = now;
    memoryProposalsStore.set(prop.id, prop);
    memorySupportsStore.set(supportId, support);
    return { success: true, newCount: prop.apoiosCount };
  }

  return { success: false, newCount: 0 };
}

export async function updateProposalStatus(proposalId: string, status: ProposalStatus, motivoRejeicao?: string): Promise<Proposal | null> {
  const now = new Date().toISOString();

  if (adminDb) {
    try {
      const docRef = adminDb.collection('propostas').doc(proposalId);
      const updateData: Partial<Proposal> = {
        status,
        updatedAt: now,
      };
      if (motivoRejeicao) {
        updateData.motivoRejeicao = motivoRejeicao;
      }
      await docRef.update(updateData);
      const updatedSnap = await docRef.get();
      return updatedSnap.data() as Proposal;
    } catch (err) {
      console.warn("Firestore status update failed, using memory fallback:", err);
    }
  }

  const prop = await getProposalByIdOrSlug(proposalId);
  if (prop) {
    prop.status = status;
    if (motivoRejeicao) prop.motivoRejeicao = motivoRejeicao;
    prop.updatedAt = now;
    memoryProposalsStore.set(prop.id, prop);
    return prop;
  }

  return null;
}

export async function updateProposalDetails(
  proposalId: string,
  data: Partial<Pick<Proposal, 'titulo' | 'descricao' | 'pauta' | 'cidade' | 'nome' | 'email' | 'whatsapp'>>
): Promise<Proposal | null> {
  const now = new Date().toISOString();

  if (adminDb) {
    try {
      const docRef = adminDb.collection('propostas').doc(proposalId);
      const updateData = {
        ...data,
        updatedAt: now,
      };
      await docRef.update(updateData);
      const updatedSnap = await docRef.get();
      return updatedSnap.data() as Proposal;
    } catch (err) {
      console.warn("Firestore proposal detail update failed, using memory fallback:", err);
    }
  }

  const prop = await getProposalByIdOrSlug(proposalId);
  if (prop) {
    Object.assign(prop, data, { updatedAt: now });
    memoryProposalsStore.set(prop.id, prop);
    return prop;
  }

  return null;
}

export async function deleteProposal(proposalId: string): Promise<boolean> {
  if (adminDb) {
    try {
      await adminDb.collection('propostas').doc(proposalId).delete();
      return true;
    } catch (err) {
      console.warn("Firestore proposal delete failed, using memory fallback:", err);
    }
  }

  return memoryProposalsStore.delete(proposalId);
}

export async function getAllProposalsForAdmin(): Promise<Proposal[]> {
  if (adminDb) {
    try {
      const snapshot = await adminDb.collection('propostas').get();
      const results: Proposal[] = [];
      snapshot.forEach(doc => results.push(doc.data() as Proposal));
      return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn("Firestore getAllProposals error, using fallback memory store:", err);
    }
  }

  return Array.from(memoryProposalsStore.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getAllSupportsForAdmin(): Promise<Support[]> {
  if (adminDb) {
    try {
      const snapshot = await adminDb.collection('apoios').get();
      const results: Support[] = [];
      snapshot.forEach(doc => results.push(doc.data() as Support));
      return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.warn("Firestore getAllSupports error, using fallback memory store:", err);
    }
  }

  return Array.from(memorySupportsStore.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
