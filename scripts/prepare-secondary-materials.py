"""Extract verified, genuine book photographs from the supplied 2025 catalog.

Each xref was selected after visually checking the catalog image sheets and pages.
Only source bitmap assets are resized; no material or cover is synthesized.
"""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools/pylibs'))
import pymupdf as fitz
from PIL import Image

SOURCE = Path(r'C:\Users\VAIOFE16-Felipe\Downloads\Catalogo_Aprender_Editora_2025_20_Anos.pdf')
catalog = fitz.open(SOURCE)
out = ROOT / 'public/images/materials/secondary'
out.mkdir(parents=True, exist_ok=True)
items = {
    'miudezas-e-descobertas': [(4234, 'Caderno de Experiências do Bebê'), (4235, 'Livro do Professor'), (4236, 'Brincando em Família'), (4237, 'Livro da Família'), (4238, 'Guia de Orientações'), (4239, 'Agenda do Bebê')],
    'cataventos': [(4264, 'Cataventos 1 — Guia do Professor'), (4265, 'Cataventos 2 — Guia do Professor'), (4276, 'Cataventos 1 — Livro Pasta do Bebê'), (4277, 'Cataventos 2 — Livro Pasta do Bebê'), (4278, 'Cataventos 1 — Livro da Família'), (4279, 'Cataventos 2 — Livro da Família')],
    'uni-duni-te': [(4338, 'Uni Duni Tê 1 — Livro de Atividades, volume 1'), (4339, 'Uni Duni Tê 1 — Livro de Atividades, volume 2'), (4340, 'Uni Duni Tê 2 — Livro de Atividades, volume 1'), (4341, 'Uni Duni Tê 2 — Livro de Atividades, volume 2'), (4333, 'Uni Duni Tê 1 — Guia de Orientações'), (4334, 'Uni Duni Tê 2 — Guia de Orientações'), (4336, 'Livro da Família')],
    'amma': [(3530, 'AMMA 1 — Livro de Atividades de Sala, volume 1'), (3531, 'AMMA 1 — Livro de Atividades de Sala, volume 2'), (3539, 'AMMA 1 — Livro de Atividades de Casa, volume 1'), (3540, 'AMMA 1 — Livro de Atividades de Casa, volume 2'), (3541, 'AMMA 1 — Guia de Orientações, volume 1'), (3542, 'AMMA 1 — Guia de Orientações, volume 2')],
    'superativar': [(3075, 'Superativar 3 — Linguagens, Livro de Atividades'), (3076, 'Superativar 3 — Matemática, Livro de Atividades'), (3084, 'Superativar 3 — Linguagens, Guia de Orientações'), (3085, 'Superativar 3 — Matemática, Guia de Orientações'), (3086, 'Superativar 3 — Questões Bônus, Linguagens, Estudante'), (3087, 'Superativar 3 — Questões Bônus, Linguagens, Professor'), (3077, 'Superativar 3 — Linguagens, Prova 1, Aluno'), (3078, 'Superativar 3 — Linguagens, Prova 1, Professor')],
    'vida-e-linguagem': [(2680, 'Vida & Linguagem 6 — Livro de Atividades'), (2681, 'Vida & Linguagem 6 — Suplemento SAEB do Aluno'), (2682, 'Vida & Linguagem 6 — Sugestões e Orientações para o Professor'), (2683, 'Vida & Linguagem 6 — Suplemento SAEB do Professor'), (2676, 'Vida & Linguagem 6 — Avaliação Somativa, Professor'), (2678, 'Vida & Linguagem 6 — Avaliação Somativa, Aluno'), (2677, 'Vida & Linguagem 6 — Avaliação Formativa, Professor'), (2679, 'Vida & Linguagem 6 — Avaliação Formativa, Aluno'), (2684, 'Vida & Linguagem 6 — Avaliação Diagnóstica, Professor'), (2685, 'Vida & Linguagem 6 — Avaliação Diagnóstica, Aluno')],
    'vida-e-matematica': [(2725, 'Vida & Matemática 6 — Livro de Atividades'), (2726, 'Vida & Matemática 6 — Suplemento SAEB do Aluno'), (2727, 'Vida & Matemática 6 — Sugestões e Orientações para o Professor'), (2728, 'Vida & Matemática 6 — Suplemento SAEB do Professor'), (2720, 'Vida & Matemática 6 — Avaliação Somativa, Aluno'), (2721, 'Vida & Matemática 6 — Avaliação Somativa, Professor'), (2723, 'Vida & Matemática 6 — Avaliação Formativa, Professor'), (2724, 'Vida & Matemática 6 — Avaliação Formativa, Aluno'), (2729, 'Vida & Matemática 6 — Avaliação Diagnóstica, Professor'), (2730, 'Vida & Matemática 6 — Avaliação Diagnóstica, Aluno')],
    'vida-e-ciencias': [(2773, 'Vida & Ciências 6 — Livro de Atividades'), (2774, 'Vida & Ciências 6 — Suplemento SAEB/Pisa do Aluno'), (2775, 'Vida & Ciências 6 — Sugestões e Orientações para o Professor'), (2776, 'Vida & Ciências 6 — Suplemento SAEB/Pisa do Professor'), (2767, 'Vida & Ciências 6 — Avaliação Somativa, Professor'), (2768, 'Vida & Ciências 6 — Avaliação Formativa, Aluno'), (2769, 'Vida & Ciências 6 — Avaliação Diagnóstica, Aluno'), (2770, 'Vida & Ciências 6 — Avaliação Formativa, Professor'), (2771, 'Vida & Ciências 6 — Avaliação Somativa, Aluno'), (2772, 'Vida & Ciências 6 — Avaliação Diagnóstica, Professor')],
    'avancando-juntos': [(2475, 'Avançando Juntos — 9º ano, Matemática, Livro do Professor'), (2476, 'Avançando Juntos — 9º ano, Matemática, Livro de Atividades'), (2477, 'Avançando Juntos — 9º ano, Língua Portuguesa, Livro do Professor'), (2478, 'Avançando Juntos — 9º ano, Língua Portuguesa, Livro de Atividades')],
    'sou-da-paz': [(2490, 'Sou da Paz 6 — Livro de Atividades'), (2491, 'Sou da Paz 6 — Guia de Orientações'), (2492, 'Sou da Paz 6 — Itinerários da Vida'), (2493, 'Sou da Paz — cartaz Razão e Querer')],
    'educacao-financeira': [(1997, 'Livro 1 — Fazendo Amizade com o Dinheiro: Consumo Consciente'), (2000, 'Livro 2 — Educação Fiscal: Consciência Cidadã'), (1998, 'Livro 3 — Finanças Pessoais: Planejando a Vida'), (1999, 'Livro 4 — Carreira Sustentável: Uma Viagem Radical')],
    'transito-legal': [(1679, 'Patrulhinha do Trânsito'), (1677, 'De Olho na Estrada'), (1676, 'Guia de Educação no Trânsito'), (1680, 'Trilha Circuito Trânsito Legal'), (1681, 'Jogo Decifra Placas')],
    'ler-ouvir-e-contar': [(1695, 'Ler, Ouvir e Contar 1 — Os Três Porquinhos'), (1696, 'Ler, Ouvir e Contar 1 — Cachinhos Dourados'), (1697, 'Ler, Ouvir e Contar 1 — O Patinho Feio'), (1698, 'Ler, Ouvir e Contar 1 — A Galinha Ruiva'), (1699, 'Ler, Ouvir e Contar 1 — O Lobo e os Sete Cabritinhos'), (1694, 'Ler, Ouvir e Contar 1 — Coletânea'), (1704, 'Ler, Ouvir e Contar 2 — A Cigarra e a Formiga'), (1705, 'Ler, Ouvir e Contar 2 — A Patinha Mexe-Mexe'), (1706, 'Ler, Ouvir e Contar 2 — Chapeuzinho Vermelho'), (1707, 'Ler, Ouvir e Contar 2 — O Soldadinho de Chumbo'), (1708, 'Ler, Ouvir e Contar 2 — Pedro Coelho'), (1703, 'Ler, Ouvir e Contar 2 — Coletânea'), (1709, 'Ler, Ouvir e Contar 3 — A Roupa Nova do Rei'), (1711, 'Ler, Ouvir e Contar 3 — A Princesa e o Sapo'), (1712, 'Ler, Ouvir e Contar 3 — O Gato de Botas'), (1713, 'Ler, Ouvir e Contar 3 — Pinóquio'), (1710, 'Ler, Ouvir e Contar 3 — Coletânea')],
    'ideb-nota-10': [(83, 'Livro Gestão Escolar'), (84, 'Avaliar — 5º ano, Matemática, Caderno de Aprendizagem do Estudante'), (92, 'Avaliar — 5º ano, Língua Portuguesa, Caderno de Aprendizagem do Estudante'), (93, 'Avaliar — 9º ano, Língua Portuguesa, Caderno de Aprendizagem do Professor'), (94, 'Avaliar — 9º ano, Matemática, Caderno de Aprendizagem do Professor'), (95, 'Avaliar — 1º ano, Língua Portuguesa'), (96, 'Avaliar — 1º ano, Matemática'), (97, 'Avaliar — 2º ano, Língua Portuguesa'), (98, 'Avaliar — 2º ano, Matemática'), (99, 'Avaliar — 3º ano, Língua Portuguesa'), (85, 'Avaliar — 4º ano, Língua Portuguesa'), (86, 'Avaliar — 5º ano, Língua Portuguesa'), (87, 'Avaliar — 6º ano, Língua Portuguesa'), (88, 'Avaliar — 7º ano, Língua Portuguesa'), (89, 'Avaliar — 8º ano, Língua Portuguesa'), (90, 'Avaliar — 9º ano, Língua Portuguesa')],
    'fluir-das-emocoes': [(133, 'Fluir 1 — O Cérebro e as Emoções'), (134, 'Fluir 1 — Para Fluir e Ir Além, Caderno de Atividades'), (135, 'Fluir 1 — Agenda'), (130, 'Fluir 2 — Sua Melhor Versão'), (131, 'Fluir 2 — Para Fluir e Ir Além, Caderno de Atividades'), (132, 'Fluir 2 — Agenda'), (143, 'Fluir 3 — O Eu em Relação'), (144, 'Fluir 3 — Para Fluir e Ir Além, Caderno de Atividades'), (145, 'Fluir 3 — Agenda')],
}

