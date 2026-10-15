"use client";
import { useT } from "@/i18n/client";
import { useState } from "react";
import Image from "@/components/AssetImage";
import { Icon } from "./Icon";
import { ImageDialog } from "./ImageDialog";
import s from "./content.module.css";
export type GalleryItem = {
    src: string;
    alt: string;
    caption: string;
    editionId?: string;
    group?: string;
};
export function MaterialGallery({ items, title, }: {
    items: GalleryItem[];
    title?: string;
}) {
    const t = useT();
    const [filter, setFilter] = useState("");
    const [selected, setSelected] = useState(0);
    const groups = Array.from(new Set(items.map((item) => item.group).filter(Boolean))) as string[];
    const visible = filter
        ? items.filter((item) => item.group === filter)
        : items;
    const index = Math.min(selected, visible.length - 1);
    const item = visible[index];
    if (!item)
        return null;
    return (<div className={s.gallery} role="region" aria-label={title ? t(title) : t("Galeria dos materiais")}>
      {groups.length > 1 && (<div className={s.galleryFilters}>
          <label>{t("Material ou volume")}{t(" ")}
            <select value={filter} onChange={(event) => {
                setFilter(event.target.value);
                setSelected(0);
            }}>
              <option value="">{t("Todos os materiais")}</option>
              {groups.map((group) => (<option key={group} value={group}>{t(group)}</option>))}
            </select>
          </label>
        </div>)}
      <figure className={s.galleryFigure}>
        <ImageDialog src={item.src} alt={t(item.alt)} caption={t(item.caption)}>
        <Image src={item.src} alt={t(item.alt)} width={1000} height={750} sizes="(max-width:767px) 90vw, 800px"/>
        </ImageDialog>
        <figcaption aria-live="polite">{t(item.caption)}</figcaption>
      </figure>
      <div className={s.galleryControls}>
        <button type="button" aria-label={t("Imagem anterior")} disabled={visible.length < 2} onClick={() => setSelected((index - 1 + visible.length) % visible.length)}>
          <Icon name="chevron" style={{ transform: "rotate(180deg)" }}/>
        </button>
        <span>
          {t("{0} de {1} imagens", [t.number(index + 1), t.number(visible.length)])}</span>
        <button type="button" aria-label={t("Próxima imagem")} disabled={visible.length < 2} onClick={() => setSelected((index + 1) % visible.length)}>
          <Icon name="chevron"/>
        </button>
      </div>
      <div className={s.thumbs} aria-label={t("Selecionar imagem")}>
        {visible.map((thumb, i) => (<button type="button" key={`${thumb.src}-${i}`} aria-label={t("Ver imagem {0}: {1}", [t.number(i + 1), t(thumb.alt)])} aria-pressed={i === index} onClick={() => setSelected(i)}>
            <Image src={thumb.src} alt={t("")} width={80} height={90} sizes="80px"/>
          </button>))}
      </div>
    </div>);
}
