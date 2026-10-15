import type { Metadata } from "next";
import { cookies } from "next/headers";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReadingProvider } from "@/components/ReadingPreferences";
import { AccessibilityTools } from "@/components/AccessibilityTools";
import { LanguageProvider } from "@/i18n/client";
import { asLocale, htmlLanguages } from "@/i18n/shared";
import { getClientMessages, getLocale, getTranslator } from "@/i18n/server";
import { languageCookie, parsePreferences, preferenceAttributes, preferenceCookie } from "@/lib/reading-preferences";
import { pageMetadata, siteOrigin } from "@/lib/metadata";
import "./globals.css";

const manrope = localFont({ src: "../../public/fonts/manrope-latin-variable.ttf", weight: "200 800", style: "normal", display: "swap", variable: "--font-manrope", adjustFontFallback: false });
const lora = localFont({ src: "../../public/fonts/lora-latin-variable.ttf", weight: "400 700", style: "normal", display: "swap", variable: "--font-lora", adjustFontFallback: false });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator();
  return {
    metadataBase: new URL(siteOrigin),
    ...pageMetadata({ title: t("Aprender Editora · Compromisso com a Aprendizagem"), description: t("Materiais didáticos, alfabetização, formação contínua e acompanhamento pedagógico. Proposta independente de redesign por Felipe Maia."), path: "/" }, t.locale),
    title: { default: t("Aprender Editora · Compromisso com a Aprendizagem"), template: "%s | Aprender Editora" },
  };
}
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, messages, jar, t] = await Promise.all([getLocale(), getClientMessages(), cookies(), getTranslator()]);
  const preferences = parsePreferences(jar.get(preferenceCookie)?.value);
  return <html lang={htmlLanguages[locale]} className={`${manrope.variable} ${lora.variable}`} data-scroll-behavior="smooth" {...preferenceAttributes(preferences)}>
    <body>
      <LanguageProvider locale={locale} messages={messages}>
        <ReadingProvider initialPreferences={preferences}>
          <a className="skip-link" href="#conteudo">{t("Pular para o conteúdo")}</a>
          <Header />
          <AccessibilityTools preferredLocale={jar.get(languageCookie) ? asLocale(jar.get(languageCookie)?.value) : undefined} />
          <div id="vlibras-dock-mount" />
          <main id="conteudo" tabIndex={-1}>{children}</main>
          <Footer />
        </ReadingProvider>
      </LanguageProvider>
    </body>
  </html>;
}
