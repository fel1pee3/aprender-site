import { getTranslator } from "@/i18n/server";
import Link from "@/i18n/Link";
import { contact } from "@/data/editorial";
import { socialLinks } from "@/data/archive";
import { Icon } from "./Icon";
import s from "./Footer.module.css";
export async function Footer() {
    const t = await getTranslator();
    return (<footer className={s.footer}>
      <div className="container">
        <div className={s.main}>
          <div className={s.brand}>
            <Link href={t.href("/")} aria-label={t("Aprender Editora, início")}>
              <img src="/images/logo.png" alt={t("Aprender Editora")} width="185" height="65"/>
            </Link>
            <p>{t("Compromisso com a Aprendizagem.")}</p>
            <span>{t("Materiais did\u00E1ticos e alfabetiza\u00E7\u00E3o. ")}<br />{t("Forma\u00E7\u00E3o e acompanhamento pedag\u00F3gico. ")}</span>
          </div>
          <div>
            <h2>{t("Explore")}</h2>
            <Link href={t.href("/a-editora")}>{t("A editora")}</Link>
            <Link href={t.href("/solucoes")}>{t("Solu\u00E7\u00F5es educacionais")}</Link>
            <Link href={t.href("/formacao")}>{t("Forma\u00E7\u00E3o de educadores")}</Link>
            <Link href={t.href("/em-acao")}>{t("Aprender em a\u00E7\u00E3o")}</Link>
            <Link href={t.href("/acervo")}>{t("Acervo e depoimentos")}</Link>
            <Link href={t.href("/recursos")}>{t("Amostras e documentos")}</Link>
            <Link href={t.href("/recursos/tabela-precos")}>{t("Tabela publicada \u00B7 2027")}</Link>
            <Link href={t.href("/acessibilidade")}>{t("Acessibilidade")}</Link>
          </div>
          <div>
            <h2>{t("Conecte-se")}</h2>
            <Link href={t.href("/plataformas")}>{t("Plataformas digitais")}</Link>
            {socialLinks.map((social) => (<a key={social.id} href={t.href(social.url)} target="_blank" rel="noopener noreferrer">
                {t(social.name)} <Icon name="external" size={13}/>
                <span className="sr-only">{t("Abre em nova aba")}</span>
              </a>))}
            <Link href={t.href("/contato")}>{t("Fale com a Aprender")}</Link>
            <a href={t.href(contact.phoneHref)}>{t(contact.phone)}</a>
          </div>
          <div className={s.address}>
            <h2>{t("De Fortaleza, para o Brasil.")}</h2>
            <p>{t(contact.address)}</p>
            <a href={t.href("/contato")}>{t("Vamos conversar ")}<Icon name="arrow" size={16}/>
            </a>
          </div>
        </div>
        <div className={s.bottom}>
          <p>{t("\u00A9 ")}{t(new Date().getFullYear())}{t(" \u00B7 Aprender Editora")}</p>
          <p>{t("Projeto de apresenta\u00E7\u00E3o \u00B7 ")}<strong>{t("Felipe Maia")}</strong>
          </p>
        </div>
      </div>
    </footer>);
}
