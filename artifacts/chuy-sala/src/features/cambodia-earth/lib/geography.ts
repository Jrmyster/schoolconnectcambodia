import type { Feature, FeatureCollection, Polygon, MultiPolygon, Position } from 'geojson';
export type RegionFeature = Feature<Polygon | MultiPolygon, { shapeName: string; shapeID: string }>;
export type Regions = FeatureCollection<Polygon | MultiPolygon, { shapeName: string; shapeID: string }>;
export type Coordinate = [number, number];
export function geometryBounds(feature: RegionFeature): [Coordinate, Coordinate] {
  let west=180, south=90, east=-180, north=-90;
  const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  for (const polygon of polygons) for (const ring of polygon) for (const [x,y] of ring) {
    west=Math.min(west,x); east=Math.max(east,x); south=Math.min(south,y); north=Math.max(north,y);
  }
  return [[west,south],[east,north]];
}
function inRing(point: Coordinate, ring: Position[]): boolean {
  const [x,y]=point; let inside=false;
  for (let i=0,j=ring.length-1;i<ring.length;j=i++) {
    const [xi,yi]=ring[i], [xj,yj]=ring[j];
    if (((yi>y)!==(yj>y)) && x<(xj-xi)*(y-yi)/(yj-yi)+xi) inside=!inside;
  }
  return inside;
}
export function contains(feature: RegionFeature, point: Coordinate): boolean {
  const polygons=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;
  return polygons.some(polygon=>inRing(point,polygon[0])&&!polygon.slice(1).some(hole=>inRing(point,hole)));
}
export function distanceKm(a: Coordinate,b: Coordinate): number {
  const rad=Math.PI/180, dLat=(b[1]-a[1])*rad,dLon=(b[0]-a[0])*rad;
  const h=Math.sin(dLat/2)**2+Math.cos(a[1]*rad)*Math.cos(b[1]*rad)*Math.sin(dLon/2)**2;
  return 6371.0088*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));
}
export function actualElevation(displayed: number | null,exaggeration:number):number|null {
  return displayed===null||!Number.isFinite(displayed)||!Number.isFinite(exaggeration)||exaggeration<=0?null:displayed/exaggeration;
}
export function outsideMask(country: Regions): Feature<Polygon> {
  const holes=country.features.flatMap(f=>f.geometry.type==='Polygon'?[f.geometry.coordinates[0]]:f.geometry.coordinates.map(p=>p[0]));
  return {type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[101,9],[109,9],[109,16],[101,16],[101,9]],...holes]}};
}
export const normalize=(text:string)=>text.normalize('NFC').toLowerCase().replace(/[\s\p{P}\u200B-\u200D\uFEFF]+/gu,'');
