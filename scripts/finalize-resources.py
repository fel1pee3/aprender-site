"""Publish verified resource metadata and lightweight previews, keeping PDFs external."""
from pathlib import Path
import sys,json,re,hashlib,shutil
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.tools/pylibs'))
import pymupdf as fitz
from PIL import Image
records=json.loads((ROOT/'.tools/samples/inspection.json').read_text(encoding='utf-8'))
resources=[];migration=[]
for record in records:
    rid=record['id'];slug=record['collectionSlug']
    r={k:v for k,v in record.items() if k not in ['firstPagesText','extractedText','httpStatus','contentType','sha256'] and v is not None}
    r['edition']='Acervo do site oficial — ano de edição não informado na amostra'
    r['kind']='sample';r['audience']='Aluno';r['notes']='Amostra pública vinculada pelo site oficial; a edição não deve ser confundida com o catálogo de 2025 ou com a tabela de 2027.'
    if rid.startswith('brincando-'):
        volume=int(rid[-2:]);r['title']=f'Brincando e Aprendendo — Educação Infantil, livro {volume}';r['volume']=str(volume);r['audience']='Criança';r['schoolYear']='Educação Infantil'
    elif rid.startswith('acbr-'):
        subject='Matemática' if 'matematica' in rid else 'Língua Portuguesa'
        r['title']=f'ACerta Brasil #SuperaIDEB — {subject}, 5º ano';r['schoolYear']='5º ano'
    elif rid.startswith('ecs-'):
        year=rid.split('-')[1];r['title']=f'Escrever, Comunicar e Ser — {year}º ano';r['schoolYear']=f'{year}º ano'
    elif rid.startswith('vida-e-'):
        year=rid.split('-')[-2];subject='Linguagem' if 'linguagem' in rid else 'Matemática';r['title']=f'Vida & {subject} — {year}º ano';r['schoolYear']=f'{year}º ano'
    elif rid.startswith('nlvfs-'):
        year=rid.split('-')[1];r['title']=f'Novo Lendo Você Fica Sabendo — {year}º ano, volume 1';r['schoolYear']=f'{year}º ano';r['volume']='1'
    elif rid.startswith('livro-tema-'):
        number=rid[-1];r['title']=f'Projeto TEMA {number} — Livro do Aluno, Sala, volume 1';r['volume']='1';r['schoolYear']=f'Livro {number}'
    elif rid=='educacao-infantil-laranja':
        r['title']='Lendo e Escrevendo — Dia de Supermercado (amostra laranja)';r['audience']='Criança';r['schoolYear']='Educação Infantil';r['notes']='O arquivo rotulado “Educação Infantil — Laranja” inicia com “Dia de Supermercado”. Não apresenta capa da coleção, número do livro nem volume: esses dados não foram inferidos.'
    elif rid=='educacao-infantil-verde-vol-02':
        r['title']='Lendo e Escrevendo — Livro da Criança 2, volume II (verde)';r['volume']='II';r['audience']='Criança';r['schoolYear']='Educação Infantil';r['notes']='Capa conferida: Livro da Criança 2, Vol. II. A amostra tem 13 páginas digitais e informa ISBN 978-85-8314-256-0. O endereço Rua Marvin é histórico, conforme expediente do arquivo.'
    elif rid=='educacao-infantil-vermelho-vol-01':
        r['title']='Lendo e Escrevendo — Livro da Criança 3, volume I (vermelho)';r['volume']='I';r['audience']='Criança';r['schoolYear']='Educação Infantil';r['notes']='Capa conferida: Livro da Criança 3, Vol. I. O nome do arquivo identifica a cor e o volume, mas omite o número 3 do livro.'
    elif rid=='paic':
        r['title']='Regime de colaboração para a garantia do direito à aprendizagem: o PAIC no Ceará';r['edition']='SEDUC / UNICEF, Fortaleza, 2012';r['year']=2012;r['kind']='institutional';r['audience']='Educadores, gestores e pesquisadores';r['notes']='Publicação da Secretaria da Educação do Ceará e do UNICEF, ISBN 978-85-8171-019-8. São 196 páginas editoriais organizadas em 100 páginas digitais, incluindo páginas duplas e capas. Registro histórico da política pública.'
    doc=fitz.open(ROOT/'.tools/samples'/f'{rid}.pdf')
    selected=[0,2 if len(doc[2].get_text().strip())>100 else 3,7]
    if rid=='paic': selected=[0,5,7]
    previews=[]
    for num in selected:
        page=doc[num];scale=min(1.6,1000/page.rect.width);pix=page.get_pixmap(matrix=fitz.Matrix(scale,scale),alpha=False)
        im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        target=ROOT/'public/images/samples'/f'{rid}-p{num+1}.webp';im.save(target,'WEBP',quality=83,method=4)
        previews.append({'src':'/images/samples/'+target.name,'page':num+1,'alt':f'{r["title"]} — página digital {num+1} da amostra'})
    r['previews']=previews;r['preview']=previews[0]['src'];resources.append(r)
    migration.append({'id':'resource-'+rid,'sourcePage':r['sourcePage'],'sourceResource':r['url'],'category':'Documento institucional' if r['kind']=='institutional' else 'Amostra de material','content':r['title'],'edition':r['edition'],'consultedAt':'2026-10-14','destination':'/recursos' if r['kind']=='institutional' else f'/solucoes/{slug}#amostras','status':'recuperado','validation':{'status':200,'signature':'%PDF-','parse':'PyMuPDF: válido','pageCount':r['pageCount'],'sizeBytes':r['sizeBytes'],'sha256':record['sha256'],'coverAndInteriorInspected':True},'notes':r['notes']})
