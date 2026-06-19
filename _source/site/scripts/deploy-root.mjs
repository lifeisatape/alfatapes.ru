import fs from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(sourceRoot, '..', '..');
const dist = path.join(sourceRoot, 'dist');

const keep = new Set(['.git', '.gitignore', '_source', 'CNAME']);
const entries = await fs.readdir(repoRoot, { withFileTypes: true });
for (const entry of entries) {
  if (keep.has(entry.name)) continue;
  await fs.rm(path.join(repoRoot, entry.name), { recursive: true, force: true });
}
await fs.cp(dist, repoRoot, { recursive: true });
await fs.copyFile(path.join(repoRoot, 'index.html'), path.join(repoRoot, '404.html'));
await fs.copyFile(path.join(sourceRoot, 'public', 'CNAME')).catch(async () => {
  await fs.writeFile(path.join(repoRoot, 'CNAME'), 'alfatapes.ru\n');
});
console.log(`Deployed ${dist} -> ${repoRoot}`);
