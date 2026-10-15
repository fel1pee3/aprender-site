"""Verified line-by-line transcription of the original 2027 public price image.

The original labels remain in material; normalized columns only organize them.
No price or commercial availability is inferred from other editions.
"""
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
URL='https://www.aprendereditora.com.br/v2/midia/kcfinder/images/tabela_precos_2027.jpg'
rows=[]
def add(slug,collection,segment,label,price,audience='Não especificado',year='Não especificado',kit='Não especificado',related=None):
    row={'id':f'preco-2027-{len(rows)+1:03d}','collectionSlug':slug,'collection':collection,'material':label,'audience':audience,'schoolYear':year,'kit':kit,'priceCents':price*100,'segment':segment,'source':URL,'edition':'2027','sourceRow':len(rows)+1}
    if related: row['relatedCollectionSlugs']=related
    rows.append(row)
def pair(slug,col,seg,base,student,teacher,year='Não especificado',studentLabel='ALUNO',punct='.',prefix=' - KIT ',related=None):
    add(slug,col,seg,base+prefix+studentLabel+punct,student,studentLabel.title(),year,'Kit',related)
    add(slug,col,seg,base+prefix+'PROFESSOR'+punct,teacher,'Professor',year,'Kit',related)
pair('miudezas-e-descobertas','Miudezas e Descobertas','CRECHE','MIUDEZAS E DESCOBERTAS - BEBÊS',550,934,'Bebês')
pair('cataventos','Cataventos','PRÉ ESCOLA','CATAVENTOS - CRIANÇAS BEM PEQUENAS (2 ANOS)',550,934,'2 anos')
pair('cataventos','Cataventos','PRÉ ESCOLA','CATAVENTOS - CRIANÇAS BEM PEQUENAS (3 ANOS)',550,934,'3 anos')
rows[-1]['material']='CATAVENTOS - CRIANÇAS BEM PEQUENAS (3 ANOS) KIT PROFESSOR.'
for age in [4,5]: pair('uni-duni-te','Uni Duni Tê','PRÉ ESCOLA',f'UNI DUNI TÊ: CRIANÇAS PEQUENAS ({age} ANOS)',550,934,f'{age} anos')
add('brincando-e-aprendendo','Brincando e Aprendendo','CRECHE','BRINCANDO E APRENDENDO - KIT BEBÊ',550,'Bebê','Bebês','Kit')
add('brincando-e-aprendendo','Brincando e Aprendendo','CRECHE','BRINCANDO E APRENDENDO - KIT PROFESSOR',934,'Professor','Bebês','Kit')
for volume,age in [(1,2),(2,3),(3,4),(4,5)]: pair('brincando-e-aprendendo','Brincando e Aprendendo','PRÉ ESCOLA',f'BRINCANDO E APRENDENDO {volume} ({age} ANOS)',550,934,f'{age} anos','CRIANÇA','')
for vol,year,raw in [(1,'Pré 1','PRÉ 1'),(2,'1º ano','1º ANO'),(3,'2º ano','2º ANO')]: pair('ler-ouvir-e-contar','Ler, Ouvir e Contar','PRÉ ESCOLA' if vol==1 else 'FUND 1 ALFABETIZAÇÃO',f'LER OUVIR E CONTAR {vol} {raw}',381,616,year,'CRIANÇA','')
for year in [1,2]:
    for who,price in [('ALUNO',550),('PROFESSOR',934)]:add('novo-lendo-voce-fica-sabendo','Novo Lendo Você Fica Sabendo','FUND 1 ALFABETIZAÇÃO',f'NOVO LENDO {year}º ANO - KIT DO {who}',price,who.title(),f'{year}º ano','Kit')
for year in [1,2]:pair('amma','Aprender Mais Matemática (AMMA)','FUND 1 ALFABETIZAÇÃO',f'APRENDER MAIS MATEMATICA {"1º" if year==1 else "2"} ANO',550,934,f'{year}º ano',punct='')
for year in [1,2]:
    for who,price in [('ALUNO',929),('PROFESSOR',1568)]:add('novo-lendo-voce-fica-sabendo','Combo Novo Lendo e AMMA','FUND 1 ALFABETIZAÇÃO',f'KIT COMBO NOVO LENDO E AMMA - LP E MAT {year}° {who}',price,who.title(),f'{year}º ano','Kit combo',['novo-lendo-voce-fica-sabendo','amma'])
