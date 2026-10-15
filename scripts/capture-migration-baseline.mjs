import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('.qa/baseline',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();
const observations=[];
for(const url of ['http://localhost:3000','https://aprender-site.vercel.app']){
 try{const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});observations.push({url,status:response.status(),title:await page.title(),openGraph:await page.locator('meta[property^="og:"]').evaluateAll(nodes=>nodes.map(n=>({property:n.getAttribute('property'),content:n.getAttribute('content')})))});}catch(error){observations.push({url,error:String(error)})}
}
for(const width of [390,1440]){
 await page.setViewportSize({width,height:1000});await page.goto('http://localhost:3000');
 await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`.qa/baseline/home-${width}.png`,fullPage:true});
}
await writeFile('docs/migration/baseline.json',JSON.stringify({date:'2026-10-14',observations},null,2));
console.log(JSON.stringify(observations.map(({url,status,title,error})=>({url,status,title,error}))));
await browser.close();
