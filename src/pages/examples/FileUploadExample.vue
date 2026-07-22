<script setup lang="ts">
import { BaseCard, BaseFileUpload } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">File Upload</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Komponen upload file dengan berbagai variasi: input, dropzone, compact, progress, cancel,
        dan validasi.
      </p>
    </div>

    <!-- Dropzone (Default) -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Dropzone (Default)</h4></template>
      <p class="text-xs text-gray-500 mb-3">Drag & drop area. Klik atau seret file ke area ini.</p>
      <BaseFileUpload
        variant="dropzone"
        :multiple="true"
        :max-files="5"
        :max-size="10"
        hint="Upload beberapa file sekaligus, progress dan cancel tersedia."
      />
    </BaseCard>

    <!-- Input Style -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Input Style</h4></template>
      <p class="text-xs text-gray-500 mb-3">Tampilan seperti form input biasa.</p>
      <BaseFileUpload variant="input" label="Lampiran" hint="Pilih file sebagai lampiran." />
    </BaseCard>

    <!-- Compact / Button Style -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Compact / Button</h4></template>
      <p class="text-xs text-gray-500 mb-3">Tombol kecil untuk upload inline.</p>
      <BaseFileUpload variant="compact" :multiple="true" :max-files="3" />
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-2">Small</p>
          <BaseFileUpload variant="dropzone" size="sm" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Medium (default)</p>
          <BaseFileUpload variant="dropzone" size="md" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Large</p>
          <BaseFileUpload variant="dropzone" size="lg" />
        </div>
      </div>
    </BaseCard>

    <!-- Accept: Images Only -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Images Only</h4></template>
      <p class="text-xs text-gray-500 mb-3">Hanya menerima file gambar (jpg, png, gif, webp).</p>
      <BaseFileUpload
        variant="dropzone"
        accept="image/*"
        :multiple="true"
        :max-size="5"
        label="Upload Gambar"
        hint="Hanya format gambar yang diterima."
      />
    </BaseCard>

    <!-- Accept: Documents Only -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Documents Only</h4></template>
      <p class="text-xs text-gray-500 mb-3">Hanya menerima PDF dan dokumen.</p>
      <BaseFileUpload
        variant="dropzone"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        :multiple="true"
        :max-size="20"
        label="Upload Dokumen"
        hint="PDF, Word, Excel — max 20MB per file."
      />
    </BaseCard>

    <!-- Single File -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Single File</h4></template>
      <p class="text-xs text-gray-500 mb-3">Hanya bisa upload 1 file (replace jika pilih lagi).</p>
      <BaseFileUpload
        variant="dropzone"
        :multiple="false"
        label="Avatar"
        accept="image/*"
        :max-size="2"
        hint="Upload 1 foto profil, max 2MB."
      />
    </BaseCard>

    <!-- Multiple with Limit -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Multiple dengan Limit</h4></template>
      <p class="text-xs text-gray-500 mb-3">Multiple upload, dibatasi max 3 file.</p>
      <BaseFileUpload
        variant="dropzone"
        :multiple="true"
        :max-files="3"
        :max-size="5"
        hint="Max 3 file, masing-masing max 5MB."
      />
    </BaseCard>

    <!-- With Error -->
    <BaseCard>
      <template #header><h4 class="font-semibold">With Validation Error</h4></template>
      <p class="text-xs text-gray-500 mb-3">
        State ketika ada error validasi dari luar (misalnya required).
      </p>
      <BaseFileUpload
        variant="dropzone"
        label="Bukti Transfer"
        error="File bukti transfer wajib diupload."
      />
    </BaseCard>

    <!-- Disabled -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div class="space-y-4">
        <BaseFileUpload variant="dropzone" :disabled="true" label="Dropzone Disabled" />
        <BaseFileUpload variant="input" :disabled="true" label="Input Disabled" />
        <BaseFileUpload variant="compact" :disabled="true" />
      </div>
    </BaseCard>

    <!-- All Variants Side by Side -->
    <BaseCard>
      <template #header><h4 class="font-semibold">All Variants Comparison</h4></template>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <p class="text-xs text-gray-500 mb-2 font-medium">Dropzone</p>
          <BaseFileUpload variant="dropzone" size="sm" :multiple="true" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2 font-medium">Input</p>
          <BaseFileUpload variant="input" size="sm" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2 font-medium">Compact</p>
          <BaseFileUpload variant="compact" size="sm" />
        </div>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import BaseFileUpload from '@purdia/ui'
