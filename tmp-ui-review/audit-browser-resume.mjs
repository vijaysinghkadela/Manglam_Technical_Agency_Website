import { chromium } from 'playwright';
import { access, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseURL = 'http://localhost:3000';
const stamp = '20260614-133344';
const outDir = path.resolve('tmp-ui-review', 'screenshots', stamp);

const routes = [
  ['home', '/'],
  ['about', '/about'],
  ['contact', '/contact'],
  ['portfolio', '/portfolio'],
  ['services', '/services'],
  ['services-ai-automation', '/services/ai-automation'],
  ['services-performance-marketing', '/services/performance-marketing'],
  ['services-cybersecurity', '/services/cybersecurity'],
  ['services-saas-products', '/services/saas-products'],
  ['services-branding', '/services/branding'],
  ['trust-center', '/trust-center'],
  ['cybersecurity-policy', '/cybersecurity-policy'],
  ['cybersecurity-training', '/cybersecurity-training'],
  ['not-found', '/__codex_missing_route__'],
];

const viewports = [
  ['large-desktop', { width: 1920, height: 1080 }],
  ['laptop', { width: 1366, height: 900 }],
  ['tablet', { width: 768, height: 1024 }],
  ['mobile', { width: 390, height: 844 }],
];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const [routeName, route] of routes) {
  for (const [viewportName, viewport] of viewports) {
    const screenshot = path.join(outDir, `${routeName}-${viewportName}-after.png`);
    if (await exists(screenshot)) {
      results.push({ route, routeName, viewportName, screenshot, skipped: true });
      continue;
    }

    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleMessages = [];
    const failedRequests = [];

    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) {
        consoleMessages.push({ type: message.type(), text: message.text() });
      }
    });
    page.on('requestfailed', (request) => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure()?.errorText ?? 'unknown',
      });
    });

    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: screenshot, fullPage: true, timeout: 30_000 });
    const layout = await page.evaluate(() => ({
      title: document.title,
      scrollOverflow: document.documentElement.scrollWidth - window.innerWidth,
    }));

    results.push({
      route,
      routeName,
      viewportName,
      viewport,
      status: response?.status() ?? null,
      screenshot,
      layout,
      consoleMessages,
      failedRequests,
    });

    await context.close();
  }
}

const interactionContext = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const interactionPage = await interactionContext.newPage();
await interactionPage.goto(baseURL, { waitUntil: 'domcontentloaded' });
await interactionPage.waitForTimeout(1000);
await interactionPage.getByRole('button', { name: 'Services' }).hover();
await interactionPage.getByRole('menu', { name: 'Services' }).screenshot({
  path: path.join(outDir, 'navbar-services-menu-desktop-after.png'),
});
await interactionContext.close();

await browser.close();

const files = (await readdir(outDir)).sort();
await writeFile(
  path.join(outDir, 'browser-audit-results.json'),
  JSON.stringify({ baseURL, files, results }, null, 2),
);

console.log(`Screenshot files: ${files.length}`);
