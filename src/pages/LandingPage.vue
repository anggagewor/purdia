<script setup lang="ts">
import {
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
  Layers,
  Globe,
  Lock,
  Star,
  Check,
  ChevronRight,
} from '@lucide/vue'

const features = [
  {
    icon: Layers,
    title: '40+ Components',
    description:
      'Production-ready Vue components with TypeScript props, variants, and full dark mode support.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on Vite 8 with optimized chunking, tree-shaking, and gzip compression out of the box.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'AES-GCM encrypted storage, automatic token refresh, and route-level access control.',
  },
  {
    icon: BarChart3,
    title: 'Data Visualization',
    description:
      'Chart.js integration with responsive line, bar, and doughnut charts ready to use.',
  },
  {
    icon: Globe,
    title: 'Responsive Design',
    description: 'Every page and component is fully responsive, from mobile to ultrawide displays.',
  },
  {
    icon: Lock,
    title: 'Authentication Ready',
    description: 'Login, register, forgot password flows with encrypted token persistence.',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    content:
      'Purdia saved us months of development time. The component library is comprehensive and the code quality is exceptional.',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Lead Developer at StartupXYZ',
    content:
      'Best admin template I have worked with. The monorepo structure makes it easy to customize and extend.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Product Manager at ScaleUp',
    content:
      'The dark mode and theme switching just works. Our users love the polished experience it provides.',
    rating: 5,
  },
]

const stats = [
  { value: '40+', label: 'Components' },
  { value: '9', label: 'Modules' },
  { value: '11', label: 'Packages' },
  { value: '8', label: 'Color Themes' },
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Nav -->
    <header
      class="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <span class="text-sm font-bold text-white">P</span>
          </div>
          <span class="text-lg font-bold text-gray-900 dark:text-white">Purdia</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a
            href="#features"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >Features</a
          >
          <a
            href="#testimonials"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >Testimonials</a
          >
          <a
            href="#pricing"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >Pricing</a
          >
        </nav>
        <div class="flex items-center gap-3">
          <a
            href="#"
            class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >Sign In</a
          >
          <a
            href="#"
            class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <!-- Background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      ></div>
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl"
      ></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
        >
          <Zap class="w-3.5 h-3.5" />
          <span>Now with Vue 3.5 + TypeScript 6</span>
        </div>

        <h1
          class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight max-w-4xl mx-auto"
        >
          Build admin dashboards
          <span class="text-primary-600 dark:text-primary-400">faster than ever</span>
        </h1>

        <p
          class="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          A modern Vue 3 admin template with 40+ components, 9 business modules, and a monorepo
          architecture. Ship your next SaaS product in days, not months.
        </p>

        <div class="flex items-center justify-center gap-4 mt-10">
          <a
            href="#"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-lg shadow-primary-600/25"
          >
            Get Started Free
            <ArrowRight class="w-4 h-4" />
          </a>
          <a
            href="#"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            View on GitHub
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            Everything you need to ship fast
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mt-3 text-lg">
            Built with best practices and production-ready patterns so you can focus on what makes
            your product unique.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all"
          >
            <div
              class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4"
            >
              <component
                :is="feature.icon"
                class="w-5 h-5 text-primary-600 dark:text-primary-400"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Loved by developers</h2>
          <p class="text-gray-500 dark:text-gray-400 mt-3 text-lg">
            See what teams are saying about building with Purdia.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <!-- Stars -->
            <div class="flex items-center gap-0.5 mb-4">
              <Star
                v-for="i in testimonial.rating"
                :key="i"
                class="w-4 h-4 text-amber-400 fill-amber-400"
              />
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              "{{ testimonial.content }}"
            </p>

            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
              >
                <span class="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {{ testimonial.name.charAt(0) }}
                </span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ testimonial.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          Ready to build your next project?
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-3 text-lg">
          Get started in minutes. No credit card required.
        </p>
        <div class="flex items-center justify-center gap-4 mt-8">
          <a
            href="#"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-lg shadow-primary-600/25"
          >
            Start Building
            <ChevronRight class="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
                <span class="text-xs font-bold text-white">P</span>
              </div>
              <span class="text-sm font-bold text-gray-900 dark:text-white">Purdia</span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Modern admin dashboard template built with Vue 3, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Product</h4>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Features</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Components</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Pricing</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Changelog</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Resources</h4>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Documentation</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Components</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Templates</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Blog</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Legal</h4>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Privacy Policy</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >Terms of Service</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >License</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="flex items-center justify-between mt-10 pt-6 border-t border-gray-200 dark:border-gray-800"
        >
          <p class="text-xs text-gray-400 dark:text-gray-500">
            &copy; 2026 Purdia. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a href="#" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
