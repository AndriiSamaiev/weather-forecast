// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  experimental: {
    appManifest: false,
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'https://cdn.weatherapi.com/weather/64x64/day/113.png'
        }
      ],
      title: "Weather Forecast",
      meta: [
        { 'http-equiv': 'Cache-Control', content: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'title', content: 'Weather Forecast' },
        { name: 'description', content: 'Everything You Need, on Demand: Get Access to the Weather all over The World. Free' },
      ],

    }
  },
  runtimeConfig: {
    public: {
      URI_API: process.env.VUE_APP_WEATHER_BASE_URL,
      WEATHER_API_KEY: process.env.VUE_APP_WEATHER_API_KEY,
    }
  }
})