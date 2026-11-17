#!/usr/bin/env node
/**
 * Compose index.html from index.template.html + components/*.html.
 * Usage: node scripts/compose-html.mjs [--check]
 * --check: exit 1 if index.html is stale (drift gate).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Absolute URL of the published site WITH trailing slash, e.g. 'https://<user>.github.io/<repo>/'.
// Link-preview crawlers need an absolute og:image URL. Empty = relative (previews may not show an image).
const SITE_URL = 'https://subratshah.github.io/';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'index.html');

function compose() {
  const template = readFileSync(resolve(ROOT, 'index.template.html'), 'utf-8');
  return template
    .replace(/<!--\s*@include\s+(.+?)\s*-->/g, (_, name) => {
      const file = resolve(ROOT, 'components', name.trim());
      if (!existsSync(file)) { console.error(`Component not found: ${file}`); process.exit(1); }
      return readFileSync(file, 'utf-8').trimEnd();
    })
    .replaceAll('{{SITE_URL}}', SITE_URL)
    // Cache-bust local css/js/data files so browsers (and Pages' CDN) never serve a stale copy after an edit.
    .replace(/((?:href|src)=")((?:css|js|data)\/[^"?]+)"/g, (_, attr, path) => {
      const hash = createHash('sha1').update(readFileSync(resolve(ROOT, path))).digest('hex').slice(0, 8);
      return `${attr}${path}?v=${hash}"`;
    });
}

const composed = compose();
if (process.argv.includes('--check')) {
  if (!existsSync(OUT) || readFileSync(OUT, 'utf-8') !== composed) {
    console.error('index.html is stale. Run `node scripts/compose-html.mjs`.');
    process.exit(1);
  }
  console.log('index.html is up to date.');
} else {
  writeFileSync(OUT, composed);
  console.log('Generated index.html');
}
