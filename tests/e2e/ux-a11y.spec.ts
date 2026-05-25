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

  test('services menu works with click, keyboard, and outside click', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 950 })
    await gotoApp(page, '/')

    await page.waitForFunction(() => {
      const button = document.querySelector<HTMLButtonElement>('button[aria-controls="services-menu"]')
      if (!button) return false
      const rect = button.getBoundingClientRect()
      return rect.top >= 0 && rect.left >= 0 && rect.right <= window.innerWidth
    })

    await page.evaluate(() => {
      const button = document.querySelector<HTMLButtonElement>('button[aria-controls="services-menu"]')
      button?.focus()
      button?.click()
    })
    await page.waitForFunction(() => {
      const menu = document.querySelector<HTMLElement>('[role="menu"][aria-label="Services"]')
      return menu && getComputedStyle(menu).visibility !== 'hidden'
    })

    await page.keyboard.press('ArrowDown')
    await page.waitForFunction(() => document.activeElement?.getAttribute('role') === 'menuitem')
    await page.keyboard.press('ArrowDown')
    await page.waitForFunction(() => {
      const items = Array.from(document.querySelectorAll('[role="menuitem"]'))
      return document.activeElement === items[1]
    })
    await page.keyboard.press('Escape')
    await page.waitForFunction(() => !document.querySelector('[role="menu"][aria-label="Services"]'))

    await page.waitForFunction(() => document.activeElement === document.querySelector('button[aria-controls="services-menu"]'))
    await page.keyboard.press('Enter')
    await page.waitForFunction(() => Boolean(document.querySelector('[role="menu"][aria-label="Services"]')))
    await page.mouse.click(20, 500)
    await page.waitForFunction(() => !document.querySelector('[role="menu"][aria-label="Services"]'))
  })

  test('theme toggle shows current state and action aria label', async ({ page }) => {
    await gotoApp(page, '/')

    await page.waitForFunction(() => {
      const button = document.querySelector<HTMLButtonElement>('button[aria-label="Switch to dark mode"]')
      return button?.textContent?.includes('Light')
    })
    await page.evaluate(() => {
      document.querySelector<HTMLButtonElement>('button[aria-label="Switch to dark mode"]')?.click()
    })
    await page.waitForFunction(() => {
      const button = document.querySelector<HTMLButtonElement>('button[aria-label="Switch to light mode"]')
      return button?.textContent?.includes('Dark')
    })
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
    await page.evaluate(() => {
      Array.from(document.querySelectorAll<HTMLButtonElement>('button'))
        .find((button) => button.textContent?.trim() === 'Cookie Preferences')
        ?.click()
    })

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

  test('mobile services menu opens on touch-sized viewports', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await gotoApp(page, '/')

    await page.waitForFunction(() => Boolean(document.querySelector<HTMLButtonElement>('button[aria-label="Open menu"]')))
    await page.waitForTimeout(1000)
    await page.evaluate(() => {
      document.querySelector<HTMLButtonElement>('button[aria-label="Open menu"]')?.click()
    })
    await page.waitForFunction(() => Boolean(document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-services-menu"]')))
    await page.evaluate(() => {
      document.querySelector<HTMLButtonElement>('button[aria-controls="mobile-services-menu"]')?.click()
    })
    await page.waitForTimeout(500)

    const mobileLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll<HTMLAnchorElement>('#mobile-services-menu a')).map((link) => link.textContent?.trim() ?? ''),
    )
    expect(mobileLinks).toContain('All Services')
    expect(mobileLinks.some((label) => /Cybersecurity/i.test(label))).toBe(true)
  })

  test('chatbot suggestions send prompt and update character counter', async ({ page }) => {
    await page.route('**/api/chat', async (route) => {
      const body = route.request().postDataJSON() as { messages: Array<{ role: string; content: string }> }
      const last = body.messages.at(-1)
      expect(last?.content).toBe('Compare web development vs AI automation.')
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Web development builds the product; AI automation improves workflows.' }),
      })
    })

    await gotoApp(page, '/')
    await page.getByRole('button', { name: 'Open AI assistant' }).click()
    await expect(page.getByText('0/800 chars')).toBeVisible()
    await page.getByRole('button', { name: /Compare web development vs AI automation/i }).click()

    await expect(page.getByRole('log').getByText('Compare web development vs AI automation.')).toBeVisible()
    await expect(page.getByText('Web development builds the product; AI automation improves workflows.')).toBeVisible()
    await expect(page.getByText('0/800 chars')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })

  for (const width of [390, 768, 1440]) {
    test(`pricing and contact avoid horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })

      await gotoApp(page, '/pricing')
      const pricingOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(pricingOverflow).toBeLessThanOrEqual(1)

      await gotoApp(page, selectedContactUrl)
      const contactOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(contactOverflow).toBeLessThanOrEqual(1)
    })
  }
})
