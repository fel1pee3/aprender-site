"""Prepare faithful web assets from the supplied catalog; no generated imagery."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.tools' / 'pylibs'))
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
pdf=fitz.open(sys.argv[1] if len(sys.argv) > 1 else ROOT / 'docs/referencias/Catalogo_Aprender_Editora_2025_20_Anos.pdf')
out=ROOT/'public/images';(out/'collections').mkdir(parents=True,exist_ok=True)
books=[
 ('brincando-e-aprendendo',14,4806),
 ('miudezas-e-descobertas',16,4234),
 ('cataventos',18,4276),
 ('uni-duni-te',20,4338),
 ('novo-lendo-voce-fica-sabendo',24,3961),
 ('amma',26,3530),
 ('projeto-tema',28,3592),
 ('escrever-comunicar-e-ser',30,3628),
 ('superativar',32,3075),
 ('vida-e-linguagem',36,2680),
 ('vida-e-matematica',38,2725),
 ('vida-e-ciencias',40,2773),
 ('avancando-juntos',42,2476),
 ('sou-da-paz',44,2490),
 ('educacao-financeira',46,1997),
 ('a-cor-da-gente',50,2097),
 ('transito-legal',52,1677),
 ('ler-ouvir-e-contar',54,1694),
 ('ideb-nota-10',56,92),
 ('fluir-das-emocoes',58,133),
]
photos=[
 ('hero',60,152),
 ('formation',61,164),
 ('history',2,7165),
 ('palhano-2010',2,7165),
 ('novo-oriente-2011',22,4219),
 ('formacao-professores',61,163),
 ('formacao-encontro',61,165),
]
def extract(p,xref):
    spec=next(s for s in pdf[p-1].get_images() if s[0]==xref)
    pix=fitz.Pixmap(pdf,xref)
    if pix.colorspace.n!=3: pix=fitz.Pixmap(fitz.csRGB,pix)
    if spec[1]: pix=fitz.Pixmap(pix,fitz.Pixmap(pdf,spec[1]))
    return Image.frombytes('RGBA' if pix.alpha else 'RGB',(pix.width,pix.height),pix.samples)
for slug,p,xref in books:
    im=extract(p,xref)
    # Remove only empty, fully transparent outer margins already in the PDF asset.
    if im.mode=='RGBA':
        bbox=im.getchannel('A').getbbox()
        if bbox: im=im.crop(bbox)
    im.thumbnail((720,880),Image.Resampling.LANCZOS)
    path=out/'collections'/f'{slug}.webp';im.save(path,'WEBP',quality=90,method=6)
    print(f'{path.relative_to(ROOT)} {im.size} {path.stat().st_size}')
for slug,p,xref in photos:
    im=extract(p,xref).convert('RGB'); im.thumbnail((1600,1600),Image.Resampling.LANCZOS)
    path=out/f'{slug}.webp';im.save(path,'WEBP',quality=86,method=6)
    print(f'{path.relative_to(ROOT)} {im.size} {path.stat().st_size}')