for v in [1,2,3]:
    for who,price in [('ALUNO',550),('PROFESSOR',934)]:add('projeto-tema','Projeto TEMA','FUND 1 ALFABETIZAÇÃO',f'TEMA {v}{"-" if v==1 else " -"} KIT DO {who}',price,who.title(),f'Volume {v}','Kit')
for subject in ['LINGUAGENS','MATEMÁTICA']:
    for year in [3,4,5]:
        ordinal=('3ª' if subject=='LINGUAGENS' else '3º') if year==3 else '4º' if year==4 else '5' if subject=='LINGUAGENS' else '5°'
        pair('superativar','Superativar','FUND 1 AVALIAÇÕES',f'SUPER ATIVAR - {subject} ({ordinal} ANO)',381,616,f'{year}º ano',punct='')
for year in [1,2,3,4,5]:add('escrever-comunicar-e-ser','Escrever, Comunicar e Ser','FUND 1 PROD.TEXTUAL',f'ESCREVER COMUNICAR E SER {year} LIVRO ALUNO',186,'Aluno',f'{year}º ano','Livro')
for slug,col,raw in [('vida-e-linguagem','Vida & Linguagem','LINGUAGEM'),('vida-e-matematica','Vida & Matemática','MATEMÁTICA'),('vida-e-ciencias','Vida & Ciências','CIENCIAS')]:
    for year in [6,7,8,9]:
        for who,price in [('ALUNO',276),('PROFESSOR',579)]:add(slug,col,'FUND 2 AVALIAÇÕES',f'VIDA E {raw} {year}º ANO KIT DO {who}',price,who.title(),f'{year}º ano','Kit')
for year in [6,7,8,9]:
    for subject in ['MATEMÁTICA','LÍNGUA PORTUGUESA']:
        for who,price in [('ALUNO',200),('PROFESSOR',303)]:add('avancando-juntos','Avançando Juntos','FUND 2 AVALIAÇÕES',f'AVANÇANDO JUNTOS {year}°ANO - {subject} - {who}',price,who.title(),f'{year}º ano')
for volume,year in [(1,6),(2,7),(3,8),(4,9)]:
    add('ingles','Inglês — My Learning / Teaching Companion','FUND 2 INGLÊS',f'MY LEARNING COMPANION {volume}-{year}° ANO-INGLÊS - ALUNO',200,'Aluno',f'{year}º ano')
    add('ingles','Inglês — My Learning / Teaching Companion','FUND 2 INGLÊS',f'MY TEACHING COMPANION {volume}-{year}° ANO-INGLÊS - PROFESSOR',303,'Professor',f'{year}º ano')
rows[-4]['material']='MY LEARNING COMPANION 3-8° ANO-INGLÊS - ALUNO'
rows[-3]['material']='MY TEACHING COMPANION 3-8° ANO - INGLÊS - PROFESSOR'
add('ideb-nota-10','IDEB Nota 10','DOCENTES','LIVRO TEXTO FORTALECIMENTO DA GESTÃO ESCOLAR.',334,'Docentes','Não especificado','Livro')
for year,audiences,price in [(1,['ESTUDANTE','PROFESSOR'],272),(2,['ESTUDANTE','PROFESSOR'],272),(3,['ESTUDANTE'],272),(4,['ESTUDANTE'],272),(5,['ESTUDANTE','PROFESSOR'],381),(6,['ESTUDANTE'],272),(7,['ESTUDANTE'],272),(8,['ESTUDANTE'],272),(9,['ESTUDANTE','PROFESSOR'],381)]:
    for who in audiences:
        label=f'AVALIAR {year}º ANO - KIT {who}'
        if year in [1,2] and who=='PROFESSOR':label=f'AVALIAR {year}º ANO-KIT PROFESSOR'
        if year in [4,5,6]:label=f'AVALIAR {year}º ANO KIT {who}'
        add('ideb-nota-10','IDEB Nota 10 — Avaliar',f'FUND {1 if year<=5 else 2} AVALIAÇÕES',label,price,who.title(),f'{year}º ano','Kit')
