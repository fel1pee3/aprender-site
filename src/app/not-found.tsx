import { Button, TextLink } from "@/components/ui";
import s from "./inner.module.css";
export default function NotFound() {
  return (
    <section className={s.notFound}>
      <div className="container">
        <span aria-hidden="true">404</span>
        <h1>Vamos encontrar outro caminho?</h1>
        <p>
          A página que você procura não foi encontrada. Há muitas descobertas
          esperando por você no nosso catálogo.
        </p>
        <div className={s.actions}>
          <Button href="/solucoes">Explorar as soluções</Button>
          <TextLink href="/">Voltar ao início</TextLink>
        </div>
      </div>
    </section>
  );
}
