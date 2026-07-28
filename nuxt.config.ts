import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves a *project* repo from /<repo-name>/ but a *user* repo
// (Zalgawi.github.io) from the root. Driving this from an env var means the
// same config covers both, and local dev stays at '/'.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  nitro: {
    // Emits .nojekyll, without which GitHub's Jekyll step silently drops
    // every directory starting with an underscore — _nuxt and
    // __nuxt_content — and the whole site 404s its own assets.
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html']
    }
  },

  modules: ['@nuxt/content', '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    storage: 'cookie',
    // Emits data-theme="dark" on <html>, which is what our CSS selectors
    // key off. The module also injects the no-flash script for us.
    dataValue: 'theme',
    classSuffix: ''
  },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Zayd Algawi — Front-End Developer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Front-end developer specialising in design systems, accessibility and interfaces that stay fast under constraint.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
        }
      ]
    }
  }
})
