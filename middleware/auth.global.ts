export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client) {
        const userState = useAuth();

        const getProfile = await $fetch("/api/get-profile", {
            ignoreResponseError: true,
        });
        if (getProfile.status == 200 && getProfile.data) {
            userState.value = getProfile.data;
        } else {
            userState.value = null;
        }
        return;
    }
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
