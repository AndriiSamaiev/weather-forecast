// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  experimental: {
    appManifest: false,
  },
  runtimeConfig: {
    public: {
      URI_API: process.env.VUE_APP_WEATHER_BASE_URL,
      WEATHER_API_KEY: process.env.VUE_APP_WEATHER_API_KEY,
    }
  }
})