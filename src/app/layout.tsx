import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { pageMetadata, siteOrigin } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  ...pageMetadata({
    title: "Aprender Editora · Compromisso com a Aprendizagem",
    description:
      "Materiais didáticos, alfabetização, formação contínua e acompanhamento pedagógico. Proposta independente de redesign por Felipe Maia.",
    path: "/",
  }),
  title: {
    default: "Aprender Editora · Compromisso com a Aprendizagem",
    template: "%s | Aprender Editora",
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
