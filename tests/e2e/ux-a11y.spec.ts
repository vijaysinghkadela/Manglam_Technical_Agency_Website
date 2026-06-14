import { expect, test, type Page } from '@playwright/test'

const rupee = '\u20B9'
const dash = '\u2013'

const selectedContactUrl = `/contact?${new URLSearchParams({
  service: 'Cybersecurity',
  budget: `${rupee}1,00,000${dash}${rupee}5,00,000`,
  timeline: 'Within 1 month',
  message: "I'm interested in the Guard plan.",
  selectionType: 'plan',
  departmentName: 'Cybersecurity',
  planName: 'Guard',
  price: `${rupee}1,30,000`,
  durationLabel: 'One-time',
})}`

const gotoApp = async (page: Page, path: string) => {
  const url = path.startsWith('http') ? path : `http://localhost:3000${path}`
  await page.goto(url, { waitUntil: 'commit', timeout: 20_000 })
  await page.waitForFunction(() => document.body && document.readyState !== 'loading', undefined, { timeout: 20_000 })
}

test.describe('MTA UX and accessibility', () => {
  test.beforeEach(async ({ page }) => {
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
            consentPurpose: 'test',
            showBanner: false,
          },
          version: 0,
        }),
      )
    })
  })

  test('contact dropdowns are readable with and without query params', async ({ page }) => {
    await gotoApp(page, '/contact')

    const service = page.locator('#field-service-needed')
    await expect(service).toBeVisible()
    expect(await service.locator('option').count()).toBeGreaterThan(1)
    await expect(service.locator('option').first()).toHaveText('Select a service')

    const styles = await service.evaluate((el) => {
      const computed = getComputedStyle(el)
      return {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        zIndex: computed.zIndex,
      }
    })
    expect(styles.color).not.toBe(styles.backgroundColor)
    expect(styles.zIndex).toBe('auto')
    await expect(page.getByPlaceholder('Your phone number (10 digits)')).toHaveValue('')

    await gotoApp(page, selectedContactUrl)
    await expect(page.getByText(`You selected Cybersecurity - Guard - ${rupee}1,30,000 - One-time.`)).toBeVisible()
    await expect(page.locator('#field-service-needed')).toHaveValue('Cybersecurity')
    await expect(page.locator('#field-budget-range')).toHaveValue(`${rupee}1,00,000${dash}${rupee}5,00,000`)
  })

  test('desktop one-page navigation exposes current section anchors', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 })
    await gotoApp(page, '/')

    const navHrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Main navigation"] a')).map((link) =>
        link.getAttribute('href'),
      ),
    )
    expect(navHrefs).toEqual(expect.arrayContaining(['/#home', '/#about', '/#portfolio', '/#contact']))
    expect(navHrefs).not.toEqual(expect.arrayContaining(['/about', '/portfolio', '/contact', '/pricing']))

    await page.getByRole('button', { name: 'Services' }).click()
    await expect(page.getByRole('menu', { name: 'Services' })).toBeVisible()
    await page.getByRole('menuitem', { name: 'View all services' }).click()
    await page.waitForFunction(() => window.location.hash === '#services')
    await page.waitForFunction(() => {
      const section = document.getElementById('services')
      if (!section) return false
      const rect = section.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.5 && rect.bottom > 120
    })
  })

  test('desktop services menu supports hover, click fallback, keyboard, and escape close', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 })
    await gotoApp(page, '/')

    const servicesButton = page.getByRole('button', { name: 'Services' })
    await servicesButton.hover()
    await expect(page.getByRole('menu', { name: 'Services' })).toBeVisible()
    await expect(servicesButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('menuitem', { name: /AI Automation/i })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: /Branding/i })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('menu', { name: 'Services' })).toBeHidden()
    await expect(servicesButton).toHaveAttribute('aria-expanded', 'false')

    await servicesButton.focus()
    await page.keyboard.press('ArrowDown')
    await expect(page.getByRole('menu', { name: 'Services' })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: 'View all services' })).toBeFocused()
    await page.keyboard.press('ArrowDown')
    await expect(page.getByRole('menuitem', { name: /AI Automation/i })).toBeFocused()
    await page.keyboard.press('End')
    await expect(page.getByRole('menuitem', { name: /Branding/i })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('menu', { name: 'Services' })).toBeHidden()

    await servicesButton.click()
    await expect(page.getByRole('menu', { name: 'Services' })).toBeVisible()
    await page.mouse.click(20, 20)
    await expect(page.getByRole('menu', { name: 'Services' })).toBeHidden()
  })

  test('consent accept persists across reload', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await gotoApp(page, '/')

    await page.waitForFunction(() => Boolean(document.querySelector('[role="region"][aria-label="Cookie and privacy consent"]')))
    await page.evaluate(() => {
      Array.from(document.querySelectorAll<HTMLButtonElement>('button'))
        .find((button) => button.textContent?.trim() === 'Accept optional analytics')
        ?.click()
    })
    await page.waitForFunction(() => {
      const raw = localStorage.getItem('mta-consent-storage')
      return !document.querySelector('[role="region"][aria-label="Cookie and privacy consent"]') && raw?.includes('"consentStatus":"accepted"')
    })

    const secondPage = await context.newPage()
    await gotoApp(secondPage, '/')
    await secondPage.waitForTimeout(750)
    const bannerVisible = await secondPage.evaluate(() => Boolean(document.querySelector('[role="region"][aria-label="Cookie and privacy consent"]')))
    expect(bannerVisible).toBe(false)
    await context.close()
  })

  test('footer cookie preferences reopens non-blocking consent panel', async ({ page }) => {
    await gotoApp(page, '/')
    await page.waitForTimeout(1000)
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll('button')).some((button) => button.textContent?.trim() === 'Cookie Preferences'),
    )
    const preferencesButton = page.getByRole('button', { name: 'Cookie Preferences' })
    await preferencesButton.scrollIntoViewIfNeeded()
    await preferencesButton.click()

    await page.waitForFunction(() => Boolean(document.querySelector('[role="region"][aria-label="Cookie and privacy consent"]')))
    const blockingOverlayCount = await page.evaluate(() => document.querySelectorAll('.fixed.inset-0').length)
    expect(blockingOverlayCount).toBe(0)
    await page.evaluate(() => {
      Array.from(document.querySelectorAll<HTMLButtonElement>('button'))
        .find((button) => button.textContent?.trim() === 'Decline optional analytics')
        ?.click()
    })
    await page.waitForFunction(() => !document.querySelector('[role="region"][aria-label="Cookie and privacy consent"]'))
  })

  test('mobile one-page menu links to sections on touch-sized viewports', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoApp(page, '/')

    await page.locator('nav[aria-label="Main navigation"] button[aria-label="Open menu"]').click()
    await page.waitForFunction(() => Boolean(document.querySelector('nav[aria-label="Mobile navigation"]')))

    const mobileLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Mobile navigation"] a')).map((link) => ({
        href: link.getAttribute('href'),
        label: link.textContent?.trim() ?? '',
      })),
    )
    expect(mobileLinks.map((link) => link.href)).toEqual(expect.arrayContaining(['/#home', '/#about', '/#portfolio', '/#contact']))
    expect(mobileLinks.map((link) => link.label)).toEqual(expect.arrayContaining(['Home', 'About', 'Portfolio', 'Contact']))

    await page.getByRole('button', { name: 'Services' }).click()
    const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(mobileNav.getByRole('link', { name: 'All Services' })).toBeVisible()
    await expect(mobileNav.getByRole('link', { name: 'AI Automation' })).toBeVisible()
    await mobileNav.getByRole('link', { name: 'All Services' }).click()
    await page.waitForFunction(() => window.location.hash === '#services')
    await page.waitForFunction(() => !document.querySelector('nav[aria-label="Mobile navigation"]'))
  })

  for (const width of [390, 768, 1440]) {
    test(`services and contact avoid horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })

      await gotoApp(page, '/services')
      const servicesOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(servicesOverflow).toBeLessThanOrEqual(1)

      await gotoApp(page, selectedContactUrl)
      const contactOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(contactOverflow).toBeLessThanOrEqual(1)
    })
  }

  test('contact API rejects invalid payloads with security headers', async ({ request }) => {
    const response = await request.post('/api/contact', {
      data: {
        name: 'A',
        email: 'not-an-email',
        privacy: false,
      },
    })

    expect(response.status()).toBe(400)
    expect(response.headers()['x-content-type-options']).toBe('nosniff')
    expect(response.headers()['x-frame-options']).toBe('DENY')
  })
})
