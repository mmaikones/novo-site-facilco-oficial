import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const BASE_URL = (process.env.SITE_BASE_URL || 'https://www.facilcoeng.com.br').replace(/\/+$/, '');
const SEGMENTS_FILE = path.join(projectRoot, 'data', 'segments.ts');
const OUTPUT_FILE = path.join(projectRoot, 'data', 'knowledge', 'site-scrape.json');

const STATIC_ROUTES = ['/', '/catalogo', '/catalogo-completo'];

const normalizeRoute = (value) => {
  if (!value) return null;
  if (!value.startsWith('/')) return `/${value}`;
  return value;
};

const unique = (items) => {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    if (!item || seen.has(item)) continue;
    seen.add(item);
    output.push(item);
  }
  return output;
};

const extractRoutesFromSegments = async () => {
  const raw = await fs.readFile(SEGMENTS_FILE, 'utf-8');
  const matches = [...raw.matchAll(/path:\s*'([^']+)'/g)];
  return matches.map((match) => normalizeRoute(match[1])).filter(Boolean);
};

const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

const scrapeRoute = async (page, route) => {
  const url = `${BASE_URL}${route}`;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  const payload = await page.evaluate(() => {
    const clean = (value) => (value || '').replace(/\s+/g, ' ').trim();
    const main = document.querySelector('main') || document.body;

    const title = clean(document.title);
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((item) => clean(item.textContent))
      .filter(Boolean);

    const text = clean((main && main.innerText) || document.body.innerText || '');

    return {
      title,
      headings: Array.from(new Set(headings)).slice(0, 80),
      text
    };
  });

  return {
    path: route,
    url,
    title: payload.title,
    headings: payload.headings,
    text: normalizeText(payload.text).slice(0, 18000),
    scrapedAt: new Date().toISOString()
  };
};

const run = async () => {
  const segmentRoutes = await extractRoutesFromSegments();
  const routes = unique([...STATIC_ROUTES, ...segmentRoutes]);

  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Rotas para raspagem: ${routes.length}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const pages = [];
  for (const route of routes) {
    try {
      console.log(`Raspando ${route}...`);
      const result = await scrapeRoute(page, route);
      pages.push(result);
      console.log(`OK ${route} (${result.text.length} chars)`);
    } catch (error) {
      console.error(`Falha ao raspar ${route}:`, error instanceof Error ? error.message : String(error));
    }
  }

  await browser.close();

  const output = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    pageCount: pages.length,
    pages
  };

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`Arquivo salvo em: ${OUTPUT_FILE}`);
  console.log(`Páginas salvas: ${pages.length}`);
};

run().catch((error) => {
  console.error('Erro fatal no scraper:', error);
  process.exitCode = 1;
});
