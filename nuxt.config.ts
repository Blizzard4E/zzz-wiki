// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@tresjs/nuxt"],
    css: ["~/assets/css/main.css", "~/assets/css/animations.css"],
});
