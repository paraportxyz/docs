export default defineNuxtConfig({
  extends: ['docus'],
  // modules: ["@nuxt/content", "@nuxt/ui"],

  css: ['~/assets/css/chaotic.css'],

  site: {
    name: 'Paraport Docs'
  },

  nitro: {
    preset: 'vercel',
    // externals: {
    //   external: ['better-sqlite3', 'bindings', 'file-uri-to-path']
    // },
    // rollupConfig: {
    //   external: ['better-sqlite3', 'bindings', 'file-uri-to-path']
    // },
    // minify: true,
    // cloudflare: {
    //   name: 'paraport-docs',
    //   deployConfig: true,
    //   nodeCompat: true,
    //   wrangler: {
    //     d1_databases: [
    //       {
    //         binding: 'DB',
    //         database_name: 'paraport-docus',
    //         database_id: '6b0c554b-9076-4e84-a626-54e1f6b01179'
    //       }
    //     ]
    //   }
    // }
  },

  devtools: { enabled: true }
})
