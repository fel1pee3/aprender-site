"""Extract supplied Aprender catalog text, preview sheets and embedded assets locally."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.tools' / 'pylibs'))
import fitz
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / 'docs/referencias/Catalogo_Aprender_Editora_2025_20_Anos.pdf')
(ROOT / 'docs/referencias').mkdir(parents=True,exist_ok=True)
(ROOT / '.tools/previews').mkdir(parents=True,exist_ok=True)
pdf = fitz.open(SOURCE)
text_path = ROOT / 'docs/referencias/catalogo-2025.txt'
text_path.write_text('\n\n'.join(f'===== PÁGINA {i+1} =====\n{page.get_text()}' for i,page in enumerate(pdf)), encoding='utf-8')
print(f'{len(pdf)} pages; extracted to {text_path}')
for sheet_start in range(0,len(pdf),24):
    sheet = Image.new('RGB',(1440,6*250),'#e5e5e5')
    draw=ImageDraw.Draw(sheet)
    for offset,page in enumerate(pdf[sheet_start:sheet_start+24]):
        pix=page.get_pixmap(matrix=fitz.Matrix(.32,.32),alpha=False)
        thumb=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
        thumb.thumbnail((350,225))
        x=(offset%4)*360+(360-thumb.width)//2
        y=(offset//4)*250
        sheet.paste(thumb,(x,y+20))
        draw.text((x,y+3),f'Page {sheet_start+offset+1}',fill='black')
    path=ROOT / f'.tools/previews/sheet-{sheet_start+1:03d}.jpg'
    sheet.save(path,quality=90)
    print(path)
