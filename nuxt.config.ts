// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  dir: {
    public: "public",
  },
  //   runtimeConfig: {
  //     public: {
  //       SUPABASE_URL: process.env.SUPABASE_URL,
  //       SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  //     },
  //   },
  modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
});
