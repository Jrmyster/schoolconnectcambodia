import { contains, geometryBounds } from './geography.js';
// Fetch/parse/geographic queries stay in this dedicated module worker. Only the
// requested province, bounds or tiny inspection result cross to the UI thread.
const loaded = new Map();
async function dataset(name) {
    let pending = loaded.get(name);
    if (!pending) {
        pending = (async () => { const response = await fetch(`/data/render/${name}.geojson`, { signal: AbortSignal.timeout(20000) }); if (!response.ok)
            throw new Error('Boundary data unavailable'); const data = await response.json(); if (data.features.length !== (name === 'adm0' ? 1 : 25))
            throw new Error('Invalid boundary data'); return data; })();
        loaded.set(name, pending);
        pending.catch(() => loaded.delete(name));
    }
    return pending;
}
self.addEventListener('message', async (event) => {
    const { id, type, coordinate, name } = event.data;
    try {
        if (type === 'region') {
            const regions = await dataset('adm1'), feature = regions.features.find(f => f.properties.shapeName === name);
            if (!feature)
                throw new Error('Province not found');
            self.postMessage({ id, result: { feature, bounds: geometryBounds(feature) } });
        }
        else if (type === 'inspect') {
            const country = await dataset('adm0');
            if (!country.features.some(f => contains(f, coordinate))) {
                self.postMessage({ id, result: { inside: false, province: null } });
                return;
            }
            const regions = await dataset('adm1');
            self.postMessage({ id, result: { inside: true, province: regions.features.find(f => contains(f, coordinate))?.properties.shapeName || null } });
        }
        else
            throw new Error('Unknown query');
    }
    catch (error) {
        self.postMessage({ id, error: error instanceof Error ? error.message : 'Geographic query failed' });
    }
});
