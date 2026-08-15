import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#506324] text-[#FEF6D5] border-t-2 border-[#FEF6D5]/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <div className="relative h-12 w-56">
            <Image
              src="/assets/logos/LogoSuasIdeias.png"
              alt="Suas ideias para as Marinas"
              fill
              className="object-contain object-center md:object-left brightness-0 invert"
            />
          </div>
          <p className="text-xs text-[#FEF6D5] max-w-sm">
            Construindo um plano de ação colaborativo, transparente e transformador para o Estado de São Paulo e o Brasil.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#FEF6D5]">
          <Link href="/#como-funciona" className="hover:underline">
            Como Funciona
          </Link>
          <Link href="/#galeria-de-ideias" className="hover:underline">
            Galeria de Ideias
          </Link>
          <Link href="/enviar" className="hover:underline">
            Enviar Ideia
          </Link>
          <Link href="/admin" className="hover:underline opacity-80">
            Painel de Moderação
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-xs text-[#FEF6D5] space-y-1 opacity-80 font-sans">
          <p>© 2026 Campanhas Marina Helou & Marina Bragante.</p>
          <p>Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
}
