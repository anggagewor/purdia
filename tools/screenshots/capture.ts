import { test, type Page } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

/**
 * Purdia Page Capture Tool
 *
 * Captures all major pages grouped by category.
 * Output goes to ../../docs/screenshots/<category>/<name>.png
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_DIR = path.resolve(__dirname, '../../docs/screenshots')

// ─── Route Definitions ────────────────────────────────────────────────────────
// Each category maps to an array of { path, name } objects.
// "name" becomes the filename (no "screenshot" prefix — descriptive only).

interface PageEntry {
  path: string
  name: string
  /** Optional delay (ms) to wait for animations/charts to render */
  delay?: number
}

type Categories = Record<string, PageEntry[]>

const categories: Categories = {
  dashboard: [
    { path: '/', name: 'dashboard', delay: 1000 },
  ],

  auth: [
    { path: '/login', name: 'login' },
    { path: '/register', name: 'register' },
    { path: '/forgot-password', name: 'forgot-password' },
  ],

  pos: [
    { path: '/pos', name: 'dashboard', delay: 1000 },
    { path: '/pos/terminal', name: 'terminal' },
    { path: '/pos/stock', name: 'stock' },
    { path: '/pos/customers', name: 'customers' },
    { path: '/pos/cash-drawer', name: 'cash-drawer' },
    { path: '/pos/discounts', name: 'discounts' },
    { path: '/pos/reports', name: 'reports' },
    { path: '/pos/qr-codes', name: 'qr-codes' },
  ],

  accounting: [
    { path: '/accounting', name: 'dashboard', delay: 1000 },
    { path: '/accounting/coa', name: 'chart-of-accounts' },
    { path: '/accounting/journals', name: 'journal-entries' },
    { path: '/accounting/ledger', name: 'general-ledger' },
    { path: '/accounting/statements', name: 'financial-statements' },
    { path: '/accounting/tax', name: 'tax-management' },
  ],

  invoices: [
    { path: '/invoices', name: 'list' },
    { path: '/invoices/unpaid', name: 'unpaid' },
    { path: '/invoices/overdue', name: 'overdue' },
    { path: '/invoices/create', name: 'create' },
  ],

  crm: [
    { path: '/crm', name: 'dashboard', delay: 1000 },
    { path: '/crm/leads', name: 'leads' },
    { path: '/crm/companies', name: 'companies' },
    { path: '/crm/contacts', name: 'contacts' },
    { path: '/crm/deals', name: 'deals' },
    { path: '/crm/activities', name: 'activities' },
    { path: '/crm/follow-ups', name: 'follow-ups' },
    { path: '/crm/tasks', name: 'tasks' },
    { path: '/crm/quotations', name: 'quotations' },
    { path: '/crm/calendar', name: 'calendar' },
    { path: '/crm/reports', name: 'reports' },
  ],

  hrm: [
    { path: '/hrm', name: 'dashboard', delay: 1000 },
    { path: '/hrm/employees', name: 'employees' },
    { path: '/hrm/departments', name: 'departments' },
    { path: '/hrm/positions', name: 'positions' },
    { path: '/hrm/attendance', name: 'attendance' },
    { path: '/hrm/leave', name: 'leave' },
    { path: '/hrm/payroll', name: 'payroll' },
    { path: '/hrm/recruitment', name: 'recruitment' },
    { path: '/hrm/performance', name: 'performance' },
    { path: '/hrm/training', name: 'training' },
    { path: '/hrm/assets', name: 'assets' },
    { path: '/hrm/documents', name: 'documents' },
    { path: '/hrm/expenses', name: 'expenses' },
    { path: '/hrm/announcements', name: 'announcements' },
    { path: '/hrm/calendar', name: 'calendar' },
    { path: '/hrm/reports', name: 'reports' },
  ],

  inventory: [
    { path: '/inventory', name: 'dashboard', delay: 1000 },
    { path: '/inventory/products', name: 'products' },
    { path: '/inventory/warehouses', name: 'warehouses' },
    { path: '/inventory/movements', name: 'stock-movements' },
    { path: '/inventory/purchases', name: 'purchases' },
    { path: '/inventory/barcodes', name: 'barcodes' },
    { path: '/inventory/maintenance', name: 'maintenance' },
    { path: '/inventory/quality', name: 'quality' },
  ],

  projects: [
    { path: '/projects', name: 'kanban' },
  ],

  clients: [
    { path: '/clients', name: 'list' },
    { path: '/clients/create', name: 'create' },
  ],

  users: [
    { path: '/users', name: 'list' },
    { path: '/users/roles', name: 'roles' },
    { path: '/users/permissions', name: 'permissions' },
  ],

  pages: [
    { path: '/pricing', name: 'pricing' },
    { path: '/landing', name: 'landing' },
    { path: '/profile', name: 'profile' },
    { path: '/calendar', name: 'calendar' },
    { path: '/email', name: 'email' },
    { path: '/chat', name: 'chat' },
  ],

  errors: [
    { path: '/403', name: 'forbidden' },
    { path: '/404-demo', name: 'not-found' },
    { path: '/500', name: 'server-error' },
    { path: '/maintenance', name: 'maintenance' },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

async function capturePage(page: Page, entry: PageEntry, category: string) {
  const dir = path.join(OUTPUT_DIR, category)
  ensureDir(dir)

  const filePath = path.join(dir, `${entry.name}.png`)

  await page.goto(entry.path, { waitUntil: 'networkidle' })

  if (entry.delay) {
    await page.waitForTimeout(entry.delay)
  }

  // Wait a bit for any transitions
  await page.waitForTimeout(300)

  await page.screenshot({ path: filePath, fullPage: false })
  console.log(`  ✓ ${category}/${entry.name}.png`)
}

// ─── Auth Helper ──────────────────────────────────────────────────────────────
// The app has an auth guard. We need to either:
// 1. Login through the form
// 2. Or inject auth state into localStorage/sessionStorage
//
// This function attempts login via the form.
// Adjust credentials as needed for your local env.

async function authenticate(page: Page) {
  await page.goto('/login', { waitUntil: 'networkidle' })

  // Try to fill login form — adjust selectors if needed
  const emailInput = page.locator('input[type="email"], input[name="email"], #email').first()
  const passwordInput = page.locator('input[type="password"], input[name="password"], #password').first()
  const submitBtn = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")').first()

  if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
    await emailInput.fill(process.env.APP_EMAIL || 'admin@example.com')
    await passwordInput.fill(process.env.APP_PASSWORD || 'password')
    await submitBtn.click()
    await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 10_000 }).catch(() => {
      console.log('  ⚠ Login redirect did not happen — capturing pages without auth')
    })
  }
}

