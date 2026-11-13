// node este-script.cjs <checkout-oficial> <diretorio-novo-de-saida>
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process'),{createRequire}=require('node:module'),{pathToFileURL}=require('node:url');
const SHA='e7b534668a60add7f725531f3c9abf32508c7b4e';
const source=fs.realpathSync(process.argv[2]);
const git=(...args)=>execFileSync('git',['-C',source,...args],{encoding:'utf8'}).trim();
if(git('rev-parse','HEAD')!==SHA||git('status','--porcelain','--untracked-files=no'))throw Error('Checkout divergente ou alterado');
const out=path.resolve(process.argv[3]);fs.mkdirSync(out);
const req=createRequire(path.join(source,'package.json'));
const report={sha:SHA,source,started:new Date().toISOString(),localDate:new Date().toLocaleString('sv-SE',{timeZone:'America/Sao_Paulo'}),node:process.version,platform:process.platform,playwright:req('playwright/package.json').version,snapshots:[],actions:[],errors:[],nativeDialogs:[],blocked:[],status:'collecting',fallbackFileInput:true};
const save=()=>fs.writeFileSync(path.join(out,'dados.json'),JSON.stringify(report,null,2));
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
function canonical(elements){return JSON.stringify(stable(elements.filter(e=>!e.isDeleted).map(e=>{const c={...e,boundElements:e.boundElements||[]};for(const k of ['version','versionNonce','updated'])delete c[k];return c;}).sort((a,b)=>a.id.localeCompare(b.id))));}
const content=s=>canonical(s.elements);
const lib=s=>JSON.stringify(stable(s.library));
let browser,server,phase='startup',nativeDecision='dismiss';
async function snapshot(p,id){
 await p.mouse.move(1200,800);await p.waitForTimeout(300);
 const state=await p.evaluate(async()=>({elements:window.h.elements.filter(e=>!e.isDeleted),library:await window.h.app.library.getLatestLibrary(),selected:Object.keys(window.h.state.selectedElementIds).filter(k=>window.h.state.selectedElementIds[k]),undo:window.h.history.undoStack.length,redo:window.h.history.redoStack.length,storage:localStorage.getItem('excalidraw'),dialogs:[...document.querySelectorAll('[role="dialog"],[role="alertdialog"]')].map(n=>({text:n.textContent,buttons:[...n.querySelectorAll('button')].map(b=>b.textContent)}))}));
 const file=`CI-M15-M16_${id}_2026-11-12.png`;
 const bytes=await p.screenshot({path:path.join(out,file)});
 const result={id,at:new Date().toISOString(),...state,file,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};report.snapshots.push(result);save();return result;
}
async function newContext(){
 const c=await browser.newContext({viewport:{width:1366,height:900},locale:'en-US',colorScheme:'light'});c.setDefaultTimeout(10000);
 await c.addInitScript(()=>{delete window.showOpenFilePicker;});
 await c.route('**/*',r=>{const u=new URL(r.request().url());if(['localhost','127.0.0.1'].includes(u.hostname)||['data:','blob:'].includes(u.protocol))return r.continue();report.blocked.push({phase,url:u.origin+u.pathname});return r.abort();});
 c.on('page',p=>{
  p.on('pageerror',e=>{report.errors.push({phase,kind:'pageerror',message:String(e)});save();});
  p.on('crash',()=>{report.errors.push({phase,kind:'crash'});save();});
  p.on('dialog',async d=>{report.nativeDialogs.push({phase,type:d.type(),message:d.message(),decision:nativeDecision});save();await(nativeDecision==='accept'?d.accept():d.dismiss());});
 });return c;
}
async function open(c){const p=await c.newPage();await p.goto('http://127.0.0.1:3021/');await p.waitForFunction(()=>window.h?.app&&!window.h.state.isLoading);await p.evaluate(()=>document.fonts.ready);return p;}
async function shape(p,key,x,y,w=160,h=100){await p.keyboard.press(key);await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+w,y+h,{steps:12});await p.mouse.up();await p.keyboard.press('v');}
async function text(p,value,x=470,y=440){await p.keyboard.press('t');await p.mouse.click(x,y);await p.locator('textarea').fill(value);await p.keyboard.press('Escape');}
async function scene(p){await shape(p,'r',450,300);await text(p,'CENA-FICTICIA-CI71');}
async function addLibrary(p,x,y){await p.mouse.click(x,y,{button:'right'});await p.getByText('Add to library',{exact:true}).click();await p.keyboard.press('Escape');}
async function libraryScene(p){
 await scene(p);await p.keyboard.press('Control+a');await addLibrary(p,450,350);
 await shape(p,'e',750,500,120,80);await addLibrary(p,810,500);
 await p.waitForFunction(async()=>(await window.h.app.library.getLatestLibrary()).length===2);
 await p.keyboard.press('0');await p.locator('.library-unit__active').first().waitFor();
}
async function clearCanvas(p){await p.locator('.main-menu-trigger').click();await p.getByTestId('clear-canvas-button').click();}
async function libraryDelete(p,selected){
 if(selected)await p.locator('.library-unit__active .library-unit__dragger').first().click({modifiers:['Shift']});
 await p.locator('.library-menu-dropdown-container [data-testid="dropdown-menu-button"]').click();
 await p.getByText(selected?'Remove':'Reset library',{exact:true}).click();
}
async function confirmCase(id,name,prepare,trigger,target,expected){
 phase=id;const c=await newContext();const p=await open(c);const a={id,name,status:'collecting'};report.actions.push(a);save();
 try{
  await prepare(p);a.before=(await snapshot(p,`${id}_antes`)).id;
  nativeDecision='dismiss';await trigger(p);const dialog=await snapshot(p,`${id}_confirmacao-cancelar`);a.firstPrompt=dialog.id;
  if(!dialog.dialogs.length)throw Error('Confirmação DOM esperada não encontrada; caso requer inspeção antes de classificar');
  a.confirmationText=dialog.dialogs;a.confirmation=true;a.preventive=target(dialog)===target(report.snapshots.find(s=>s.id===a.before));
  await p.getByRole('button',{name:'Cancel',exact:true}).click();const canceled=await snapshot(p,`${id}_cancelado`);a.canceled=canceled.id;
  a.cancelPreserved=target(canceled)===target(report.snapshots.find(s=>s.id===a.before));
  nativeDecision='accept';await trigger(p);a.secondPrompt=(await snapshot(p,`${id}_confirmacao-executar`)).id;
  await p.getByRole('button',{name:'Confirm',exact:true}).click();const after=await snapshot(p,`${id}_executado`);a.after=after.id;a.effect=expected(after);
  await p.keyboard.press('Control+z');const undone=await snapshot(p,`${id}_apos-desfazer`);a.undo=undone.id;
  a.recoverable=target(undone)===target(report.snapshots.find(s=>s.id===a.before));a.status='complete';save();console.log(JSON.stringify(a));
 }catch(e){a.status='automation-error';a.error=String(e);a.dom=await p.locator('body').innerText();await snapshot(p,`${id}_erro`);throw e;}finally{await c.close();save();}
}
async function autosave(p,id){
 const started=Date.now();await p.waitForFunction(()=>{
  const norm=v=>Array.isArray(v)?v.map(norm):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,norm(v[k])])):v;
  const canon=es=>JSON.stringify(norm(es.filter(e=>!e.isDeleted).map(e=>{const c={...e,boundElements:e.boundElements||[]};for(const k of ['version','versionNonce','updated'])delete c[k];return c;}).sort((a,b)=>a.id.localeCompare(b.id))));
  const stored=localStorage.getItem('excalidraw');return stored&&canon(JSON.parse(stored))===canon(window.h.elements);
 },null,{polling:100,timeout:10000});
 const wait={id,started:new Date(started).toISOString(),completed:new Date().toISOString(),elapsedMs:Date.now()-started,pollingMs:100,timeoutMs:10000,condition:'conteudo localStorage.excalidraw igual ao conteudo vivo atual na projecao canonica'};
 report.persistence.waits.push(wait);save();
}
(async()=>{try{
 process.chdir(path.join(source,'excalidraw-app'));const {createServer}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')).href);
 server=await createServer({root:process.cwd(),server:{host:'127.0.0.1',port:3021,strictPort:true,open:false}});await server.listen();report.server={root:server.config.root,configFile:server.config.configFile,url:'http://127.0.0.1:3021/',ownedByCollector:true};
 browser=await req('playwright').chromium.launch({channel:'msedge',headless:true});report.browser=browser.version();save();
 phase='fixture';const fc=await newContext();const fp=await open(fc);await shape(fp,'e',500,350);await text(fp,'ARQUIVO-FICTICIO-CI71');
 const fixture=await fp.evaluate(()=>({type:'excalidraw',version:2,source:'CI71-fixture-local',elements:window.h.elements.filter(e=>!e.isDeleted),appState:{viewBackgroundColor:'#ffffff'},files:{}}));
 const fixturePath=path.join(out,'CI-M15_cena-importada_2026-11-12.excalidraw');fs.writeFileSync(fixturePath,JSON.stringify(fixture,null,2));report.fixture={file:path.basename(fixturePath),elements:fixture.elements};await snapshot(fp,'fixture');await fc.close();
 await confirmCase('D01','Limpar canvas',scene,clearCanvas,content,s=>s.elements.length===0);
 phase='D02';const oc=await newContext();const op=await open(oc);const a={id:'D02',name:'Abrir arquivo sobre cena existente',status:'collecting'};report.actions.push(a);
 try{
  await scene(op);const before=await snapshot(op,'D02_antes');a.before=before.id;
  const chooserPromise=op.waitForEvent('filechooser');await op.keyboard.press('Control+o');const chooser=await chooserPromise;await chooser.setFiles(fixturePath);
  await op.waitForFunction(ids=>ids.every(id=>window.h.elements.some(e=>e.id===id&&!e.isDeleted))||!!document.querySelector('[role="dialog"]'),fixture.elements.map(e=>e.id));
  const after=await snapshot(op,'D02_apos-abertura');a.after=after.id;a.confirmation=after.dialogs.length>0||report.nativeDialogs.some(d=>d.phase==='D02');
  a.effect=content(after)===canonical(fixture.elements)&&before.elements.every(e=>!after.elements.some(n=>n.id===e.id));
  await op.keyboard.press('Control+z');const undo=await snapshot(op,'D02_apos-desfazer');a.undo=undo.id;a.recoverable=content(undo)===content(before);a.status='complete';save();console.log(JSON.stringify(a));
 }catch(e){a.status='automation-error';a.error=String(e);a.dom=await op.locator('body').innerText();await snapshot(op,'D02_erro');throw e;}finally{await oc.close();save();}
 await confirmCase('D03','Remover item selecionado da biblioteca',libraryScene,p=>libraryDelete(p,true),lib,s=>s.library.length===1);
 await confirmCase('D04','Limpar toda a biblioteca',libraryScene,p=>libraryDelete(p,false),lib,s=>s.library.length===0);
 phase='P16';report.persistence={waits:[],manualSave:false,status:'collecting'};const pc=await newContext();let p=await open(pc);
 try{
  await scene(p);await shape(p,'e',760,500,120,80);await p.locator('[data-top-pick-index="1"]').first().click();report.persistence.lastCreationCompleted=new Date().toISOString();
  await autosave(p,'antes-reload');const before=await snapshot(p,'P16_antes-reload');report.persistence.before=before.id;
  await p.reload();await p.waitForFunction(()=>window.h?.app&&!window.h.state.isLoading);await p.evaluate(()=>document.fonts.ready);
  const reloaded=await snapshot(p,'P16_apos-reload');report.persistence.reload=reloaded.id;report.persistence.reloadEqual=content(before)===content(reloaded);
  await autosave(p,'antes-fechar');const preclose=await snapshot(p,'P16_antes-fechar');report.persistence.preclose=preclose.id;
  await p.close();report.persistence.tabClosedAt=new Date().toISOString();p=await open(pc);
  const reopened=await snapshot(p,'P16_aba-reaberta');report.persistence.reopened=reopened.id;report.persistence.reopenEqual=content(preclose)===content(reopened);report.persistence.sameContext=true;report.persistence.browserRestartTested=false;report.persistence.status='complete';
 }finally{await pc.close();save();}
 if(report.errors.length)throw Error('Erros de página/crash capturados');
 if(report.actions.some(a=>a.status!=='complete'||!a.effect||a.confirmation&&(!a.preventive||!a.cancelPreserved)))throw Error('Execução ou controle de confirmação incompleto');
 report.status='complete';console.log(JSON.stringify(report.persistence));
}catch(e){report.status='incomplete';report.failure=String(e);process.exitCode=1;console.error(e);}
finally{report.finished=new Date().toISOString();save();await browser?.close();await server?.close();}
})();
