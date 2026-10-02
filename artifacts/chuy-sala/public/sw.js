/* Only public map assets are cached; documents, APIs and credentials are excluded. */
const CACHE_PREFIX='map-pwa-v1';
const CACHE=`${CACHE_PREFIX}-tiles`;
const MAX_BYTES=32*1024*1024,MAX_ENTRIES=240,MAX_ENTRY=1024*1024;
let writes=Promise.resolve(),index=null,pendingWrites=0;
function policy(url){
 const u=new URL(url),day=86400000;
 if(u.username||u.password||(u.protocol!=='https:'&&u.origin!==self.location.origin))return null;
 if(u.origin===self.location.origin&&/^\/data\/render\/[a-z0-9-]+\.geojson$/.test(u.pathname))return {ttl:day,webp:false};
 if(u.hostname==='elevation-tiles-prod.s3.amazonaws.com'&&/^\/terrarium\/\d+\/\d+\/\d+\.png$/.test(u.pathname))return {ttl:30*day,webp:false};
 if(u.hostname==='tiles.openfreemap.org'){
  if(u.pathname==='/planet/latest')return {ttl:3600000,webp:false};
  if(/^\/planet\/[^/]+\/\d+\/\d+\/\d+\.pbf$/.test(u.pathname)||u.pathname.startsWith('/fonts/'))return {ttl:30*day,webp:false};
 }
 if(u.hostname==='gibs.earthdata.nasa.gov'&&u.pathname.startsWith('/wmts/')&&u.pathname.endsWith('.jpeg'))return {ttl:30*day,webp:true};
 return null;
}
async function loadIndex(cache){
 if(index)return index;
 const keys=await cache.keys(),entries=await Promise.all(keys.map(async key=>{const r=await cache.match(key);return [key.url,Number(r?.headers.get('X-Earth-Bytes')||0)];}));
 index=new Map(entries);return index;
}
async function store(cache,request,response,options){
 if(!response.ok||response.type==='opaque'||/no-store|private/i.test(response.headers.get('Cache-Control')||''))return;
 let blob=await response.blob();if(blob.size>MAX_ENTRY)return;
 const headers=new Headers(response.headers);
 // Encoding happens asynchronously in this SW, never on the page thread.
 // Never transcode RGB-encoded DEMs. Prefer WebP only when it is smaller.
 if(options.webp&&typeof OffscreenCanvas!=='undefined'&&typeof createImageBitmap==='function'){
  let bitmap;
  try{bitmap=await createImageBitmap(blob);const canvas=new OffscreenCanvas(bitmap.width,bitmap.height),ctx=canvas.getContext('2d');if(ctx){ctx.drawImage(bitmap,0,0);const webp=await canvas.convertToBlob({type:'image/webp',quality:.82});if(webp.type==='image/webp'&&webp.size<blob.size){blob=webp;headers.set('Content-Type','image/webp');}}}catch{}finally{bitmap?.close();}
 }
 headers.delete('Content-Encoding');headers.delete('Content-Length');headers.delete('ETag');
 headers.set('X-Earth-Cached',String(Date.now()));headers.set('X-Earth-Bytes',String(blob.size));
 const entries=await loadIndex(cache);let total=[...entries.values()].reduce((a,b)=>a+b,0)-(entries.get(request.url)||0);
 entries.delete(request.url);
 while(entries.size>=MAX_ENTRIES||total+blob.size>MAX_BYTES){const oldest=entries.keys().next().value;if(!oldest)break;total-=entries.get(oldest);entries.delete(oldest);await cache.delete(oldest);}
 await cache.put(request,new Response(blob,{status:response.status,statusText:response.statusText,headers}));entries.set(request.url,blob.size);
}
async function cached(event,options){
 const request=event.request;let cache,stale;
 try{
  cache=await caches.open(CACHE);const hit=await cache.match(request);
  stale=hit;
  if(hit&&Date.now()-Number(hit.headers.get('X-Earth-Cached')||0)<options.ttl)return hit;
 }catch{}
 let response;try{response=await fetch(request);}catch(error){if(stale)return stale;throw error;}
 if(!response.ok&&stale)return stale;
 if(cache&&response.ok&&pendingWrites<4){pendingWrites++;const copy=response.clone();writes=writes.catch(()=>{}).then(()=>store(cache,request,copy,options)).finally(()=>pendingWrites--);event.waitUntil(writes.catch(()=>{}));}
 return response;
}
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const name of await caches.keys())if((name.startsWith('map-pwa-')||name.startsWith('cambodia-earth-map-'))&&name!==CACHE)await caches.delete(name);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||event.request.headers.has('Authorization'))return;
 const options=policy(event.request.url);if(options)event.respondWith(cached(event,options));
});
