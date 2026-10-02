import type { Map as LibreMap } from 'maplibre-gl';
// Source-dependent options must run after style.load, not after new Map().
// Map construction schedules style loading asynchronously.
export function configureTerrainLOD(map:Pick<LibreMap,'getSource'|'setSourceTileLodParams'>):boolean {
 if(!map.getSource('terrain'))return false;
 map.setSourceTileLodParams(3,2,'terrain');return true;
}
