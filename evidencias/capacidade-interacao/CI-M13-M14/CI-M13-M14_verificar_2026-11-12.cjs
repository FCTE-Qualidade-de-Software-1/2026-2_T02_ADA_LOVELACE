// Recalcula comparações e hashes; não abre navegador nem modifica a coleta.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const dir=path.resolve(process.argv[2]||path.join(__dirname,'tentativa-04'));
const r=JSON.parse(fs.readFileSync(path.join(dir,'dados.json')));
assert.equal(r.sha,'e7b534668a60add7f725531f3c9abf32508c7b4e');
assert.equal(r.status,'complete');assert.equal(r.cases.length,13);assert.equal(r.errors.length,0);
assert.equal(r.server.ownedByCollector,true);assert.equal(r.waitMs,300);
const projection=(s,id)=>JSON.stringify({elements:s.elements,...(id==='A02'?{selected:s.selected}:{}),...(id==='A12'?{theme:s.theme}:{}),...(id==='A13'?{zoom:s.zoom}:{})});
let feedback=0,recoverable=0;
const expected=[
 (a,b)=>!a.elements.length&&b.elements.length===1&&b.elements[0].type==='rectangle'&&b.elements[0].width===160&&b.elements[0].height===100,
 (a,b)=>!a.selected.length&&b.selected.length===1&&JSON.stringify(a.elements)===JSON.stringify(b.elements),
 (a,b)=>b.elements[0].x===a.elements[0].x+80&&b.elements[0].y===a.elements[0].y+60,
 (a,b)=>b.elements[0].width>a.elements[0].width&&b.elements[0].height>a.elements[0].height,
 (a,b)=>a.elements[0].strokeColor!==b.elements[0].strokeColor&&b.elements[0].strokeColor==='#e03131',
 (a,b)=>!a.elements.length&&b.elements.length===1&&b.elements[0].text==='Cena ficticia CI70',
 (a,b)=>a.elements[0].text==='Cena ficticia CI70'&&b.elements[0].text==='Texto editado CI70',
 (a,b)=>a.elements.length===1&&b.elements.length===2&&new Set(b.elements.map(e=>e.id)).size===2,
 (a,b)=>a.elements.length===1&&!b.elements.length,
 (a,b)=>a.elements.length===2&&a.elements.every(e=>!e.groupIds.length)&&b.elements.length===2&&b.elements.every(e=>e.groupIds.length===1)&&b.elements[0].groupIds[0]===b.elements[1].groupIds[0],
 (a,b)=>a.elements.length===2&&a.elements.every(e=>e.groupIds.length===1)&&b.elements.length===2&&b.elements.every(e=>!e.groupIds.length),
 (a,b)=>a.theme==='light'&&b.theme==='dark'&&JSON.stringify(a.elements)===JSON.stringify(b.elements),
 (a,b)=>a.zoom===1&&b.zoom===1.1&&JSON.stringify(a.elements)===JSON.stringify(b.elements)
];
r.cases.forEach((c,i)=>{
 assert.equal(c.id,`A${String(i+1).padStart(2,'0')}`);assert.equal(c.status,'complete');
 for(const stage of ['before','after','undo','redo']){
  const s=c[stage];assert.ok(s&&s.at);assert.equal(path.basename(s.file),s.file);
  const hash=crypto.createHash('sha256').update(fs.readFileSync(path.join(dir,s.file))).digest('hex');assert.equal(hash,s.sha256);
  assert.equal(new Set(s.elements.map(e=>e.id)).size,s.elements.length);
 }
 const effect=expected[i](c.before,c.after);
 assert.equal(c.expectedEffect,effect);assert.equal(c.visualChanged,c.before.sha256!==c.after.sha256);
 const f=effect&&c.visualChanged,u=projection(c.undo,c.id)===projection(c.before,c.id),v=projection(c.redo,c.id)===projection(c.after,c.id);
 assert.equal(c.feedback,f);assert.equal(c.undoRestored,u);assert.equal(c.redoRestored,v);assert.equal(c.recoverable,effect&&u&&v);
 assert.equal(c.historyEntry,c.after.undo>c.before.undo);
 feedback+=+f;recoverable+=+(effect&&u&&v);
 console.log(`${c.id}: feedback=${f}; desfazer=${u}; refazer=${v}; entradaHistorico=${c.historyEntry}`);
});
const score=p=>p===100?2:p>=90?1:0;
console.log(`CI-M13: ${feedback}/13 = ${(feedback/13*100).toFixed(2)}%; nota ${score(feedback/13*100)}`);
console.log(`CI-M14: ${recoverable}/13 = ${(recoverable/13*100).toFixed(2)}%; nota ${score(recoverable/13*100)}`);
console.log('13 ações, 52 estados/capturas e hashes íntegros; nenhuma falha de página capturada.');