import type { UploadFile } from '@purdia/ui'

function onUpload(files: UploadFile[]) {
  console.log('Files:', files)
}

function onRemove(file: UploadFile) {
  console.log('Removed:', file.name)
}

function onCancel(file: UploadFile) {
  console.log('Cancelled:', file.name)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Dropzone with multiple files --&gt;
  &lt;BaseFileUpload
    variant="dropzone"
    :multiple="true"
    :max-files="5"
    :max-size="10"
    accept="image/*"
    label="Upload Images"
    hint="Drag & drop or click to select."
    @upload="onUpload"
    @remove="onRemove"
    @cancel="onCancel"
  /&gt;

  &lt;!-- Simple input --&gt;
  &lt;BaseFileUpload
    variant="input"
    label="Attachment"
    accept=".pdf,.doc"
  /&gt;

  &lt;!-- Compact button --&gt;
  &lt;BaseFileUpload variant="compact" /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>

    <!-- Props Table -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-semibold">Prop</th>
              <th class="text-left py-2 pr-4 font-semibold">Type</th>
              <th class="text-left py-2 pr-4 font-semibold">Default</th>
              <th class="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="font-mono">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">variant</td>
              <td class="py-2 pr-4 text-gray-600">'input' | 'dropzone' | 'compact'</td>
              <td class="py-2 pr-4 text-gray-500">'dropzone'</td>
              <td class="py-2 text-gray-600 font-sans">Tampilan upload</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">size</td>
              <td class="py-2 pr-4 text-gray-600">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4 text-gray-500">'md'</td>
              <td class="py-2 text-gray-600 font-sans">Ukuran komponen</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">accept</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">''</td>
              <td class="py-2 text-gray-600 font-sans">MIME type / extension filter</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">multiple</td>
              <td class="py-2 pr-4 text-gray-600">boolean</td>
              <td class="py-2 pr-4 text-gray-500">false</td>
              <td class="py-2 text-gray-600 font-sans">Boleh upload banyak file</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">maxSize</td>
              <td class="py-2 pr-4 text-gray-600">number</td>
              <td class="py-2 pr-4 text-gray-500">10</td>
              <td class="py-2 text-gray-600 font-sans">Max file size dalam MB</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">maxFiles</td>
              <td class="py-2 pr-4 text-gray-600">number</td>
              <td class="py-2 pr-4 text-gray-500">5</td>
              <td class="py-2 text-gray-600 font-sans">Max jumlah file (kalau multiple)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">disabled</td>
              <td class="py-2 pr-4 text-gray-600">boolean</td>
              <td class="py-2 pr-4 text-gray-500">false</td>
              <td class="py-2 text-gray-600 font-sans">Disable upload</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">label</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">Label di atas komponen</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">hint</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">Hint text di bawah komponen</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 text-primary-600">error</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">Error message (validation)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <!-- Events Table -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Events</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-semibold">Event</th>
              <th class="text-left py-2 pr-4 font-semibold">Payload</th>
              <th class="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="font-mono">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">upload</td>
              <td class="py-2 pr-4 text-gray-600">UploadFile[]</td>
              <td class="py-2 text-gray-600 font-sans">Fired ketika file ditambahkan</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">remove</td>
              <td class="py-2 pr-4 text-gray-600">UploadFile</td>
              <td class="py-2 text-gray-600 font-sans">Fired ketika file dihapus</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 text-primary-600">cancel</td>
              <td class="py-2 pr-4 text-gray-600">UploadFile</td>
              <td class="py-2 text-gray-600 font-sans">Fired ketika upload dibatalkan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
