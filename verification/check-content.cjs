const fs=require('node:fs'),cp=require('node:child_process'),assert=require('node:assert/strict'),ts=require('typescript');
const baseline='2c7da36df9f9748ba2aea71edb5d9fb3c693107c';
const source='artifacts/chuy-sala/src/';
const before=p=>cp.execFileSync('git',['show',`${baseline}:${source+p}`],{encoding:'utf8'});
const after=p=>fs.readFileSync(source+p,'utf8');
const routes=s=>new Set([...s.matchAll(/<Route\s+path="([^"]+)"/g)].map(m=>m[1]));
const removed=new Set(['/map','/school/:id','/school-inbox','/needs','/projects','/submit-need','/charities','/admin','/admin/dashboard','/alumni','/submit-story']);
const old=routes(before('App.tsx')),now=routes(after('App.tsx'));
assert.deepEqual([...now].sort(),[...old].filter(p=>!removed.has(p)).sort());
function initializer(s,name){const file=ts.createSourceFile('source.tsx',s,99,true,4);for(const n of file.statements)if(ts.isVariableStatement(n))for(const d of n.declarationList.declarations)if(d.name.getText(file)===name)return d.initializer.getText(file);throw new Error(`Missing lesson data: ${name}`)}
function tokens(s){const scanner=ts.createScanner(99,true,ts.LanguageVariant.JSX,s),out=[];while(scanner.scan()!==ts.SyntaxKind.EndOfFileToken)out.push(scanner.getTokenText());return out;}
for(const [file,names] of [
 ['components/EulersFormula.tsx',['SHAPE_DATA']],['components/SolarSystem3D.tsx',['PLANETS']],['pages/VseprTheoryPage.tsx',['MOLECULES']],['components/world-history/HistoryGlobe.tsx',['CONTENT','ERAS','REGIONS']],['components/SymmetrySpinner.tsx',['FEEDBACK','IDLE_MESSAGE']]
])for(const name of names)assert.deepEqual(tokens(initializer(after(file),name)),tokens(initializer(before(file),name)),`${file}: ${name} changed`);
for(const file of ['components/GabrielsHorn.tsx','pages/TopologyPage.tsx']){
 function formulae(s){const f=ts.createSourceFile('s.tsx',s,99,true,4),values=[];function visit(n){if(ts.isJsxSelfClosingElement(n)&&['BlockMath','InlineMath'].includes(n.tagName.getText(f)))values.push(tokens(n.getText(f)));ts.forEachChild(n,visit)}visit(f);return values;}
 assert.deepEqual(formulae(after(file)),formulae(before(file)),`${file}: formula changes`);
}
console.log(`PASS: ${now.size} educational/student routes retained; only ${old.size-now.size} Map routes removed; bilingual lesson datasets and displayed formulas unchanged.`);