galleries = {}
image_specs = {spec[0]: spec for page in catalog for spec in page.get_images()}
for slug, materials in items.items():
    galleries[slug] = []
    for index, (xref, title) in enumerate(materials):
        name = f'{slug}-{index + 1:02d}.webp'
        valid = False
        if (out / name).exists():
            try:
                with Image.open(out / name) as existing:
                    existing.load()
                valid = True
            except Exception:
                pass
        if not valid:
            pix = fitz.Pixmap(catalog, xref)
            spec = image_specs.get(xref)
            if pix.colorspace.n != 3:
                pix = fitz.Pixmap(fitz.csRGB, pix)
            if spec and spec[1]:
                pix = fitz.Pixmap(pix, fitz.Pixmap(catalog, spec[1]))
            im = Image.frombytes('RGBA' if pix.alpha else 'RGB', (pix.width, pix.height), pix.samples)
            im.thumbnail((1000, 1000))
            im.save(out / name, 'WEBP', quality=88, method=4)
        galleries[slug].append({'src': f'/images/materials/secondary/{name}', 'alt': title, 'caption': f'{title} · catálogo de 2025', 'editionId': 'catalogo-2025'})

target = ROOT / 'src/data/collection-secondary-gallery.ts'
target.write_text('import type { MaterialImage } from "./collection-types";\n\nexport const secondaryGalleries: Record<string, MaterialImage[]> = ' + json.dumps(galleries, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f'{sum(map(len, galleries.values()))} genuine material images in {len(galleries)} galleries')
