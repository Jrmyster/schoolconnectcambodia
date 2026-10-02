import type { StyleSpecification } from 'maplibre-gl';
import type { Regions } from './geography';
import { cities } from '../data/cities';
import { URBAN_GLYPHS } from './urban';
import { outsideMask } from './geography';
export const DEM_URL='https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png';
export const IMAGERY_URL='https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg';
export const CAMBODIA_BOUNDS:[[number,number],[number,number]]=[[102.3,9.9],[107.65,14.7]];
export function createMapStyle(country:Regions|string,regions:Regions|string,lowData:boolean,mask?:string):StyleSpecification {
 return {
  version:8,
  glyphs:URBAN_GLYPHS,
  sources:{
   terrain:{type:'raster-dem',tiles:[DEM_URL],tileSize:256,encoding:'terrarium',maxzoom:lowData?10:13,bounds:[101.8,9.5,108.1,15.2],attribution:'Terrain: <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener noreferrer">Mapzen / AWS</a> · USGS SRTM / GMTED2010'},
   imagery:{type:'raster',tiles:[IMAGERY_URL],tileSize:256,maxzoom:8,bounds:[101.8,9.5,108.1,15.2],attribution:'Imagery: <a href="https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/" target="_blank" rel="noopener noreferrer">NASA Blue Marble</a>'},
   country:{type:'geojson',data:country,maxzoom:11,attribution:'Boundaries: <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer">geoBoundaries</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>'},
   'city-lights':{type:'geojson',data:{type:'FeatureCollection',features:cities.map(city=>({type:'Feature' as const,properties:{},geometry:{type:'Point' as const,coordinates:city.coordinate}}))}},
   provinces:{type:'geojson',data:regions,maxzoom:11},
   mask:{type:'geojson',data:mask||(typeof country==='string'?'/data/render/mask.geojson':outsideMask(country)),maxzoom:11},
   selection:{type:'geojson',data:{type:'FeatureCollection',features:[]}},
   measurement:{type:'geojson',data:{type:'FeatureCollection',features:[]}},
   inspection:{type:'geojson',data:{type:'FeatureCollection',features:[]}},
  },
  layers:[
   {id:'background',type:'background',paint:{'background-color':'#163d48'}},
   {id:'relief',type:'color-relief',source:'terrain',paint:{'color-relief-color':['interpolate',['linear'],['elevation'],-20,'#143d4c',0,'#315b4a',50,'#61885b',250,'#a7b77b',500,'#d4c88c',1000,'#b49364',1500,'#866d58',2000,'#eee4d1']}},
   {id:'imagery',type:'raster',source:'imagery',layout:{visibility:'none'},paint:{'raster-fade-duration':200,'raster-saturation':-0.15,'raster-brightness-max':0.85}},
   {id:'hillshade',type:'hillshade',source:'terrain',paint:{'hillshade-exaggeration':0.35,'hillshade-shadow-color':'#102d28','hillshade-highlight-color':'#fff4ce','hillshade-illumination-direction':315}},
   {id:'night-shade',type:'fill',source:'country',layout:{visibility:'none'},paint:{'fill-color':'#10253b','fill-opacity':0.65}},
   {id:'city-lights',type:'circle',source:'city-lights',layout:{visibility:'none'},paint:{'circle-radius':['interpolate',['linear'],['zoom'],6,5,10,24,14,45],'circle-color':'#ffb953','circle-blur':1,'circle-opacity':0.5}},
   {id:'outside',type:'fill',source:'mask',paint:{'fill-color':'#071d22','fill-opacity':0.72}},
   {id:'province-lines',type:'line',source:'provinces',paint:{'line-color':'#ecf4ce','line-width':0.75,'line-opacity':0.45}},
   {id:'selection-fill',type:'fill',source:'selection',paint:{'fill-color':'#d1f28f','fill-opacity':0.12}},
   {id:'selection-line',type:'line',source:'selection',paint:{'line-color':'#d1f28f','line-width':2}},
   {id:'country-line',type:'line',source:'country',paint:{'line-color':'#d1ed95','line-width':1.75,'line-opacity':0.9}},
   {id:'measurement-line',type:'line',source:'measurement',filter:['==',['geometry-type'],'LineString'],paint:{'line-color':'#fff3bd','line-width':3,'line-dasharray':[2,1]}},
   {id:'measurement-points',type:'circle',source:'measurement',filter:['==',['geometry-type'],'Point'],paint:{'circle-radius':6,'circle-color':'#fff3bd','circle-stroke-color':'#173128','circle-stroke-width':2}},
   {id:'inspection-point',type:'circle',source:'inspection',paint:{'circle-radius':7,'circle-color':'#c1eb87','circle-stroke-color':'#fff','circle-stroke-width':2}},
  ],
  terrain:{source:'terrain',exaggeration:1},
  sky:{'sky-color':'#d7e6db','horizon-color':'#dfeadb','fog-color':'#a9c5b8','fog-ground-blend':0.4,'horizon-fog-blend':0.5,'sky-horizon-blend':0.6},
 };
}
