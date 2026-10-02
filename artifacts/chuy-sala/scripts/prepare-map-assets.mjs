import ts from 'typescript';
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
await mkdir('public/maplibre', { recursive: true });
for (const name of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  await copyFile(`node_modules/maplibre-gl/dist/${name}`, `public/maplibre/${name}`);
}
await copyFile('node_modules/maplibre-gl/LICENSE.txt', 'public/maplibre/LICENSE.txt');
console.log('Prepared local MapLibre worker modules.');

// Prepare small render-only GeoJSON; retain original licensed files unchanged.
await mkdir('public/data/render', { recursive: true });
let country;
for (const name of ['adm0','adm1']) {
 const original=JSON.parse(await readFile(`public/data/${name}.geojson`,'utf8'));
 const data={type:'FeatureCollection',features:original.features.map(f=>({...f,properties:{shapeName:f.properties.shapeName,shapeID:f.properties.shapeID}}))};
 await writeFile(`public/data/render/${name}.geojson`,JSON.stringify(data,(_key,value)=>typeof value==='number'?Math.round(value*1e6)/1e6:value));
 if(name==='adm0')country=data;
}
const holes=country.features.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates[0]]:f.geometry.coordinates.map(p=>p[0]));
await writeFile('public/data/render/mask.geojson',JSON.stringify({type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[101,9],[109,9],[109,16],[101,16],[101,9]],...holes]}},(_key,value)=>typeof value==='number'?Math.round(value*1e6)/1e6:value));
await mkdir('public/workers', {recursive:true});
for(const [source,output] of [['src/features/cambodia-earth/lib/geography.ts','geography'],['src/features/cambodia-earth/workers/boundaries.ts','boundaries']]){
 const input=await readFile(source,'utf8');
 const compiled=ts.transpileModule(input,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replace("'../lib/geography'","'./geography.js'");
 await writeFile(`public/workers/${output}.js`,compiled);
}
console.log('Prepared render boundaries and geography worker.');
