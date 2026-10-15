import Link from "next/link";
import { contact } from "@/data/editorial";
import { socialLinks } from "@/data/archive";
import { Icon } from "./Icon";
import s from "./Footer.module.css";
export function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.main}>
          <div className={s.brand}>
            <Link href="/" aria-label="Aprender Editora, início">
              <img
                src="/images/logo.png"
                alt="Aprender Editora"
                width="185"
                height="65"
              />
            </Link>
            <p>Compromisso com a Aprendizagem.</p>
            <span>
              Conhecimento que aproxima.
              <br />
              Educação que transforma.
            </span>
          </div>
          <div>
            <h2>Explore</h2>
            <Link href="/a-editora">A editora</Link>
            <Link href="/solucoes">Soluções educacionais</Link>
            <Link href="/formacao">Formação de educadores</Link>
            <Link href="/em-acao">Aprender em ação</Link>
            <Link href="/acervo">Acervo e depoimentos</Link>
            <Link href="/recursos">Amostras e documentos</Link>
            <Link href="/recursos/tabela-precos">Tabela publicada · 2027</Link>
          </div>
          <div>
            <h2>Conecte-se</h2>
            <Link href="/plataformas">Plataformas digitais</Link>
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name} <Icon name="external" size={13} />
                <span className="sr-only"> (nova aba)</span>
              </a>
            ))}
            <Link href="/contato">Fale com a Aprender</Link>
            <a href={contact.phoneHref}>{contact.phone}</a>
          </div>
          <div className={s.address}>
            <h2>De Fortaleza, para o Brasil.</h2>
            <p>{contact.address}</p>
            <a href="/contato">
              Vamos conversar <Icon name="arrow" size={16} />
            </a>
          </div>
        </div>
        <div className={s.bottom}>
          <p>© {new Date().getFullYear()} · Aprender Editora</p>
          <p>
            Proposta independente de redesign por <strong>Felipe Maia</strong>
          </p>
          <span>Demonstração para apresentação</span>
        </div>
      </div>
    </footer>
  );
}
