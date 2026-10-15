"use client";
import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";
import s from "./content.module.css";
export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  editionId?: string;
  group?: string;
};
export function MaterialGallery({
  items,
  title = "Galeria dos materiais",
}: {
  items: GalleryItem[];
  title?: string;
}) {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(0);
  const groups = Array.from(
    new Set(items.map((item) => item.group).filter(Boolean)),
  ) as string[];
  const visible = filter
    ? items.filter((item) => item.group === filter)
    : items;
  const index = Math.min(selected, visible.length - 1);
  const item = visible[index];
  if (!item) return null;
  return (
    <div className={s.gallery} role="region" aria-label={title}>
      {groups.length > 1 && (
        <div className={s.galleryFilters}>
          <label>
            Material ou volume{" "}
            <select
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
                setSelected(0);
              }}
            >
              <option value="">Todos os materiais</option>
              {groups.map((group) => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <figure className={s.galleryFigure}>
        <Image
          src={item.src}
          alt={item.alt}
          width={1000}
          height={750}
          sizes="(max-width:767px) 90vw, 800px"
        />
        <figcaption aria-live="polite">{item.caption}</figcaption>
      </figure>
      <div className={s.galleryControls}>
        <button
          type="button"
          aria-label="Imagem anterior"
          onClick={() =>
            setSelected((index - 1 + visible.length) % visible.length)
          }
        >
          <Icon name="chevron" style={{ transform: "rotate(180deg)" }} />
        </button>
        <span>
          {index + 1} de {visible.length} imagens
        </span>
        <button
          type="button"
          aria-label="Próxima imagem"
          onClick={() => setSelected((index + 1) % visible.length)}
        >
          <Icon name="chevron" />
        </button>
      </div>
      <div className={s.thumbs} aria-label="Selecionar imagem">
        {visible.map((thumb, i) => (
          <button
            type="button"
            key={`${thumb.src}-${i}`}
            aria-label={`Ver imagem ${i + 1}: ${thumb.alt}`}
            aria-pressed={i === index}
            onClick={() => setSelected(i)}
          >
            <Image src={thumb.src} alt="" width={80} height={90} sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
