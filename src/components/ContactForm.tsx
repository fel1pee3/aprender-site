"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { solutions } from "@/data/solutions";
import styles from "./ContactForm.module.css";

type Field = "nome" | "instituicao" | "email" | "municipio" | "mensagem";
type FormErrors = Partial<Record<Field, string>>;
type PreparedMessage = { subject: string; body: string };
type ContactFormProps = { initialSolution?: string; email: string };

export function ContactForm({ initialSolution, email }: ContactFormProps) {
  const searchParams = useSearchParams();
  const requestedSolution =
    searchParams.get("solucao") ?? initialSolution ?? "";
  const selectedSolution = solutions.find(
    (item) =>
      item.slug === requestedSolution || item.name === requestedSolution,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [prepared, setPrepared] = useState<PreparedMessage | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function changeSolution(value: string) {
    const url = new URL(window.location.href);
    if (value || initialSolution) url.searchParams.set("solucao", value);
    else url.searchParams.delete("solucao");
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target as
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const name = target.name as Field;
    if (errors[name])
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (prepared) setPrepared(null);
    if (copyStatus) setCopyStatus("");
  }

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: Field) => String(data.get(name) ?? "").trim();
    const nome = value("nome");
    const instituicao = value("instituicao");
    const replyEmail = value("email");
    const municipio = value("municipio");
    const mensagem = value("mensagem");
    const nextErrors: FormErrors = {};
    if (!nome)
      nextErrors.nome =
        "Informe seu nome para que a equipe saiba com quem conversar.";
    if (!replyEmail)
      nextErrors.email = "Informe seu e-mail para receber uma resposta.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail))
      nextErrors.email =
        "Confira o e-mail. Use um formato como nome@instituicao.com.br.";
    if (!mensagem)
      nextErrors.mensagem = "Conte um pouco sobre o que você procura.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setPrepared(null);
      const firstInvalid = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() =>
        form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus(),
      );
      return;
    }

    const subject = selectedSolution
      ? `Interesse em ${selectedSolution.name} — contato pelo site`
      : "Vamos conversar — contato pelo site";
    const body = [
      "Olá, equipe Aprender Editora!",
      "",
      mensagem,
      "",
      ...(selectedSolution
        ? [`Solução de interesse: ${selectedSolution.name}`]
        : []),
      `Nome: ${nome}`,
      ...(instituicao ? [`Instituição: ${instituicao}`] : []),
      `E-mail para resposta: ${replyEmail}`,
      ...(municipio ? [`Município/UF: ${municipio}`] : []),
    ].join("\n");
    setPrepared({ subject, body });
    setCopyStatus("");
    window.requestAnimationFrame(() => resultRef.current?.focus());
  }

  async function copyMessage() {
    if (!prepared) return;
    const text = `Para: ${email}\nAssunto: ${prepared.subject}\n\n${prepared.body}`;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setCopyStatus(
        "Mensagem copiada. Cole no seu aplicativo de e-mail e envie quando estiver pronta.",
      );
    } catch {
      messageRef.current?.focus();
      messageRef.current?.select();
      setCopyStatus(
        "Não foi possível copiar automaticamente. O texto foi selecionado: use a opção Copiar do seu dispositivo ou Ctrl+C / ⌘C.",
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={prepareMessage}
        onChange={handleChange}
        noValidate
      >
        <div className={styles.formHeading}>
          <span className={styles.eyebrow}>
            O primeiro passo é uma conversa
          </span>
          <h2>Conte o que sua rede precisa.</h2>
          <p>
            Prepare sua mensagem e escolha como enviá-la à equipe da Aprender.
          </p>
        </div>
        <p className={styles.requiredNote}>
          Campos com <span aria-hidden="true">*</span> são obrigatórios.
        </p>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="contact-name">
              Seu nome <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              name="nome"
              autoComplete="name"
              maxLength={120}
              required
              aria-invalid={Boolean(errors.nome)}
              aria-describedby={errors.nome ? "contact-name-error" : undefined}
            />
            {errors.nome && (
              <p id="contact-name-error" className={styles.error}>
                {errors.nome}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-institution">
              Instituição <span className={styles.optional}>(opcional)</span>
            </label>
            <input
              id="contact-institution"
              name="instituicao"
              autoComplete="organization"
              maxLength={180}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">
              E-mail <span aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
            />
            {errors.email && (
              <p id="contact-email-error" className={styles.error}>
                {errors.email}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-city">
              Município / UF <span className={styles.optional}>(opcional)</span>
            </label>
            <input
              id="contact-city"
              name="municipio"
              autoComplete="address-level2"
              maxLength={120}
              placeholder="Ex.: Fortaleza / CE"
            />
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="contact-solution">
              Solução de interesse{" "}
              <span className={styles.optional}>(opcional)</span>
            </label>
            <select
              id="contact-solution"
              name="solucao"
              value={selectedSolution?.slug ?? ""}
              onChange={(event) => changeSolution(event.target.value)}
            >
              <option value="">Quero conhecer as possibilidades</option>
              {solutions.map((solution) => (
                <option key={solution.slug} value={solution.slug}>
                  {solution.name}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="contact-message">
              Como podemos ajudar? <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="mensagem"
              rows={5}
              maxLength={4000}
              required
              placeholder="Conte sobre sua rede, sua escola ou seu interesse nas soluções."
              aria-invalid={Boolean(errors.mensagem)}
              aria-describedby={
                errors.mensagem ? "contact-message-error" : undefined
              }
            />
            {errors.mensagem && (
              <p id="contact-message-error" className={styles.error}>
                {errors.mensagem}
              </p>
            )}
          </div>
        </div>
        {Object.values(errors).some(Boolean) && (
          <p className={styles.errorSummary} role="alert">
            Revise os campos indicados. As informações que você preencheu foram
            mantidas.
          </p>
        )}
        <div className={styles.submitArea}>
          <button type="submit" className={styles.primaryButton}>
            Preparar mensagem <Icon name="arrow" size={19} />
          </button>
          <p>
            Seus dados ficam apenas nesta página. O envio será feito por você no
            seu aplicativo de e-mail.
          </p>
        </div>
      </form>

      {prepared && (
        <div
          className={styles.result}
          ref={resultRef}
          tabIndex={-1}
          aria-labelledby="prepared-title"
        >
          <span className={styles.resultIcon}>
            <Icon name="check" size={21} />
          </span>
          <h3 id="prepared-title">Sua mensagem está pronta.</h3>
          <p>Confira o texto abaixo. A mensagem ainda não foi enviada.</p>
          <label htmlFor="prepared-message">Mensagem para {email}</label>
          <textarea
            ref={messageRef}
            id="prepared-message"
            readOnly
            rows={11}
            value={`Para: ${email}\nAssunto: ${prepared.subject}\n\n${prepared.body}`}
          />
          <div className={styles.resultActions}>
            <a
              className={styles.primaryButton}
              href={`mailto:${email}?subject=${encodeURIComponent(prepared.subject)}&body=${encodeURIComponent(prepared.body)}`}
            >
              <Icon name="mail" size={18} /> Abrir aplicativo de e-mail
            </a>
            <button
              className={styles.copyButton}
              type="button"
              onClick={copyMessage}
            >
              <Icon name="copy" size={18} /> Copiar mensagem
            </button>
          </div>
          <p className={styles.resultHint}>
            Se o aplicativo de e-mail não abrir, copie o texto e envie para{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
          <p className={styles.copyStatus} role="status" aria-live="polite">
            {copyStatus}
          </p>
        </div>
      )}
    </div>
  );
}
