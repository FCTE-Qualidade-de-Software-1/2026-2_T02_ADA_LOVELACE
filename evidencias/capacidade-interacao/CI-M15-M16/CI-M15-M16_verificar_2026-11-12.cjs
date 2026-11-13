// Verificação somente leitura: node este-script.cjs [diretorio-da-tentativa]
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const dir=path.resolve(process.argv[2]||path.join(__dirname,'tentativa-03'));
const r=JSON.parse(fs.readFileSync(path.join(dir,'dados.json'),'utf8'));
const stable=v=>Array.isArray(v)?v.map(stable):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,stable(v[k])])):v;
const same=(a,b)=>JSON.stringify(stable(a))===JSON.stringify(stable(b));
const canonical=es=>stable(es.filter(e=>!e.isDeleted).map(e=>{const c={...e,boundElements:e.boundElements||[]};for(const k of ['version','versionNonce','updated'])delete c[k];return c;}).sort((a,b)=>a.id.localeCompare(b.id)));
const content=s=>canonical(s.elements),lib=s=>s.library;
const snaps=new Map(r.snapshots.map(s=>[s.id,s]));
const get=id=>{assert.ok(snaps.has(id),id);return snaps.get(id);};
assert.equal(r.status,'complete');assert.equal(r.sha,'e7b534668a60add7f725531f3c9abf32508c7b4e');
assert.equal(r.server.ownedByCollector,true);assert.equal(r.errors.length,0);assert.equal(r.snapshots.length,26);assert.equal(snaps.size,26);
assert.equal(r.actions.length,4);assert.equal(r.nativeDialogs.length,0);
for(const s of r.snapshots){
 assert.equal(path.basename(s.file),s.file);assert.ok(s.at);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,s.file))).digest('hex'),s.sha256);
 assert.equal(new Set(s.elements.map(e=>e.id)).size,s.elements.length);
}
function diffs(a,b){
 const result=[];const bm=new Map(b.map(e=>[e.id,e]));
 for(const e of a){const n=bm.get(e.id);if(!n){result.push({id:e.id,missing:true});continue;}
  for(const k of new Set([...Object.keys(e),...Object.keys(n)]))if(!same(e[k],n[k]))result.push({id:e.id,field:k,before:e[k],after:n[k]});
 }
 for(const n of b)if(!a.some(e=>e.id===n.id))result.push({id:n.id,added:true});return result;
}
let noConfirmation=0;
r.actions.forEach((a,i)=>{
 assert.equal(a.id,`D0${i+1}`);assert.equal(a.status,'complete');
 const before=get(a.before),after=get(a.after),undo=get(a.undo),project=i<2?content:lib;
 assert.ok(before.elements.some(e=>e.text==='CENA-FICTICIA-CI71'));
 if(a.confirmation){
  const first=get(a.firstPrompt),second=get(a.secondPrompt),canceled=get(a.canceled);
  assert.ok(first.dialogs.length&&second.dialogs.length);
  assert.ok(first.dialogs.some(d=>d.buttons.includes('Cancel')&&d.buttons.includes('Confirm')));
  assert.ok(second.dialogs.some(d=>d.buttons.includes('Cancel')&&d.buttons.includes('Confirm')));
  assert.ok(same(project(before),project(first)));assert.ok(same(project(before),project(second)));
  assert.ok(same(project(before),project(canceled)));assert.equal(a.preventive,true);assert.equal(a.cancelPreserved,true);
 }else{assert.equal(after.dialogs.length,0);assert.equal(a.id,'D02');noConfirmation++;}
 if(a.id==='D01'){assert.equal(before.elements.length,2);assert.equal(after.elements.length,0);}
 if(a.id==='D02'){
  assert.equal(before.elements.length,2);assert.equal(after.elements.length,2);assert.ok(same(content(after),canonical(r.fixture.elements)));
  assert.ok(before.elements.every(e=>!after.elements.some(n=>n.id===e.id)));
  const visual=es=>es.map(({version,versionNonce,updated,index,...e})=>({...e,boundElements:e.boundElements||[]}));
  console.log('D02: diferenças completas após desfazer: '+JSON.stringify(diffs(before.elements,undo.elements)));
  console.log('D02: elementos e ordem do array preservados, exceto metadados/index: '+same(visual(before.elements),visual(undo.elements)));
 }
 if(a.id==='D03'){
  assert.equal(before.library.length,2);assert.equal(after.library.length,1);
  assert.ok(after.library.every(item=>before.library.some(old=>same(old,item))));
 }
 if(a.id==='D04'){assert.equal(before.library.length,2);assert.equal(after.library.length,0);}
 assert.equal(a.effect,true);assert.equal(a.recoverable,same(project(before),project(undo)));
 console.log(`${a.id}: execução confirmada; confirmação=${a.confirmation}; recuperação estrita por Ctrl+Z=${a.recoverable}`);
});
const p=r.persistence;assert.equal(p.status,'complete');assert.equal(p.manualSave,false);assert.equal(p.sameContext,true);assert.equal(p.browserRestartTested,false);
const before=get(p.before),reload=get(p.reload),preclose=get(p.preclose),reopened=get(p.reopened);
assert.equal(before.elements.length,3);assert.ok(['rectangle','ellipse','text'].every(type=>before.elements.some(e=>e.type===type)));
assert.ok(before.elements.some(e=>e.text==='CENA-FICTICIA-CI71'));assert.ok(before.elements.some(e=>e.strokeColor==='#e03131'));
for(const s of [before,preclose])assert.ok(same(canonical(JSON.parse(s.storage)),content(s)));
assert.ok(same(content(before),content(preclose)));
assert.equal(p.reloadEqual,same(content(before),content(reload)));assert.equal(p.reopenEqual,same(content(preclose),content(reopened)));
assert.equal(p.waits.length,2);for(const w of p.waits){assert.equal(w.pollingMs,100);assert.equal(w.timeoutMs,10000);assert.ok(w.elapsedMs>=0);}
console.log('CI-M16 diferenças completas após reload: '+JSON.stringify(diffs(before.elements,reload.elements)));
console.log('CI-M16 diferenças completas após reabrir: '+JSON.stringify(diffs(preclose.elements,reopened.elements)));
const loss=!p.reloadEqual||!p.reopenEqual;
console.log(`CI-M15: ${noConfirmation} de 4 tipos sem confirmação; nota ${noConfirmation===0?2:noConfirmation<=2?1:0}/2.`);
console.log(`CI-M16: reload=${p.reloadEqual}; reabertura=${p.reopenEqual}; perda=${loss?'Sim':'Não'}; nota ${loss?0:2}/2.`);
console.log(`26 estados/capturas com hashes válidos; erros de página/crash=${r.errors.length}; requisições externas bloqueadas=${r.blocked.length}.`);
