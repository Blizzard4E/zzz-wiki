// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss", "@tresjs/nuxt", "shadcn-nuxt", "@nuxt/image"],
    css: ["~/assets/css/main.css", "~/assets/css/animations.css"],
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: "./components/ui",
    },
    runtimeConfig: {
        apiURL: "",
        public: {
            apiURL: "",
        },
    },
});