import type { Coordinate } from './geography';
import { DEM_URL } from './map-style';
export function terrainPixel([longitude,latitude]:Coordinate,zoom:number) {
 const scale=2**zoom,rad=latitude*Math.PI/180;
 const x=(longitude+180)/360*scale,y=(1-Math.asinh(Math.tan(rad))/Math.PI)/2*scale;
 return {z:zoom,x:Math.floor(x),y:Math.floor(y),px:Math.min(255,Math.floor((x-Math.floor(x))*256)),py:Math.min(255,Math.floor((y-Math.floor(y))*256))};
}
export function decodeTerrarium(red:number,green:number,blue:number){return red*256+green+blue/256-32768;}
// Bounded, on-click sampler: never infer sea level from a missing renderer tile.
export class ElevationSampler {
 private cache=new Map<string,HTMLImageElement>();
 async sample(coordinate:Coordinate,zoom:number,signal:AbortSignal):Promise<number> {
  const tile=terrainPixel(coordinate,zoom),key=`${tile.z}/${tile.x}/${tile.y}`;
  let image=this.cache.get(key);
  if(!image){
   const url=DEM_URL.replace('{z}',String(tile.z)).replace('{x}',String(tile.x)).replace('{y}',String(tile.y));
   const response=await fetch(url,{signal,credentials:'omit'});if(!response.ok)throw new Error('Elevation tile unavailable');
   const blob=await response.blob();if(signal.aborted)throw new Error('Cancelled');
   const objectUrl=URL.createObjectURL(blob);
   try{image=await new Promise<HTMLImageElement>((resolve,reject)=>{const element=new Image();element.onload=()=>resolve(element);element.onerror=()=>reject(new Error('Invalid elevation image'));element.src=objectUrl;});}finally{URL.revokeObjectURL(objectUrl);}
   if(signal.aborted)throw new Error('Cancelled');
   this.cache.set(key,image);if(this.cache.size>6)this.cache.delete(this.cache.keys().next().value!);
  }
  const canvas=document.createElement('canvas');canvas.width=1;canvas.height=1;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)throw new Error('Elevation decoding unavailable');
  ctx.drawImage(image,tile.px,tile.py,1,1,0,0,1,1);
  const pixel=ctx.getImageData(0,0,1,1).data;
  if(!pixel[3])throw new Error('No elevation data');
  return decodeTerrarium(pixel[0],pixel[1],pixel[2]);
 }
 clear(){this.cache.clear();}
}
