export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client && to.path.startsWith("/dashboard")) {
        const { userState } = useAuth();

        const getProfile = await $fetch("/api/get-profile", {
            ignoreResponseError: true,
        });
        if (getProfile.status == 200 && getProfile.data) {
            userState.value = getProfile.data;
        } else {
            userState.value = null;
            return navigateTo("/login");
        }

        return;
    }

    const sessionToken = useCookie("session_token");
    if (to.path.startsWith("/login") && sessionToken.value) {
        return navigateTo("/dashboard");
    }
    if (to.path.startsWith("/dashboard") && !sessionToken.value) {
        return navigateTo("/login");
    }
});
