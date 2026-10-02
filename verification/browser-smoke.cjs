const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=process.cwd(),kind=JSON.parse(fs.readFileSync('package.json')).name.includes('stem')?'stem':'map',out=path.join(root,'artifacts/chuy-sala/dist/public');
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.geojson':'application/geo+json','.woff2':'font/woff2','.woff':'font/woff','.webmanifest':'application/manifest+json'};
const schools=[{id:1,nameEn:'Verification School',nameKh:'សាលាសាកល្បង',province:'Kampot',district:'Kampot',latitude:10.61,longitude:104.18,hideFromMap:false,createdAt:new Date().toISOString(),studentCount:100}];
(async()=>{
 const server=http.createServer((req,res)=>{let file=path.join(out,decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(out)){res.writeHead(403);return res.end()}if(!fs.existsSync(file)||fs.statSync(file).isDirectory())file=path.join(out,'index.html');res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res)});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const port=server.address().port;
 const browser=await chromium.launch({...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),headless:true,args:['--no-sandbox','--no-zygote','--single-process','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}).catch(async error=>{await new Promise(resolve=>server.close(resolve));throw error});
 const context=await browser.newContext({viewport:{width:1365,height:900},reducedMotion:'reduce',serviceWorkers:'block'}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',route=>{const url=new URL(route.request().url());if(url.pathname==='/api/auth/me')return route.fulfill({status:401,json:{error:'Not authenticated'}});if(url.pathname==='/api/schools')return route.fulfill({json:schools});return route.fulfill({json:[]})});
 if(kind==='stem')await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(String(type).includes('webgl'))throw new Error('STEM requested WebGL');return original.call(this,type,...args)}});
 const target=path.join(root,'verification/screenshots');fs.mkdirSync(target,{recursive:true});
 try{
  await page.goto(`http://127.0.0.1:${port}/`,{waitUntil:'domcontentloaded'});
  if(kind==='stem'){
   await page.getByRole('heading',{name:/School Connect STEM/}).waitFor();assert(await page.getByRole('link',{name:'Digital Map',exact:true}).count()>0);
   assert(await page.getByRole('link',{name:/Open Dengue Triage Bot/}).count()>0);
   await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(target,'home.png')});
   for(const [route,selector] of [['/mathematics/topology','svg[aria-label*="Möbius"]'],['/chemistry/vsepr','svg[aria-label*="molecular geometry"]'],['/science/chemistry/inorganic/symmetry-group','svg[aria-label*="Square-planar"]'],['/technology/automotive','svg[aria-label*="Four-stroke"]'],['/world-history','svg[aria-label="World history map"]'],['/space','svg[aria-label*="Solar system orbital"]']]){
    await page.goto(`http://127.0.0.1:${port}${route}`,{waitUntil:'domcontentloaded'});const diagram=page.locator(selector);await diagram.waitFor();await diagram.scrollIntoViewIfNeeded();
    if(route.includes('topology')){assert.equal(await page.locator('svg[aria-label*="vertices"]').count(),1);assert.equal(await page.locator('svg[aria-label*="Klein bottle"]').count(),1);assert.equal(await page.locator('svg[aria-label*="Gabriel"]').count(),1);await page.getByLabel(/Stretch the loop/).focus();await page.keyboard.press('Home');}
    if(route.includes('vsepr')){await page.getByRole('button',{name:/H₂O/}).first().click();await page.locator('svg[aria-label="H₂O molecular geometry"]').waitFor()}
    if(route==='/space'){await page.locator('svg [role="button"][aria-label="Earth"]').click();assert(await page.getByText('Earth',{exact:true}).count()>0)}
    await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(target,route.split('/').pop()+'.png')});
   }
   await page.setViewportSize({width:390,height:844});await page.goto(`http://127.0.0.1:${port}/mathematics/topology`);await page.locator('svg[aria-label*="Möbius"]').waitFor();await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(target,'topology-mobile.png')});
   assert.equal(await page.locator('canvas').count(),0);
  }else{
   await page.getByRole('heading',{name:'School Directory',exact:true}).waitFor();await page.getByRole('link',{name:/Verification School/}).last().waitFor();assert(await page.getByRole('link',{name:/STEM Hub/}).count()>0);
   // Geodata workers are real; DEM imagery is a flat test fixture to make map startup deterministic.
   await page.route('https://elevation-tiles-prod.s3.amazonaws.com/**',route=>route.fulfill({contentType:'image/png',body:fs.readFileSync(path.join(__dirname,'flat-dem.png'))}));
   await page.reload({waitUntil:'domcontentloaded'});await page.locator('.map-school').waitFor({timeout:30000});assert.equal(await page.locator('.map-school').getAttribute('href'),'/school/1');
   await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(target,'earth.png')});
   await page.getByRole('button',{name:'ខ្មែរ',exact:true}).last().click();await page.locator('.map-school').filter({hasText:'សាលាសាកល្បង'}).waitFor();
   await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(target,'earth-mobile.png')});
   const worker=await context.request.get(`http://127.0.0.1:${port}/workers/boundaries.js`);assert.equal(worker.status(),200);assert.match(await worker.text(),/\.\/geography\.js/);
  }
  assert.deepEqual(errors,[]);console.log(`PASS: ${kind} browser smoke, bilingual controls, dedicated links and renderer screenshots; no uncaught page errors.`);
 }finally{await context.close();await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1});
