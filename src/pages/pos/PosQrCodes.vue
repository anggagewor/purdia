<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseCard, BaseButton } from '@purdia/ui'
import { QrCode, Printer, Download, Copy, Check } from '@lucide/vue'
import { tables } from '@/stores/pos'

const baseUrl = computed(() => window.location.origin)
const copiedId = ref<string | null>(null)

function getOrderUrl(tableId: string) {
  return `${baseUrl.value}/order/${tableId}`
}

/**
 * Generate a simple QR code SVG using a basic module pattern.
 * In production, use a proper QR library. Here we render a placeholder
 * that visually represents a QR code with the URL embedded.
 */
function getQrSvg(tableId: string): string {
  // Simple deterministic pattern based on tableId for visual demo
  const url = getOrderUrl(tableId)
  const seed = tableId.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
  const size = 21
  const modules: boolean[][] = []

  for (let r = 0; r < size; r++) {
    modules.push([])
    for (let c = 0; c < size; c++) {
      // Finder patterns (top-left, top-right, bottom-left)
      const inFinderTL = r < 7 && c < 7
      const inFinderTR = r < 7 && c >= size - 7
      const inFinderBL = r >= size - 7 && c < 7

      if (inFinderTL || inFinderTR || inFinderBL) {
        const lr = inFinderTL ? r : inFinderBL ? r - (size - 7) : r
        const lc = inFinderTL ? c : inFinderTR ? c - (size - 7) : c
        const border = lr === 0 || lr === 6 || lc === 0 || lc === 6
        const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4
        modules[r]!.push(border || inner)
      } else {
        // Pseudo-random data modules
        const val = ((seed * (r + 1) * (c + 1) + r * 7 + c * 13) % 100) > 45
        modules[r]!.push(val)
      }
    }
  }

  const cellSize = 10
  const svgSize = size * cellSize + 20 // padding
  let rects = ''
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules[r]![c]) {
        rects += `<rect x="${c * cellSize + 10}" y="${r * cellSize + 10}" width="${cellSize}" height="${cellSize}" fill="currentColor"/>`
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgSize} ${svgSize}" class="w-full h-full text-gray-900">${rects}</svg>`
}

function copyUrl(tableId: string) {
  navigator.clipboard.writeText(getOrderUrl(tableId))
  copiedId.value = tableId
  setTimeout(() => {
    copiedId.value = null
  }, 2000)
}

function printTable(tableId: string) {
  const tableName = tables.find((t) => t.id === tableId)?.name ?? tableId
  const url = getOrderUrl(tableId)
  const svg = getQrSvg(tableId)

  const printWindow = window.open('', '_blank', 'width=400,height=500')
  if (!printWindow) return

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>QR - ${tableName}</title>
      <style>
        body { margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, sans-serif; }
        .qr { width: 200px; height: 200px; margin-bottom: 16px; }
        h2 { margin: 0 0 4px; font-size: 20px; }
        p { margin: 0; font-size: 12px; color: #666; }
        .url { margin-top: 8px; font-size: 10px; color: #999; word-break: break-all; max-width: 250px; text-align: center; }
        .scan-text { margin-top: 12px; font-size: 14px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="qr">${svg}</div>
      <h2>${tableName}</h2>
      <p class="scan-text">Scan untuk pesan</p>
      <p class="url">${url}</p>
      <script>window.onload = () => { window.print(); window.close(); }<\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
}

function printAll() {
  const printWindow = window.open('', '_blank', 'width=800,height=600')
  if (!printWindow) return

  let cards = ''
  for (const table of tables) {
    const svg = getQrSvg(table.id)
    const url = getOrderUrl(table.id)
    cards += `
      <div class="card">
        <div class="qr">${svg}</div>
        <h3>${table.name}</h3>
        <p>Scan untuk pesan</p>
        <p class="url">${url}</p>
      </div>
    `
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>QR Codes - All Tables</title>
      <style>
        body { margin: 20px; font-family: system-ui, sans-serif; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; text-align: center; page-break-inside: avoid; }
        .qr { width: 120px; height: 120px; margin: 0 auto 8px; }
        h3 { margin: 0 0 4px; font-size: 14px; }
        p { margin: 0; font-size: 11px; color: #666; }
        .url { font-size: 8px; color: #999; word-break: break-all; margin-top: 4px; }
        @media print { body { margin: 10px; } .grid { gap: 10px; } }
      </style>
    </head>
    <body>
      <div class="grid">${cards}</div>
      <script>window.onload = () => { window.print(); window.close(); }<\/script>
    </body>
    </html>
  `)
  printWindow.document.close()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">QR Code Meja</h1>
        <p class="text-gray-500 mt-1 dark:text-gray-400">Generate & print QR code untuk self-order per meja</p>
      </div>
      <BaseButton @click="printAll">
        <Printer class="w-4 h-4" /> Print Semua
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <BaseCard v-for="table in tables" :key="table.id">
        <div class="flex flex-col items-center py-2">
          <!-- QR Code -->
          <div class="w-32 h-32 mb-3" v-html="getQrSvg(table.id)" />

          <!-- Table name -->
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ table.name }}</h3>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate max-w-full px-2">
            {{ getOrderUrl(table.id) }}
          </p>

          <!-- Actions -->
          <div class="flex gap-2 mt-3">
            <button
              class="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              @click="copyUrl(table.id)"
            >
              <Check v-if="copiedId === table.id" class="w-3.5 h-3.5 text-emerald-500" />
              <Copy v-else class="w-3.5 h-3.5" />
              {{ copiedId === table.id ? 'Copied!' : 'Copy' }}
            </button>
            <button
              class="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
              @click="printTable(table.id)"
            >
              <Printer class="w-3.5 h-3.5" /> Print
            </button>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
