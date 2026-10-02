import type { LayerSpecification, SourceSpecification } from 'maplibre-gl';
import { cities } from '../data/cities';
import { distanceKm, type Coordinate } from './geography';

export const URBAN_TILEJSON='https://tiles.openfreemap.org/planet/latest';
export const URBAN_GLYPHS='https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf';
// Perspective camera distance to its ground target, derived from the documented
// vertical FOV and Web Mercator meters/pixel. Approximate, not aircraft altitude.
export function cameraGroundDistance(zoom:number,latitude:number,height:number,fov=36.87):number {
 const metersPerPixel=40075016.68557849*Math.cos(latitude*Math.PI/180)/(512*2**zoom);
 return metersPerPixel*height/(2*Math.tan(fov*Math.PI/360));
}
export function cityLOD(center:Coordinate,zoom:number,distance:number,active:string|null):string|null {
 const nearest=cities.map(city=>({city,distance:distanceKm(center,city.coordinate)})).sort((a,b)=>a.distance-b.distance)[0];
 if(!nearest)return null;
 // Separate enter/leave thresholds prevent source churn while hovering at the boundary.
 const staying=nearest.city.id===active;
 return zoom>=(staying?11.6:12.2)&&distance<=(staying?11000:8000)&&nearest.distance<=nearest.city.radiusKm*(staying?1.25:1)?nearest.city.id:null;
}
export function urbanSource():SourceSpecification {
 return {type:'vector',url:URBAN_TILEJSON,bounds:[102.3,9.9,107.65,14.7],attribution:'<a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> · <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>'};
}
export function urbanLayers(night:boolean,lowData:boolean,labels:boolean):LayerSpecification[] {
 const road=night?'#ddb875':'#f5e9ca',casing=night?'#5d665e':'#9d907b';
 const base={source:'urban',minzoom:11.6};
 const layers:LayerSpecification[]=[
  {id:'urban-landuse',type:'fill',...base,'source-layer':'landuse',paint:{'fill-color':['match',['get','class'],'residential',night?'#243a46':'#bfc6bb','commercial',night?'#334051':'#d6c7b3','industrial',night?'#39434a':'#c0bab1','hospital',night?'#343d4c':'#d6c0b9','school',night?'#3f4051':'#ded1b4',night?'#2c4743':'#b1c49b'],'fill-opacity':0.92}},
  {id:'urban-water',type:'fill',...base,'source-layer':'water',paint:{'fill-color':night?'#142c44':'#538895','fill-opacity':0.97}},
  {id:'urban-waterway',type:'line',...base,'source-layer':'waterway',paint:{'line-color':night?'#294860':'#538895','line-width':['interpolate',['linear'],['zoom'],12,1,18,7]}},
  {id:'urban-road-casing',type:'line',...base,'source-layer':'transportation',filter:['!=',['get','class'],'rail'],layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':casing,'line-width':['interpolate',['linear'],['zoom'],12,['match',['get','class'],['motorway','trunk'],3,['primary','secondary'],2,1],16,['match',['get','class'],['motorway','trunk'],11,['primary','secondary'],8,5],19,['match',['get','class'],['motorway','trunk'],23,['primary','secondary'],18,11]]}},
  {id:'urban-roads',type:'line',...base,'source-layer':'transportation',filter:['!=',['get','class'],'rail'],layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':['match',['get','class'],['motorway','trunk'],night?'#e6bc70':'#ffda98',road],'line-width':['interpolate',['linear'],['zoom'],12,['match',['get','class'],['motorway','trunk'],1.8,['primary','secondary'],1.2,0.6],16,['match',['get','class'],['motorway','trunk'],8,['primary','secondary'],5,2.5],19,['match',['get','class'],['motorway','trunk'],19,['primary','secondary'],14,8]]}},
  {id:'urban-building-footprints',type:'fill',source:'urban','source-layer':'building',minzoom:13,paint:{'fill-color':night?'#727b91':'#a9a28e','fill-outline-color':night?'#a5a2a0':'#716e60','fill-opacity':0.85}},
  {id:'urban-buildings',type:'fill-extrusion',source:'urban','source-layer':'building',minzoom:14,filter:['!=',['get','hide_3d'],true],layout:{visibility:lowData?'none':'visible'},paint:{'fill-extrusion-color':night?'#688399':'#c3c4b1','fill-extrusion-height':['interpolate',['linear'],['zoom'],14,0,14.8,['min',300,['max',3,['coalesce',['get','render_height'],8]]]],'fill-extrusion-base':['interpolate',['linear'],['zoom'],14,0,14.8,['max',0,['coalesce',['get','render_min_height'],0]]],'fill-extrusion-opacity':0.93,'fill-extrusion-vertical-gradient':true}},
  {id:'urban-street-labels',type:'symbol',source:'urban','source-layer':'transportation_name',minzoom:14,layout:{visibility:labels?'visible':'none','symbol-placement':'line','text-field':['coalesce',['get','name:latin'],['get','name:en'],['get','name'],''],'text-font':['Noto Sans Regular'],'text-size':12,'text-max-angle':30,'symbol-spacing':350},paint:{'text-color':night?'#f2e7ce':'#263d35','text-halo-color':night?'#17313b':'#edf0de','text-halo-width':1.5}},
 ];
 return layers;
}
export const URBAN_LAYER_IDS=urbanLayers(false,false,true).map(layer=>layer.id);
