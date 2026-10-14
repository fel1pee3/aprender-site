"""Extract original outlined brand paths from catalog page 5 without redrawing them."""
from pathlib import Path
import sys,re
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'.tools/pylibs'))
import pymupdf as fitz
ROOT=Path(__file__).resolve().parents[1]
source=fitz.open(sys.argv[1] if len(sys.argv) > 1 else ROOT / 'docs/referencias/Catalogo_Aprender_Editora_2025_20_Anos.pdf')
target=fitz.open();page=target.new_page(width=source[4].rect.width,height=source[4].rect.height)
for path in source[4].get_drawings()[1497:1514]:
    shape=page.new_shape()
    for item in path['items']:
        if item[0]=='l': shape.draw_line(item[1],item[2])
        elif item[0]=='c': shape.draw_bezier(item[1],item[2],item[3],item[4])
        elif item[0]=='re': shape.draw_rect(item[1])
        elif item[0]=='qu': shape.draw_quad(item[1])
        else: raise ValueError(item[0])
    shape.finish(fill=path['fill'],color=path['color'],even_odd=path.get('even_odd',False),closePath=path.get('closePath',False),width=path.get('width',1))
    shape.commit()
clip=fitz.Rect(310,686,428,731)
page.get_pixmap(matrix=fitz.Matrix(5,5),clip=clip,alpha=True).save(ROOT/'public/images/logo.png')
svg=page.get_svg_image()
svg=re.sub(r'width="[^"]+"', 'width="590"',svg,count=1)
svg=re.sub(r'height="[^"]+"', 'height="225"',svg,count=1)
svg=re.sub(r'viewBox="[^"]+"', 'viewBox="310 686 118 45"',svg,count=1)
(ROOT/'public/images/logo.svg').write_text(svg,encoding='utf-8')
print('Original rounded logo extracted from catalog page 5 into public/images/logo.png and logo.svg')
