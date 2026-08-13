import React from 'react';
import ProposalForm from '@/components/ProposalForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envie sua Proposta | Suas Ideias para as Marinas',
  description: 'Compartilhe sua ideia para construir o plano de ação das campanhas de Marina Helou e Marina Bragante.',
};

export default function EnviarIdeiaPage() {
  return (
    <main className="min-h-screen bg-[#FEF6D5] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ProposalForm />
      </div>
    </main>
  );
}
