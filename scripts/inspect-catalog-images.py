from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.tools' / 'pylibs'))
import pymupdf as fitz
from PIL import Image, ImageDraw
ROOT=Path(__file__).resolve().parents[1]
pdf=fitz.open(r'C:\Users\VAIOFE16-Felipe\Downloads\Catalogo_Aprender_Editora_2025_20_Anos.pdf')
out=ROOT/'.tools/previews'
pages=[2,3,12,14,16,18,20,24,26,28,30,32,36,38,40,42,44,46,50,52,54,56,58,60,61]
items=[]
for p in pages:
    seen=set()
    for spec in pdf[p-1].get_images():
        xref,smask,w,h=spec[:4]
        if xref in seen or w<200 or h<200: continue
        seen.add(xref)
        pix=fitz.Pixmap(pdf,xref)
        if pix.colorspace.n != 3: pix=fitz.Pixmap(fitz.csRGB,pix)
        if smask:
            try: pix=fitz.Pixmap(pix,fitz.Pixmap(pdf,smask))
            except: pass
        image=Image.frombytes('RGBA' if pix.alpha else 'RGB',(pix.width,pix.height),pix.samples)
        image.save(out/f'raw-{xref}.png')
        items.append((p,xref,image))
for start in range(0,len(items),40):
    sheet=Image.new('RGB',(1400,8*185),'#eeeae3'); draw=ImageDraw.Draw(sheet)
    for n,(p,xref,im) in enumerate(items[start:start+40]):
        im.thumbnail((265,160))
        x=(n%5)*280+(280-im.width)//2; y=(n//5)*185
        sheet.paste(im,(x,y+20),im if im.mode=='RGBA' else None)
        draw.text((x,y+3),f'p{p} xref{xref}',fill='black')
    path=out/f'images-{start:03d}.jpg';sheet.save(path,quality=90);print(path)
