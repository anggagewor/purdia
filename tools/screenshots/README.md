# Page Capture Tool

Tool otomatis untuk capture semua halaman Purdia dan simpan ke `docs/screenshots/`.

## Prerequisites

- Node.js >= 18
- Dev server Purdia harus jalan di `http://localhost:5173`

## Setup

```bash
cd tools/screenshots
npm install
npx playwright install chromium
```

## Usage

1. Pastikan dev server jalan dulu di root project:

```bash
# di root project
npm run dev
```

2. Run capture:

```bash
# di tools/screenshots/
npm run capture
```

Atau mode headed (bisa lihat browser-nya):

```bash
npm run capture:headed
```

## Custom Credentials

Default login: `admin@example.com` / `password`

Override via environment variable:

```bash
APP_EMAIL=user@company.com APP_PASSWORD=secret123 npm run capture
```

## Output

Semua hasil capture masuk ke:

```
docs/screenshots/
├── accounting/
│   ├── dashboard.png
│   ├── chart-of-accounts.png
│   └── ...
├── auth/
│   ├── login.png
│   ├── register.png
│   └── ...
├── crm/
├── hrm/
├── inventory/
├── invoices/
├── pos/
├── ...
```

## Menambah Halaman Baru

Edit `capture.ts`, tambahkan entry di kategori yang sesuai:

```ts
const categories = {
  crm: [
    // ... existing
    { path: '/crm/new-page', name: 'new-page' },
  ],
}
```

- `path` — route URL
- `name` — jadi nama file (tanpa extension)
- `delay` (optional) — tambahan waktu tunggu untuk chart/animasi (ms)

## Notes

- Viewport: 1440x900 (desktop)
- Format: PNG
- Color scheme: light mode
- Tool ini independen dari main project (punya `package.json` sendiri)
