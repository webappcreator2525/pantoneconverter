/**
 * Downloads the Plus Jakarta Sans weights the OG generator needs and caches
 * them under scripts/.fontcache/ (gitignored). resvg has no webfont support,
 * so it needs real TTF files on disk to match the site's typography.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const cacheDir = join(dirname(fileURLToPath(import.meta.url)), '.fontcache');

// Resolved from the Google Fonts css2 API (v12) with a TTF-era user agent.
const FONTS = {
  'PlusJakartaSans-Regular.ttf':
    'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NSg.ttf',
  'PlusJakartaSans-Bold.ttf':
    'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNSg.ttf',
  'PlusJakartaSans-ExtraBold.ttf':
    'https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUnNSg.ttf',
};

export async function ensureFonts() {
  mkdirSync(cacheDir, { recursive: true });
  const paths = [];
  for (const [name, url] of Object.entries(FONTS)) {
    const dest = join(cacheDir, name);
    if (!existsSync(dest)) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to download ${name}: HTTP ${res.status}`);
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      console.log(`  fetched ${name}`);
    }
    paths.push(dest);
  }
  return paths;
}
