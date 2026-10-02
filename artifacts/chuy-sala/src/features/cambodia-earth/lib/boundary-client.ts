import type { Coordinate, RegionFeature } from './geography';
interface RegionResult {feature:RegionFeature;bounds:[Coordinate,Coordinate]}
interface InspectionResult {inside:boolean;province:string|null}
export class BoundaryClient {
 private worker:Worker|null=null;
 private closed=false;
 private regions=new Map<string,Promise<RegionResult>>();
 private sequence=0;
 private pending=new Map<number,{resolve:(value:unknown)=>void;reject:(error:Error)=>void;timer:ReturnType<typeof setTimeout>}>();
 private getWorker(){
  if(this.closed)throw new Error('Geography worker closed');
  if(this.worker)return this.worker;
  let worker:Worker;
  try{worker=new Worker('/workers/boundaries.js',{type:'module',name:'earth-geography'});}
  catch(error){console.error('[Cambodia Earth] Geography worker could not start',error);throw error;}
  worker.onmessage=({data})=>{const request=this.pending.get(data.id);if(!request)return;clearTimeout(request.timer);this.pending.delete(data.id);if(data.error)request.reject(new Error(data.error));else request.resolve(data.result);};
  worker.onerror=event=>{console.error('[Cambodia Earth] Geography worker failed',event.message,event);this.fail(new Error('Geography worker unavailable'));worker.terminate();if(this.worker===worker)this.worker=null;};
  this.worker=worker;return worker;
 }
 private request<T>(type:string,payload:object):Promise<T>{
  return new Promise((resolve,reject)=>{
   const worker=this.getWorker();
   const id=++this.sequence,timer=setTimeout(()=>{this.pending.delete(id);reject(new Error('Geographic query timed out'));},25000);
   this.pending.set(id,{resolve:value=>resolve(value as T),reject,timer});worker.postMessage({id,type,...payload});
  });
 }
 inspect(coordinate:Coordinate){return this.request<InspectionResult>('inspect',{coordinate});}
 region(name:string){let pending=this.regions.get(name);if(!pending){pending=this.request<RegionResult>('region',{name}).finally(()=>this.regions.delete(name));this.regions.set(name,pending);}return pending;}
 private fail(error:Error){for(const request of this.pending.values()){clearTimeout(request.timer);request.reject(error);}this.pending.clear();}
 destroy(){this.closed=true;this.fail(new Error('Geography worker closed'));this.worker?.terminate();this.worker=null;this.regions.clear();}
}