for volume,title in enumerate(['ERE','UANA','BAIRRO DO MISTURA','A HISTORIA DA SAMAUMA','AYVUERE','A PRINCESA DO ALGODAO','O POVO INVISIVEL','O BAOBA','CARARU'],1):add('a-cor-da-gente','A Cor da Gente',f'FUND {1 if volume<=5 else 2} AFRO-INDÍGENA',f'A COR DA GENTE {volume} {title}',186,year=f'Volume {volume}')
for seg,label,price,kit in [('FUND 1 TRÂNSITO','PATRULHA TRANSITO',69,'Não especificado'),('FUND 1 TRÂNSITO','JOGO TRILHA',109,'Jogo'),('FUND 2 TRÂNSITO','DE OLHO NA ESTRADA',69,'Não especificado'),('FUND 2 TRÂNSITO','JOGO DECIFRA PLACAS',109,'Jogo'),('FUND 1 E 2 TRÂNSITO','EU TRANSITO, TU TRANSITA',69,'Não especificado')]:
    add('transito-legal','Trânsito Legal',seg,'TRANSITO LEGAL A GENTE QUE FAZ'+('-' if label=='JOGO DECIFRA PLACAS' else ' - ')+label,price,kit=kit)
for volume,year in [(1,6),(2,7),(3,8),(4,9)]:add('educacao-financeira','Educação Financeira','FUND 2 ED.FINANCEIRA',f'EDUCACAO FINANCEIRA LIVRO {volume}-{year}{"º" if volume<4 else ""} ANO',186,year=f'{year}º ano',kit='Livro')
for year in [6,7,8,9]:
    add('sou-da-paz','Sou da Paz','FUND 2 ENSINO RELIGIOSO',f'SOU DA PAZ {year}º ANO LIVRO DO ALUNO',226,'Aluno',f'{year}º ano','Livro')
    add('sou-da-paz','Sou da Paz','FUND 2 ENSINO RELIGIOSO',f'SOU DA PAZ {year}º ANO KIT DO PROFESSOR',523,'Professor',f'{year}º ano','Kit')
for title in ['O CÉREBRO E AS EMOÇÕES.','SUA MELHOR VERSÃO.','O EU EM RELAÇÃO.']:add('fluir-das-emocoes','Fluir das Emoções','DOCENTES','FLUIR DAS EMOÇÕES - '+title,902,'Docentes')
assert len(rows)==152,len(rows)
source={'url':URL,'pageUrl':'https://www.aprendereditora.com.br/tabela-precos','image':'/images/resources/tabela-precos-2027.jpg','edition':'2027','verifiedAt':'2026-10-14','rowCount':len(rows),'notes':'Preços de capa publicados pela editora na tabela identificada como 2027. A identificação da edição não confirma vigência comercial; condições devem ser confirmadas com a editora.'}
items=[{'id':r['id'],'sourcePage':source['pageUrl'],'sourceResource':URL,'category':'Preço de capa publicado','content':r['material'],'edition':'2027','consultedAt':'2026-10-14','destination':'/recursos/tabela-precos','status':'recuperado','sourceRow':r['sourceRow'],'notes':'Linha conferida visualmente; associação entre material, público, ano/volume, kit e preço mantida. Não indica vigência comercial.'} for r in rows]
payload={'source':source,'rows':rows,'items':items,'verification':'Todas as 152 linhas foram conferidas visualmente contra a imagem original de 1100 × 5693 pixels. Segmentos e rótulos originais preservados; preços em centavos sem arredondamento. Campos não informados estão explicitamente identificados.'}
(ROOT/'docs/migration/prices.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding='utf-8')
types='''export type PriceRow = {
  id: string; collectionSlug?: string; relatedCollectionSlugs?: string[];
  collection: string; material: string; audience: string; schoolYear: string;
  kit: string; priceCents: number; segment: string; source: string;
  edition: string; sourceRow: number;
};

'''
types+='export const priceSource = '+json.dumps(source,ensure_ascii=False,indent=2)+' as const;\n\n'
types+='export const priceRows: PriceRow[] = '+json.dumps(rows,ensure_ascii=False,indent=2)+';\n\n'
types+='export function getCollectionPrices(slug: string): PriceRow[] {\n  return priceRows.filter((row) => row.collectionSlug === slug || row.relatedCollectionSlugs?.includes(slug));\n}\n'
(ROOT/'src/data/prices.ts').write_text(types,encoding='utf-8')
print(f'Wrote {len(rows)} verified rows')
