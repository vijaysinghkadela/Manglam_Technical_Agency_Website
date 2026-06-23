import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseURL = 'http://localhost:3000';
const stamp = '20260614-133344';
const outDir = path.resolve('docs', 'reports', 'ui-review-workspace', 'screenshots', stamp);

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

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const [routeName, route] of routes) {
  for (const [viewportName, viewport] of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleMessages = [];
    const failedRequests = [];

    await page.addInitScript(() => {
      localStorage.setItem(
        'mta-consent-storage',
        JSON.stringify({
          state: {
            hasConsent: true,
            consentStatus: 'accepted',
            consentTimestamp: new Date().toISOString(),
            consentExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
            consentVersion: '2026-05-24',
            consentPurpose: 'audit',
            showBanner: false,
          },
          version: 0,
        }),
      );
    });

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

    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle', timeout: 45_000 });
    await page.screenshot({
      path: path.join(outDir, `${routeName}-${viewportName}-after.png`),
      fullPage: true,
    });

    const layout = await page.evaluate(() => ({
      title: document.title,
      statusText: document.body.innerText.slice(0, 160),
      scrollOverflow: document.documentElement.scrollWidth - window.innerWidth,
      activeElement: document.activeElement?.tagName ?? null,
    }));

    results.push({
      route,
      routeName,
      viewportName,
      viewport,
      status: response?.status() ?? null,
      screenshot: path.join(outDir, `${routeName}-${viewportName}-after.png`),
      layout,
      consoleMessages,
      failedRequests,
    });

    await context.close();
  }
}

const interactionContext = await browser.newContext({ viewport: { width: 1440, height: 950 } });
const interactionPage = await interactionContext.newPage();
await interactionPage.goto(baseURL, { waitUntil: 'networkidle' });
const servicesButton = interactionPage.getByRole('button', { name: 'Services' });
await servicesButton.hover();
await interactionPage.getByRole('menu', { name: 'Services' }).screenshot({
  path: path.join(outDir, 'navbar-services-menu-desktop-after.png'),
});
await interactionPage.keyboard.press('Escape');
await interactionContext.close();

await writeFile(path.join(outDir, 'browser-audit-results.json'), JSON.stringify(results, null, 2));
await browser.close();

console.log(`Wrote ${results.length} route viewport results to ${outDir}`);
