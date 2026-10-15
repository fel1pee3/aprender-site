"""Download and inspect the official site's public PDF samples, preserving provenance."""
from pathlib import Path
import sys,re,json,urllib.request,concurrent.futures,hashlib,time
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.tools/pylibs'))
import pymupdf as fitz
from PIL import Image
OUT=ROOT/'.tools/samples';OUT.mkdir(parents=True,exist_ok=True)
PREV=ROOT/'public/images/samples';PREV.mkdir(parents=True,exist_ok=True)
DOCS=ROOT/'docs/migration';DOCS.mkdir(parents=True,exist_ok=True)
audit=Path(r'C:\Users\VAIOFE16-Felipe\Downloads\Auditoria_Aprender_Editora_2026-10-14.md').read_text(encoding='utf-8')
urls=list(dict.fromkeys(re.findall(r'https://[^\s)]+\.pdf',audit)))
urls=[u for u in urls if 'aprendereditora.com.br' in u]
groups=[('Brincando%20e%20Aprendendo','brincando-e-aprendendo','Brincando e Aprendendo'),('Acerta%20Brasil','acerta-brasil','ACerta Brasil'),('Vida%20E%20Linguagem','vida-e-linguagem','Vida & Linguagem'),('Vida%20E%20Matematica','vida-e-matematica','Vida & Matemática'),('Escrever%20comunicar','escrever-comunicar-e-ser','Escrever, Comunicar e Ser'),('Lendo%20e%20escrevendo','lendo-e-escrevendo','Lendo e Escrevendo'),('Novo%20Lendo','novo-lendo-voce-fica-sabendo','Novo Lendo Você Fica Sabendo'),('/TEMA/','projeto-tema','Projeto TEMA')]
def download(job):
    i,url=job
    slug,title=next(((s,t) for token,s,t in groups if token in url),('paic','PAIC'))
    file_name=urllib.parse.unquote(url.rsplit('/',1)[-1])
    rid=re.sub('[^a-z0-9]+','-',file_name.lower().removesuffix('.pdf')).strip('-')
    path=OUT/f'{rid}.pdf'
    if not path.exists():
        request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(request,timeout=120) as res:
            data=res.read();ctype=res.headers.get('Content-Type','');status=res.status
        if not data.startswith(b'%PDF-'): raise ValueError(f'Not a PDF {url} {ctype} {data[:80]}')
        path.write_bytes(data)
    else: data=path.read_bytes();ctype='application/pdf';status=200
    doc=fitz.open(path)
    texts=[p.get_text() for p in doc]
    (OUT/f'{rid}.txt').write_text('\n\n'.join(f'PÁGINA {n+1}\n{t}' for n,t in enumerate(texts)),encoding='utf-8')
    images=[]
    for pnum in sorted(set([0,min(2,len(doc)-1),min(7,len(doc)-1)])):
        page=doc[pnum];matrix=fitz.Matrix(min(1.6,1000/page.rect.width),min(1.6,1000/page.rect.width))
        pix=page.get_pixmap(matrix=matrix,alpha=False)
        im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        target=PREV/f'{rid}-p{pnum+1}.webp';im.save(target,'WEBP',quality=83,method=4)
        images.append({'src':'/images/samples/'+target.name,'page':pnum+1,'alt':f'{title}, página {pnum+1} da amostra pública'})
    result={'id':rid,'collectionSlug':slug if slug!='paic' else None,'title':file_name.removesuffix('.pdf'),'url':url,'format':'PDF','sizeBytes':len(data),'pageCount':len(doc),'edition':'Apresentação do site oficial — edição a conferir no arquivo','preview':images[0]['src'],'previews':images,'sourcePage':'https://www.aprendereditora.com.br/'+('colecao-'+slug if slug in ['acerta-brasil','vida-e-linguagem','vida-e-matematica'] else slug),'verifiedAt':'2026-10-14','httpStatus':status,'contentType':ctype,'sha256':hashlib.sha256(data).hexdigest(),'extractedText':str((OUT/f'{rid}.txt').relative_to(ROOT)),'firstPagesText':'\n'.join(texts[:4])}
    print(f'{i+1}/{len(urls)} {rid}: {len(data)} bytes, {len(doc)} pages',flush=True)
    return result
results=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    for future in concurrent.futures.as_completed([pool.submit(download,x) for x in enumerate(urls)]):
        try: results.append(future.result())
        except Exception as exc: print('FAIL',repr(exc),flush=True)
(OUT/'inspection.json').write_text(json.dumps(sorted(results,key=lambda x:x['id']),ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Validated {len(results)}/{len(urls)} PDF files',flush=True)
