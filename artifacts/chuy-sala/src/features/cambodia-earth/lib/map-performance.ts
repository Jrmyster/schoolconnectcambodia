import type { Map as LibreMap } from 'maplibre-gl';
export interface MovementSample { frames:number; averageFPS:number; p95FrameMs:number; overBudgetFrames:number; zoom:number; jsHeapBytes:number|null; }
export function summarizeFrames(intervals:number[]){
 if(!intervals.length)return null;
 const sorted=[...intervals].sort((a,b)=>a-b);
 return {frames:intervals.length,averageFPS:1000/(intervals.reduce((a,b)=>a+b,0)/intervals.length),p95FrameMs:sorted[Math.min(sorted.length-1,Math.ceil(sorted.length*.95)-1)],overBudgetFrames:intervals.filter(ms=>ms>20).length};
}
export function monitorMap(map:LibreMap){
 // Opt-in to avoid a telemetry callback on every frame for normal learners.
 // Nothing is uploaded. Read window.__cambodiaEarthPerformance in DevTools.
 if(!new URLSearchParams(location.search).has('perf'))return ()=>{};
 const heap=()=>((performance as Performance&{memory?:{usedJSHeapSize:number}}).memory?.usedJSHeapSize??null);
 const record={styleReadyMs:null as number|null,firstIdleMs:null as number|null,initialJSHeapBytes:heap(),movements:[] as MovementSample[]};
 (window as unknown as {__cambodiaEarthPerformance:typeof record}).__cambodiaEarthPerformance=record;
 let intervals:number[]=[],last:number|null=null;
 const start=()=>{intervals=[];last=null;};
 const render=()=>{if(document.hidden||!map.isMoving()){last=null;return;}const now=performance.now();if(last!==null&&intervals.length<1200)intervals.push(now-last);last=now;};
 const end=()=>{const summary=summarizeFrames(intervals);if(summary){record.movements.push({...summary,zoom:map.getZoom(),jsHeapBytes:heap()});if(record.movements.length>20)record.movements.shift();}last=null;};
 const style=()=>{record.styleReadyMs??=performance.now();};
 const idle=()=>{record.firstIdleMs??=performance.now();};
 map.on('movestart',start);map.on('render',render);map.on('moveend',end);map.once('style.load',style);map.once('idle',idle);
 return ()=>{map.off('movestart',start);map.off('render',render);map.off('moveend',end);map.off('style.load',style);map.off('idle',idle);};
}
