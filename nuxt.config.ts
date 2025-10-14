export default defineNuxtConfig({
  extends: ['docus'],

  css: ['~/assets/css/chaotic.css'],

  site: {
    name: ''
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'paraport-docus',
            database_id: 'f8bee687-8d89-4521-a415-cb04bf1e2208'
          }
        ]
      }
    }
  },

  devtools: { enabled: true }
})
