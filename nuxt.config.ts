// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'test task',
      htmlAttrs: {
        lang: 'ru',
      },
      //link: [
      //  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      //],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
