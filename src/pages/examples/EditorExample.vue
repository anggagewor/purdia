<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@purdia/ui'
import BaseEditor from '@purdia/ui'

const basicContent = ref('<p>Ini adalah contoh editor sederhana. Coba ketik di sini...</p>')

const fullContent = ref(`
<h2>Welcome to BaseEditor</h2>
<p>Rich text editor yang <strong>powerful</strong> dan <em>extensible</em> menggunakan <a href="https://tiptap.dev">Tiptap</a>.</p>
<h3>Features</h3>
<ul>
  <li>Bold, italic, underline, strikethrough</li>
  <li>Headings (H1, H2, H3)</li>
  <li>Bullet list & ordered list</li>
  <li>Task list (checklist)</li>
  <li>Blockquote</li>
  <li>Code block</li>
  <li>Text alignment</li>
  <li>Links & images</li>
  <li>Text color & highlight</li>
</ul>
<blockquote><p>Ini adalah blockquote. Bisa untuk kutipan atau catatan penting.</p></blockquote>
<pre><code>const hello = "Hello World";
console.log(hello);</code></pre>
<p>Selamat mencoba! 🚀</p>
`)

const minimalContent = ref('<p>Minimal editor — hanya formatting dasar.</p>')
const formContent = ref('')
const disabledContent = ref(
  '<p>Editor ini dalam keadaan <strong>disabled</strong>. Tidak bisa diedit.</p>',
)
const outputContent = ref(
  '<p>Ketik sesuatu di editor ini, lalu lihat output HTML-nya di bawah.</p>',
)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">WYSIWYG Editor</h1>
      <p class="text-gray-500 mt-1">
        Rich text editor berbasis
        <a href="https://tiptap.dev" target="_blank" class="text-primary-600 underline">Tiptap</a>
        (open source, headless, ProseMirror-based) dengan toolbar dan semua variasi formatting.
      </p>
    </div>

    <!-- Full Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Full Variant</h4></template>
      <p class="text-xs text-gray-500 mb-3">
        Semua fitur aktif: formatting, alignment, link, image, color, highlight, clear formatting.
      </p>
      <BaseEditor
        v-model="fullContent"
        variant="full"
        label="Konten Artikel"
        hint="Gunakan toolbar untuk format teks. Supports headings, lists, blockquote, code block, link, image, dll."
      />
    </BaseCard>

    <!-- Default Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Default Variant</h4></template>
      <p class="text-xs text-gray-500 mb-3">
        Formatting standar tanpa alignment dan advanced tools (link, image, color).
      </p>
      <BaseEditor
        v-model="basicContent"
        variant="default"
        label="Deskripsi"
        placeholder="Tulis deskripsi di sini..."
      />
    </BaseCard>

    <!-- Minimal Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Minimal Variant</h4></template>
      <p class="text-xs text-gray-500 mb-3">
        Hanya bold, italic, underline, dan list. Cocok untuk komentar atau catatan singkat.
      </p>
      <BaseEditor
        v-model="minimalContent"
        variant="minimal"
        size="sm"
        label="Catatan"
        placeholder="Tulis catatan singkat..."
      />
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-2">Small</p>
          <BaseEditor variant="minimal" size="sm" placeholder="Small editor..." />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Medium (default)</p>
          <BaseEditor variant="default" size="md" placeholder="Medium editor..." />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Large</p>
          <BaseEditor variant="default" size="lg" placeholder="Large editor..." />
        </div>
      </div>
    </BaseCard>

    <!-- In a Form -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Inside Form</h4></template>
      <p class="text-xs text-gray-500 mb-3">
        Contoh penggunaan editor di dalam form bersama field lain.
      </p>
      <div class="space-y-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            placeholder="Judul artikel..."
            class="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <BaseEditor
          v-model="formContent"
          variant="full"
          label="Konten"
          placeholder="Tulis konten artikel di sini..."
          hint="Minimal 100 kata."
        />
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </BaseCard>

    <!-- With Validation Error -->
    <BaseCard>
      <template #header><h4 class="font-semibold">With Validation Error</h4></template>
      <BaseEditor
        variant="default"
        label="Deskripsi Produk"
        placeholder="Tulis deskripsi produk..."
        error="Deskripsi produk wajib diisi."
      />
    </BaseCard>

    <!-- Disabled -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <BaseEditor
        v-model="disabledContent"
        variant="default"
        :disabled="true"
        label="Preview Only"
      />
    </BaseCard>

    <!-- HTML Output -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Live HTML Output</h4></template>
      <p class="text-xs text-gray-500 mb-3">
        Ketik di editor, lihat output HTML real-time di bawah.
      </p>
      <BaseEditor v-model="outputContent" variant="full" size="sm" />
      <div class="mt-4">
        <p class="text-xs font-medium text-gray-600 mb-1">Output HTML:</p>
        <pre class="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto max-h-48">{{
          outputContent
        }}</pre>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import BaseEditor from '@purdia/ui'

const content = ref('&lt;p&gt;Hello World&lt;/p&gt;')
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Full featured editor --&gt;
  &lt;BaseEditor
    v-model="content"
    variant="full"
    label="Artikel"
    placeholder="Tulis di sini..."
    hint="Support markdown-like shortcuts."
  /&gt;

  &lt;!-- Minimal for comments --&gt;
  &lt;BaseEditor
    v-model="content"
    variant="minimal"
    size="sm"
    placeholder="Tulis komentar..."
  /&gt;
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
              <td class="py-2 pr-4 text-primary-600">modelValue</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">''</td>
              <td class="py-2 text-gray-600 font-sans">HTML content (v-model)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">variant</td>
              <td class="py-2 pr-4 text-gray-600">'minimal' | 'default' | 'full'</td>
              <td class="py-2 pr-4 text-gray-500">'default'</td>
              <td class="py-2 text-gray-600 font-sans">Toolbar feature level</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">size</td>
              <td class="py-2 pr-4 text-gray-600">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4 text-gray-500">'md'</td>
              <td class="py-2 text-gray-600 font-sans">Minimum height editor</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">placeholder</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">'Tulis sesuatu...'</td>
              <td class="py-2 text-gray-600 font-sans">Placeholder text</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">disabled</td>
              <td class="py-2 pr-4 text-gray-600">boolean</td>
              <td class="py-2 pr-4 text-gray-500">false</td>
              <td class="py-2 text-gray-600 font-sans">Read-only mode</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">label</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">Label text</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">hint</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">Hint text</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">error</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">Validation error</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 text-primary-600">maxHeight</td>
              <td class="py-2 pr-4 text-gray-600">string</td>
              <td class="py-2 pr-4 text-gray-500">'400px'</td>
              <td class="py-2 text-gray-600 font-sans">Max height sebelum scroll</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <!-- Keyboard Shortcuts -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Keyboard Shortcuts</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-semibold">Shortcut</th>
              <th class="text-left py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ B</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Bold</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ I</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Italic</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ U</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Underline</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ Shift X</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Strikethrough</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ E</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Code</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ Z</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Undo</td>
            </tr>
            <tr>
              <td class="py-1.5 pr-4">
                <kbd class="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ Shift Z</kbd>
              </td>
              <td class="py-1.5 text-gray-600">Redo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
