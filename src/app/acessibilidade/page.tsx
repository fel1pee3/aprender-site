import { getTranslator } from "@/i18n/server";
import { PageIntro, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata() {
  const t = await getTranslator();
  return pageMetadata({ title: t("Acessibilidade"), description: t("Recursos de leitura, navegação por teclado, idiomas e tradução automática para Libras disponíveis neste site."), path: "/acessibilidade" }, t.locale);
}
export default async function AccessibilityPage() {
  const t = await getTranslator();
  return <>
    <PageIntro eyebrow={t("Leitura e participação")} title={t("Acessibilidade")} description={t("Recursos de leitura, navegação por teclado, idiomas e tradução automática para Libras disponíveis neste site.")} />
    <div className={`container ${styles.content}`}>
      <section aria-labelledby="reading-title"><h2 id="reading-title">{t("Recursos disponíveis")}</h2>
        <p>{t("Use o botão Acessibilidade e idioma, no canto inferior da tela, para abrir os recursos. Em Preferências de leitura, escolha aparência do sistema, clara ou escura; contraste padrão ou reforçado; texto de 100% a 200%; espaçamento padrão ou confortável; e movimento do sistema ou reduzido.")}</p>
        <p>{t("Os ajustes são aplicados ao conteúdo HTML. Você também pode usar o zoom e os recursos de acessibilidade do seu navegador ou dispositivo.")}</p>
        <p>{t("Suas preferências de leitura são guardadas em um cookie deste site por até um ano. Se o armazenamento estiver bloqueado, os controles continuam funcionando durante a visita. Restaurar preferências altera apenas esses ajustes, preservando idioma, filtros e dados do formulário.")}</p>
      </section>
      <section aria-labelledby="keyboard-title"><h2 id="keyboard-title">{t("Navegação por teclado")}</h2>
        <p>{t("Use Tab e Shift + Tab para percorrer links e controles. O primeiro link permite pular para o conteúdo. Menus, preferências e ampliações de imagens abrem em diálogos; Escape fecha o diálogo e o foco retorna ao controle de abertura. Nos grupos de opções, use as setas do teclado.")}</p>
        <p>{t("Links externos que abrem outra aba têm essa informação disponível para tecnologias assistivas. PDFs são abertos somente quando você os solicita.")}</p>
      </section>
      <section aria-labelledby="language-title"><h2 id="language-title">{t("Idiomas e arquivos originais")}</h2>
        <p>{t("Português, English e Español estão disponíveis no seletor de idioma. A troca mantém a página equivalente e os filtros na URL. Sua escolha explícita fica salva; ao acessar uma URL de outro idioma, ela é respeitada e o seletor oferece retornar à preferência salva.")}</p>
        <p>{t("As traduções do site foram preparadas com apoio de IA e ainda não passaram por revisão humana especializada. Títulos de coleções e livros permanecem como publicados. Os PDFs, fotografias com texto e materiais comerciais originais estão em português; a interface traduzida não representa uma edição estrangeira desses materiais.")}</p>
      </section>
      <section aria-labelledby="libras-title"><h2 id="libras-title">{t("Libras")}</h2>
        <p>{t("Na versão em português, abra Acessibilidade e idioma e selecione Libras para carregar o serviço oficial VLibras. O painel de recursos se fecha e o avatar aparece sobre o conteúdo, sem reduzir a largura da página. A tradução automática depende de conexão e dos servidores do serviço.")}</p>
        <p>{t("O avatar permanece sobre a página enquanto você navega. Feche a ferramenta pelo botão Fechar para liberar o conteúdo coberto, sem precisar atualizar a página. Para ativar um link ou botão selecionado, use Interagir na ferramenta.")}</p>
        <p>{t("A tradução automática não substitui a interpretação humana. Não houve validação linguística por pessoa surda ou intérprete de Libras. Nas versões em inglês e espanhol, o link Libras leva à página equivalente em português.")}</p>
        <TextLink href="https://vlibras.gov.br/doc/widget/installation/webpageintegration.html">{t("Consultar a documentação oficial do VLibras")}</TextLink>
      </section>
      <section aria-labelledby="media-title"><h2 id="media-title">{t("Imagens, documentos e vídeos")}</h2>
        <p>{t("Informações essenciais de coleções, indicadores, mapas e depoimentos também aparecem em texto HTML. Os resumos dos depoimentos são identificados como sínteses, não como transcrições. As imagens originais podem ser ampliadas para consulta.")}</p>
        <p>{t("Os três vídeos locais são vinhetas sem áudio, com descrições textuais e arquivos VTT disponíveis. Os PDFs preservam os arquivos publicados; sua estrutura interna de acessibilidade ainda não foi auditada integralmente.")}</p>
      </section>
      <section aria-labelledby="limits-title"><h2 id="limits-title">{t("Objetivo e limites")}</h2>
        <p>{t("Este projeto busca atender às WCAG 2.2 no nível AA. Os recursos implementados e as verificações técnicas não constituem certificação de conformidade. Ainda são necessárias avaliações com pessoas com deficiência, leitores de tela reais e revisão humana das traduções.")}</p>
      </section>
      <section aria-labelledby="contact-title"><h2 id="contact-title">{t("Encontrou uma barreira?")}</h2>
        <p>{t("Entre em contato e informe a página, o dispositivo, o navegador e a dificuldade encontrada. O formulário prepara uma mensagem de e-mail e não a envia automaticamente.")}</p>
        <TextLink href="/contato">{t("Relatar dificuldade de acesso")}</TextLink>
      </section>
    </div>
  </>;
}
