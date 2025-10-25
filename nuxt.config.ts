export default defineNuxtConfig({
  extends: ['docus'],
  // modules: ["@nuxt/content", "@nuxt/ui"],

  css: ['~/assets/css/chaotic.css'],

  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
        wrangler: {
          d1_databases: [
            {
              binding: 'DB',
              database_name: 'paraport-docus',
              database_id: '6b0c554b-9076-4e84-a626-54e1f6b01179'
            }
          ]
        }
    }
  },

  devtools: { enabled: true }
})
