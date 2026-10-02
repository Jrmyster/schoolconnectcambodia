#!/usr/bin/env bash
set -euo pipefail
set +e
rg -n 'MapComponent|SchoolInbox|useListSchools|useListNeeds|schoolsTable|schoolMessagesTable|leaflet' \
  artifacts/chuy-sala/src artifacts/api-server/src lib/db/src lib/api-client-react/src lib/api-zod/src
result=$?
set -e
if [ "$result" -eq 0 ]; then
  echo 'FAIL: stale Map references remain.' >&2
  exit 1
elif [ "$result" -ne 1 ]; then
  echo 'FAIL: the reference audit could not run.' >&2
  exit "$result"
fi
node --input-type=module <<'JS'
import { readFileSync } from 'node:fs';
for (const file of ['artifacts/chuy-sala/package.json','artifacts/api-server/package.json']) {
 const p=JSON.parse(readFileSync(file,'utf8'));
 for (const name of ['leaflet','react-leaflet','@types/leaflet','three','@react-three/fiber','@react-three/drei','@types/three','multer','@types/multer']) {
  if (p.dependencies?.[name] || p.devDependencies?.[name]) throw new Error(`${file} still depends on ${name}`);
 }
}
console.log('Clean: No leftover map/school references or forbidden dependencies found in Site A!');
JS
