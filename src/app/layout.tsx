import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Aprender Editora — Compromisso com a Aprendizagem",
    template: "%s | Aprender Editora",
  },
  description:
    "Materiais didáticos, formação de educadores e acompanhamento pedagógico. Conheça a proposta independente de redesign da Aprender Editora por Felipe Maia.",
  robots: { index: false, follow: false },
  openGraph: {
    locale: "pt_BR",
    type: "website",
    siteName: "Aprender Editora · Proposta de redesign",
    title: "Aprender Editora — Compromisso com a Aprendizagem",
    description:
      "Educação que acolhe, conhecimento que transforma. Proposta independente de redesign.",
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 800,
        alt: "Registro educacional do catálogo Aprender Editora",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
