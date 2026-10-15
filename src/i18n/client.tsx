"use client";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createTranslator, type Locale, type Messages } from "./shared";

const LanguageContext = createContext({ locale: "pt" as Locale, messages: {} as Messages });
export function LanguageProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: ReactNode }) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useT() {
  const { locale, messages } = useContext(LanguageContext);
  return useMemo(() => createTranslator(locale, messages), [locale, messages]);
}
