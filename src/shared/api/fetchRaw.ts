'use server';
import fs from 'fs/promises';

export async function fetchRaw(absPath: string) {
  return await fs.readFile(absPath, 'utf8');
}