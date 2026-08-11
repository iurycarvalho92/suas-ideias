import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Suas ideias para as Marinas — Marinas por SP",
  description: "Compartilhe sua proposta para São Paulo e para o Brasil, conheça ideias de outras pessoas e ajude a construir uma vida mais justa e sustentável para todos.",
  openGraph: {
    title: "Suas ideias para as Marinas — Marinas por SP",
    description: "Nós queremos ouvir quem vive a realidade de São Paulo todos os dias. Envie sua proposta e mobilize apoios.",
    url: "https://marinasporsp.com.br/suasideias",
    siteName: "Marinas por SP",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
