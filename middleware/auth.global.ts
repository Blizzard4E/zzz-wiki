export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.client) return;
    const sessionToken = useCookie("session_token");
    if (to.path.startsWith("/login")) {
        if (sessionToken.value) {
            return navigateTo("/dashboard");
        }
    }
    if (to.path.startsWith("/dashboard")) {
        if (!sessionToken.value) {
            return navigateTo("/login");
        }
    }
});
