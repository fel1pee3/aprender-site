"use client";
import { useT } from "@/i18n/client";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { solutions } from "@/data/solutions";
import styles from "./ContactForm.module.css";
type Field = "nome" | "instituicao" | "email" | "municipio" | "mensagem";
type FormErrors = Partial<Record<Field, string>>;
type PreparedMessage = {
    subject: string;
    body: string;
};
type ContactFormProps = {
    initialSolution?: string;
    email: string;
};
export function ContactForm({ initialSolution, email }: ContactFormProps) {
    const t = useT();
    const searchParams = useSearchParams();
    const requestedSolution = searchParams.get("solucao") ?? initialSolution ?? "";
    const selectedSolution = solutions.find((item) => item.slug === requestedSolution || item.name === requestedSolution);
    const [errors, setErrors] = useState<FormErrors>({});
    const [prepared, setPrepared] = useState<PreparedMessage | null>(null);
    const [copyStatus, setCopyStatus] = useState("");
    const resultRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    function changeSolution(value: string) {
        const url = new URL(window.location.href);
        if (value || initialSolution)
            url.searchParams.set("solucao", value);
        else
            url.searchParams.delete("solucao");
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
    function handleChange(event: FormEvent<HTMLFormElement>) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const name = target.name as Field;
        if (errors[name])
            setErrors((previous) => ({ ...previous, [name]: undefined }));
        if (prepared)
            setPrepared(null);
        if (copyStatus)
            setCopyStatus("");
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
            window.requestAnimationFrame(() => form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus());
            return;
        }
        const subject = selectedSolution
            ? t("Interesse em {0} — contato pelo site", [selectedSolution.name])
            : t("Vamos conversar — contato pelo site");
        const body = [
            t("Olá, equipe Aprender Editora!"),
            "",
            mensagem,
            "",
            ...(selectedSolution
                ? [`${t("Solução de interesse:")} ${t(selectedSolution.name)}`]
                : []),
            `${t("Nome:")} ${nome}`,
            ...(instituicao ? [`${t("Instituição:")} ${instituicao}`] : []),
            `${t("E-mail para resposta:")} ${replyEmail}`,
            ...(municipio ? [`${t("Município/UF:")} ${municipio}`] : []),
        ].join("\n");
        setPrepared({ subject, body });
        setCopyStatus("");
        window.requestAnimationFrame(() => resultRef.current?.focus());
    }
    async function copyMessage() {
        if (!prepared)
            return;
        const text = `${t("Para:")} ${email}\n${t("Assunto:")} ${prepared.subject}\n\n${prepared.body}`;
        try {
            if (!navigator.clipboard?.writeText)
                throw new Error("Clipboard unavailable");
            await navigator.clipboard.writeText(text);
            setCopyStatus("Mensagem copiada. Cole no seu aplicativo de e-mail e envie quando estiver pronta.");
        }
        catch {
            messageRef.current?.focus();
            messageRef.current?.select();
            setCopyStatus("Não foi possível copiar automaticamente. O texto foi selecionado: use a opção Copiar do seu dispositivo ou Ctrl+C / ⌘C.");
        }
    }
    return (<div className={styles.wrapper}>
      <form className={styles.form} onSubmit={prepareMessage} onChange={handleChange} noValidate>
        <div className={styles.formHeading}>
          <span className={styles.eyebrow}>{t("O primeiro passo \u00E9 uma conversa ")}</span>
          <h2>{t("Conte o que sua rede precisa.")}</h2>
          <p>{t("Prepare sua mensagem e escolha como envi\u00E1-la \u00E0 equipe da Aprender. ")}</p>
        </div>
        <p className={styles.requiredNote}>{t("Campos com ")}<span aria-hidden="true">{t("*")}</span>{t(" s\u00E3o obrigat\u00F3rios. ")}</p>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor="contact-name">{t("Seu nome ")}<span aria-hidden="true">{t("*")}</span>
            </label>
            <input id="contact-name" name="nome" autoComplete="name" maxLength={120} required aria-invalid={Boolean(errors.nome)} aria-describedby={errors.nome ? "contact-name-error" : undefined}/>
            {errors.nome && (<p id="contact-name-error" className={styles.error}>
                {t(errors.nome)}
              </p>)}
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-institution">{t("Institui\u00E7\u00E3o ")}<span className={styles.optional}>{t("(opcional)")}</span>
            </label>
            <input id="contact-institution" name="instituicao" autoComplete="organization" maxLength={180}/>
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">{t("E-mail ")}<span aria-hidden="true">{t("*")}</span>
            </label>
            <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined}/>
            {errors.email && (<p id="contact-email-error" className={styles.error}>
                {t(errors.email)}
              </p>)}
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-city">{t("Munic\u00EDpio / UF ")}<span className={styles.optional}>{t("(opcional)")}</span>
            </label>
            <input id="contact-city" name="municipio" autoComplete="address-level2" maxLength={120} placeholder={t("Ex.: Fortaleza / CE")}/>
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="contact-solution">{t("Solu\u00E7\u00E3o de interesse")}{t(" ")}
              <span className={styles.optional}>{t("(opcional)")}</span>
            </label>
            <select id="contact-solution" name="solucao" value={selectedSolution?.slug ?? ""} onChange={(event) => changeSolution(event.target.value)}>
              <option value="">{t("Quero conhecer as possibilidades")}</option>
              {solutions.map((solution) => (<option key={solution.slug} value={solution.slug}>
                  {t(solution.name)}
                </option>))}
            </select>
          </div>
          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label htmlFor="contact-message">{t("Como podemos ajudar? ")}<span aria-hidden="true">{t("*")}</span>
            </label>
            <textarea id="contact-message" name="mensagem" rows={5} maxLength={4000} required placeholder={t("Conte sobre sua rede, sua escola ou seu interesse nas soluções.")} aria-invalid={Boolean(errors.mensagem)} aria-describedby={errors.mensagem ? "contact-message-error" : undefined}/>
            {errors.mensagem && (<p id="contact-message-error" className={styles.error}>
                {t(errors.mensagem)}
              </p>)}
          </div>
        </div>
        {Object.values(errors).some(Boolean) && (<p className={styles.errorSummary} role="alert">{t("Revise os campos indicados. As informa\u00E7\u00F5es que voc\u00EA preencheu foram mantidas. ")}</p>)}
        <div className={styles.submitArea}>
          <button type="submit" className={styles.primaryButton}>{t("Preparar mensagem ")}<Icon name="arrow" size={19}/>
          </button>
          <p>{t("Seus dados ficam apenas nesta p\u00E1gina. O envio ser\u00E1 feito por voc\u00EA no seu aplicativo de e-mail. ")}</p>
        </div>
      </form>

      {prepared && (<div className={styles.result} ref={resultRef} tabIndex={-1} aria-labelledby="prepared-title">
          <span className={styles.resultIcon}>
            <Icon name="check" size={21}/>
          </span>
          <h3 id="prepared-title">{t("Sua mensagem est\u00E1 pronta.")}</h3>
          <p>{t("Confira o texto abaixo. A mensagem ainda n\u00E3o foi enviada.")}</p>
          <label htmlFor="prepared-message">{t("Mensagem para ")}{email}</label>
          <textarea ref={messageRef} id="prepared-message" readOnly rows={11} value={`${t("Para:")} ${email}\n${t("Assunto:")} ${prepared.subject}\n\n${prepared.body}`}/>
          <div className={styles.resultActions}>
            <a className={styles.primaryButton} href={t.href(`mailto:${email}?subject=${encodeURIComponent(prepared.subject)}&body=${encodeURIComponent(prepared.body)}`)}>
              <Icon name="mail" size={18}/>{t(" Abrir aplicativo de e-mail ")}</a>
            <button className={styles.copyButton} type="button" onClick={copyMessage}>
              <Icon name="copy" size={18}/>{t(" Copiar mensagem ")}</button>
          </div>
          <p className={styles.resultHint}>{t("Se o aplicativo de e-mail n\u00E3o abrir, copie o texto e envie para")}{t(" ")}
            <a href={t.href(`mailto:${email}`)}>{t(email)}</a>{t(". ")}</p>
          <p className={styles.copyStatus} role="status" aria-live="polite">
            {t(copyStatus)}
          </p>
        </div>)}
    </div>);
}
