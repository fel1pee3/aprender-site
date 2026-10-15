"""Inventory publicly linked HTML/images without altering the official website."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.request import urlopen, Request
from urllib.parse import urljoin, urlsplit, unquote, quote
from concurrent.futures import ThreadPoolExecutor, as_completed
import json, hashlib, re, sys

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.tools/pylibs'))
from PIL import Image
BASE='https://www.aprendereditora.com.br/'
DEST=ROOT/'.tools/official'
DEST.mkdir(parents=True,exist_ok=True)
(ROOT/'docs/migration').mkdir(parents=True,exist_ok=True)
INITIAL=['','index','quem-somos','missao-principios-e-valores','trajetoria','trajetorias-prof-edgar','trajetorias-lendo-voce-fica-sabendo','paic','produtos','brincando-e-aprendendo','brincando-e-aprendendo-novo','lendo-e-escrevendo','novo-lendo-voce-fica-sabendo','escrever-comunicar-e-ser','colecao-acerta-brasil','colecao-a-cor-da-gente','colecao-vida-e-linguagem','colecao-vida-e-matematica','projeto-tema','projeto-transito-legal','educacao-financeira','colecao-fluir-das-emocoes','sou-da-paz','aprender-em-acao','tabela-precos','aprender-formar','aprencer-avaliar','fale-conosco','video-1','video-2','video-3']
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.images=[];self.media=[];self.text=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ('a','area') and a.get('href'):self.links.append({'url':urljoin(BASE,a['href']),'tag':tag,'title':a.get('title','')})
  if tag=='img' and a.get('src'):self.images.append({'url':urljoin(BASE,a['src']),'alt':a.get('alt','')})
  if tag in ('video','source','iframe') and a.get('src'):self.media.append({'url':urljoin(BASE,a['src']),'tag':tag})
 def handle_data(self,data):
  if data.strip():self.text.append(data.strip())
def fetch(url):
 url=quote(url,safe=':/?=%&+#')
 with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36','Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8','Accept-Language':'pt-BR,pt;q=0.9,en;q=0.8'}),timeout=35) as r:return r.read(),r.status,r.headers.get('Content-Type','')
def page(slug):
 url=BASE+slug; name=slug or 'home'; path=DEST/f'{name}.html'
 try:
  data,status,mime=fetch(url);path.write_bytes(data);p=Parser();p.feed(data.decode('utf8','replace'))
  (DEST/f'{name}.txt').write_text('\n'.join(p.text),encoding='utf8')
  return {'url':url,'path':'/'+slug,'local':str(path.relative_to(ROOT)).replace('\\','/'),'status':status,'sha256':hashlib.sha256(data).hexdigest(),'links':p.links,'images':p.images,'media':p.media}
 except Exception as e:return {'url':url,'path':'/'+slug,'error':str(e)}
pages=[]
with ThreadPoolExecutor(max_workers=6) as pool:
 for result in pool.map(page,INITIAL):pages.append(result);print(result['path'],result.get('status',result.get('error')),flush=True)
extra=set()
for p in pages:
 for link in p.get('links',[]):
  u=urlsplit(link['url']);slug=u.path.strip('/')
  if u.hostname in ('www.aprendereditora.com.br','aprendereditora.com.br') and slug and '/' not in slug and '.' not in slug and slug not in INITIAL:extra.add(slug)
with ThreadPoolExecutor(max_workers=4) as pool:pages.extend(pool.map(page,sorted(extra)))
imageUrls=sorted({image['url'] for p in pages for image in p.get('images',[]) if '/midia/' in image['url']})
def download_image(url):
 basename=re.sub(r'[^\w.-]+','-',unquote(urlsplit(url).path.split('/')[-1])); path=DEST/(hashlib.sha1(url.encode()).hexdigest()[:8]+'-'+basename)
 try:
  data,status,mime=fetch(url);path.write_bytes(data)
  with Image.open(path) as im:size=im.size
  return {'url':url,'local':str(path.relative_to(ROOT)).replace('\\','/'),'width':size[0],'height':size[1],'sizeBytes':len(data),'status':status}
 except Exception as e:return {'url':url,'error':str(e)}
manifest={'consultedAt':'2026-10-14','pages':pages,'images':[]}
target=ROOT/'docs/migration/official-manifest.json'
target.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
with ThreadPoolExecutor(max_workers=6) as pool:
 for image in pool.map(download_image,imageUrls):manifest['images'].append(image);print('IMAGE',image.get('local',image['url']),flush=True)
target.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'pages':len(pages),'images':len(imageUrls),'extra':list(extra)},ensure_ascii=False))
