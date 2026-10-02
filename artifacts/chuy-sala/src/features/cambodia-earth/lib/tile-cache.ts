// Registration never blocks map startup. Unsupported/private/quota-limited
// browsers keep the normal HTTP loading path.
export function registerTileCache(){
 if(!('serviceWorker' in navigator)||!window.isSecureContext)return;
 try{void navigator.serviceWorker.register('/sw.js',{scope:'/',updateViaCache:'none'}).catch(error=>console.warn('[Cambodia Earth] Tile cache unavailable; using network',error));}
 catch(error){console.warn('[Cambodia Earth] Tile cache registration blocked; using network',error);}
}