// ─── Test Execution ───────────────────────────────────────────────────────────

test.describe('Page Capture', () => {
  test('capture all pages', async ({ page }) => {
    console.log('\n🎯 Starting page capture...\n')

    // Capture auth pages first (no login needed)
    console.log('📂 auth')
    for (const entry of categories.auth) {
      await capturePage(page, entry, 'auth')
    }

    // Capture public/error pages (no login needed)
    console.log('📂 errors')
    for (const entry of categories.errors) {
      await capturePage(page, entry, 'errors')
    }

    // Landing page is public
    console.log('📂 pages (public)')
    const landingEntry = categories.pages.find((e) => e.name === 'landing')
    if (landingEntry) {
      await capturePage(page, landingEntry, 'pages')
    }

    // Now authenticate for protected pages
    console.log('\n🔐 Authenticating...')
    await authenticate(page)
    console.log('')

    // Capture all protected categories
    const protectedCategories = Object.entries(categories).filter(
      ([key]) => !['auth', 'errors'].includes(key),
    )

    for (const [category, pages] of protectedCategories) {
      console.log(`📂 ${category}`)
      for (const entry of pages) {
        // Skip landing (already captured)
        if (category === 'pages' && entry.name === 'landing') continue
        await capturePage(page, entry, category)
      }
      console.log('')
    }

    console.log('✅ All pages captured!\n')
    console.log(`📁 Output: ${OUTPUT_DIR}`)
  })
})