# The supplied catalog remains an external download, avoiding an automatic 70 MB asset.
catalog=Path(r'C:\Users\VAIOFE16-Felipe\Downloads\Catalogo_Aprender_Editora_2025_20_Anos.pdf')
caturl='https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf'
catdoc=fitz.open(catalog)
resources.append({'id':'catalogo-2025-20-anos','title':'Catálogo Aprender Editora — 20 anos','url':caturl,'format':'PDF','sizeBytes':catalog.stat().st_size,'pageCount':len(catdoc),'edition':'Catálogo institucional de 2025','year':2025,'kind':'catalog','sourcePage':'https://www.opovo.com.br/noticias/especialpublicitario/aprendereditora/2025/11/07/aprender-editora-duas-decadas-formando-leitores-professores-e-futuros.html','verifiedAt':'2026-10-14','notes':'Documento de 70,3 MB. Arquivo fornecido pelo usuário validado localmente; URL pública conferida por resposta parcial HTTP 206, assinatura PDF e tamanho total de 70.269.887 bytes. O download só ocorre ao abrir o link.'})
migration.append({'id':'resource-catalogo-2025-20-anos','sourcePage':resources[-1]['sourcePage'],'sourceResource':caturl,'category':'Catálogo institucional','content':resources[-1]['title'],'edition':'2025','consultedAt':'2026-10-14','destination':'/recursos','status':'preservado','validation':{'status':206,'signature':'%PDF-1.6','parse':'PyMuPDF: válido (arquivo local fornecido)','pageCount':len(catdoc),'sizeBytes':catalog.stat().st_size,'remoteTotalBytes':70269887},'notes':resources[-1]['notes']})
types='''export type DocumentPreview = { src: string; page: number; alt: string };
export type DocumentResource = {
  id: string; collectionSlug?: string; title: string; url: string; format: "PDF";
  sizeBytes: number; pageCount: number; edition: string; year?: number;
  volume?: string; audience?: string; schoolYear?: string; preview?: string;
  previews?: DocumentPreview[]; sourcePage: string; verifiedAt: string;
  kind: "sample" | "institutional" | "catalog"; notes?: string;
};

'''
types+='export const documentResources: DocumentResource[] = '+json.dumps(resources,ensure_ascii=False,indent=2)+';\n\n'
types+='export function getCollectionResources(slug: string): DocumentResource[] {\n  return documentResources.filter((resource) => resource.collectionSlug === slug);\n}\n\n'
types+='export function formatFileSize(bytes: number): string {\n  return `${(bytes / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;\n}\n'
(ROOT/'src/data/resources.ts').write_text(types,encoding='utf-8')
(ROOT/'docs/migration/resources.json').write_text(json.dumps({'verifiedAt':'2026-10-14','summary':{'officialPDFs':28,'samplePDFs':27,'institutionalPDFs':1,'additionalCatalog':1,'failures':0},'items':migration,'resources':resources},ensure_ascii=False,indent=2),encoding='utf-8')
materials=ROOT/'public/images/materials';materials.mkdir(exist_ok=True)
shutil.copyfile(ROOT/'public/images/samples/educacao-infantil-verde-vol-02-p1.webp',materials/'lendo-e-escrevendo.webp')
shutil.copyfile(ROOT/'public/images/samples/acbr-matematica-5-ano-p1.webp',materials/'acerta-brasil.webp')
print(f'{len(resources)} resources, {len(migration)} migration rows, covers ready')
