import fs from 'fs';

export function fetchRaw(absPath: string) {
  return fs.readFileSync(absPath, 'utf8');
}