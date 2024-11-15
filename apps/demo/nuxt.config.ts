import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  alias: {
    '@lou/math': '../../packages/math/src/mod.ts',
  },
  vite: {
    server: {
      fs: {
        allow: ['../../packages'],
      },
    },
  },
});
