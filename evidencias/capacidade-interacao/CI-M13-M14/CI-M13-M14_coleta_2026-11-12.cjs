// Uso: node este-script.cjs <checkout-oficial> <diretorio-novo-saida>
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
const crypto = require('node:crypto');
const SHA = 'e7b534668a60add7f725531f3c9abf32508c7b4e';
const source = fs.realpathSync(process.argv[2]);
const git = (...a) => execFileSync('git', ['-C', source, ...a], {encoding:'utf8'}).trim();
if (git('rev-parse','HEAD') !== SHA || git('status','--porcelain','--untracked-files=no')) throw Error('Checkout incorreto ou alterado');
const out = path.resolve(process.argv[3]); fs.mkdirSync(out);
const req = createRequire(path.join(source,'package.json'));
const report = {sha:SHA, source, started:new Date().toISOString(), dateLocal: new Date().toLocaleString('sv-SE',{timeZone:'America/Sao_Paulo'}), node:process.version, platform:process.platform, playwright:req('playwright/package.json').version, waitMs:300, cases:[], errors:[], blocked:[]};
const save = () => fs.writeFileSync(path.join(out,'dados.json'),JSON.stringify(report,null,2));
let server, browser;
async function settle(p) { await p.mouse.move(1200,750); await p.waitForTimeout(300); }
async function state(p) { return p.evaluate(() => ({elements:window.h.elements.filter(e=>!e.isDeleted).map(e=>Object.fromEntries(['id','type','x','y','width','height','angle','strokeColor','backgroundColor','text','fontSize','groupIds'].map(k=>[k,e[k]]))), selected:Object.keys(window.h.state.selectedElementIds).filter(k=>window.h.state.selectedElementIds[k]).sort(), theme:window.h.state.theme, zoom:window.h.state.zoom.value, undo:window.h.history.undoStack.length, redo:window.h.history.redoStack.length})); }
async function shot(p,id,stage) { await settle(p); const s=await state(p); const file=`${id}_${stage}.png`; const b=await p.screenshot({path:path.join(out,file)}); return {at:new Date().toISOString(),...s,file,sha256:crypto.createHash('sha256').update(b).digest('hex')}; }
async function drag(p,x,y,a,b) {await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(a,b,{steps:12});await p.mouse.up();await settle(p);}
async function rect(p,x=450,y=300) {await p.keyboard.press('r');await drag(p,x,y,x+160,y+100);await p.keyboard.press('v');}
async function text(p,value) {await p.keyboard.press('t');await p.mouse.click(470,320);await p.locator('textarea').fill(value);await p.keyboard.press('Escape');await settle(p);}
async function select(p) {await p.keyboard.press('v');await p.mouse.click(450,350);await settle(p);}
const defs = [
 ['A01','Criar retângulo',async()=>{},async p=>rect(p),(a,b)=>a.elements.length===0&&b.elements.length===1&&b.elements[0].type==='rectangle'&&b.elements[0].width===160&&b.elements[0].height===100],
 ['A02','Selecionar',async p=>{await rect(p);await p.mouse.click(800,650);},select,(a,b)=>a.selected.length===0&&b.selected.length===1],
 ['A03','Mover',async p=>{await rect(p);await select(p);},async p=>drag(p,450,350,530,410),(a,b)=>b.elements[0].x===a.elements[0].x+80&&b.elements[0].y===a.elements[0].y+60],
 ['A04','Redimensionar',async p=>{await rect(p);await select(p);},async p=>drag(p,610,400,670,440),(a,b)=>b.elements[0].width>a.elements[0].width&&b.elements[0].height>a.elements[0].height],
 ['A05','Alterar cor',async p=>{await rect(p);await select(p);},async p=>{await p.locator('[data-top-pick-index="1"]').first().click();},(a,b)=>a.elements[0].strokeColor!==b.elements[0].strokeColor&&b.elements[0].strokeColor==='#e03131'],
 ['A06','Criar texto',async()=>{},async p=>text(p,'Cena ficticia CI70'),(a,b)=>a.elements.length===0&&b.elements.some(e=>e.text==='Cena ficticia CI70')],
 ['A07','Editar texto',async p=>text(p,'Cena ficticia CI70'),async p=>{await p.mouse.dblclick(520,330);await p.locator('textarea').fill('Texto editado CI70');await p.keyboard.press('Escape');},(a,b)=>a.elements[0].text==='Cena ficticia CI70'&&b.elements[0].text==='Texto editado CI70'],
 ['A08','Duplicar',async p=>{await rect(p);await select(p);},async p=>p.keyboard.press('Control+d'),(a,b)=>a.elements.length===1&&b.elements.length===2&&new Set(b.elements.map(e=>e.id)).size===2],
 ['A09','Excluir',async p=>{await rect(p);await select(p);},async p=>p.keyboard.press('Delete'),(a,b)=>a.elements.length===1&&b.elements.length===0],
 ['A10','Agrupar',async p=>{await rect(p);await rect(p,700,450);await p.keyboard.press('Control+a');},async p=>p.keyboard.press('Control+g'),(a,b)=>a.elements.every(e=>!e.groupIds.length)&&b.elements.every(e=>e.groupIds.length===1)&&b.elements[0].groupIds[0]===b.elements[1].groupIds[0]],
 ['A11','Desagrupar',async p=>{await rect(p);await rect(p,700,450);await p.keyboard.press('Control+a');await p.keyboard.press('Control+g');await settle(p);},async p=>p.keyboard.press('Control+Shift+g'),(a,b)=>a.elements.every(e=>e.groupIds.length===1)&&b.elements.every(e=>!e.groupIds.length)],
 ['A12','Mudar tema',async p=>rect(p),async p=>p.keyboard.press('Alt+Shift+d'),(a,b)=>a.theme==='light'&&b.theme==='dark'],
 ['A13','Zoom',async p=>rect(p),async p=>p.keyboard.press('Control+Equal'),(a,b)=>a.zoom===1&&b.zoom>1]
];
function projection(s,id) { return JSON.stringify({elements:s.elements,...(id==='A02'?{selected:s.selected}:{}),...(id==='A12'?{theme:s.theme}:{}),...(id==='A13'?{zoom:s.zoom}:{})}); }
(async()=>{try {
 process.chdir(path.join(source,'excalidraw-app'));
 const {createServer}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')).href);
 server=await createServer({root:process.cwd(),server:{host:'127.0.0.1',port:3020,strictPort:true,open:false}});await server.listen();
 report.server={root:server.config.root,configFile:server.config.configFile,url:'http://127.0.0.1:3020',ownedByCollector:true};
 browser=await req('playwright').chromium.launch({channel:'msedge',headless:true});report.browser=browser.version();
 for(const [id,name,prepare,action,check] of defs) {
  const c={id,name,status:'running'};report.cases.push(c);save();
  const context=await browser.newContext({viewport:{width:1366,height:900},locale:'en-US',colorScheme:'light'});
  await context.route('**/*',r=>{const u=new URL(r.request().url()); if(['127.0.0.1','localhost'].includes(u.hostname)||['data:','blob:'].includes(u.protocol))return r.continue();report.blocked.push({id,url:u.origin+u.pathname});return r.abort();});
  const p=await context.newPage();p.on('pageerror',e=>{report.errors.push({id,error:String(e)});save();});
  try {
   await p.goto(report.server.url);await p.waitForFunction(()=>window.h?.app&&!window.h.state.isLoading);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1000);
   await prepare(p);c.before=await shot(p,id,'antes');await action(p);c.after=await shot(p,id,'depois');
   c.expectedEffect=check(c.before,c.after);c.visualChanged=c.before.sha256!==c.after.sha256;c.feedback=c.expectedEffect&&c.visualChanged;
   await p.keyboard.press('Control+z');c.undo=await shot(p,id,'desfazer');c.undoRestored=projection(c.undo,id)===projection(c.before,id);
   await p.keyboard.press('Control+Shift+z');c.redo=await shot(p,id,'refazer');c.redoRestored=projection(c.redo,id)===projection(c.after,id);
   c.recoverable=c.expectedEffect&&c.undoRestored&&c.redoRestored;c.historyEntry=c.after.undo>c.before.undo;c.status='complete';
   console.log(JSON.stringify({id,feedback:c.feedback,undo:c.undoRestored,redo:c.redoRestored,history:c.historyEntry}));
  } catch(e) {c.status='automation-error';c.error=String(e);c.dom=await p.locator('body').innerText();await p.screenshot({path:path.join(out,`${id}_erro.png`)});throw e;}
  finally {await context.close();save();}
 }
 report.status='complete';
} catch(e) {report.status='incomplete';report.failure=String(e);process.exitCode=1;console.error(e);}
finally {report.finished=new Date().toISOString();save();await browser?.close();await server?.close();}
})();
