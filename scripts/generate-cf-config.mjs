import { existsSync, readFileSync, writeFileSync } from 'node:fs';

function loadEnv(path = '.env') {
  if (!existsSync(path)) {
    return {};
  }

  const raw = readFileSync(path, 'utf8');
  const map = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    map[key] = value;
  }

  return map;
}

const env = loadEnv('.env');
const siteKey = env.CF_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

const content = `// Wygenerowano na podstawie .env\nwindow.CF_TURNSTILE_SITE_KEY = '${siteKey}';\n`;
writeFileSync('cf-config.js', content, 'utf8');

console.log('Wygenerowano cf-config.js z kluczem CF_TURNSTILE_SITE_KEY.');
