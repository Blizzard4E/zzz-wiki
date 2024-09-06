import { useRouter, useRuntimeConfig } from "#app";
import type { UserState } from "./types";

export const useAuth = () => {
    const router = useRouter();
    const runtimeConfig = useRuntimeConfig();
    const storedToken = useState<string | null>("userState", () => null);

    const reAuthenticate = async () => {
        const getProfile = await $fetch("/api/get-profile", {
            ignoreResponseError: true,
        });
        if (getProfile.status == 200 && getProfile.data) {
            storedToken.value = encryptData(
                getProfile.data,
                runtimeConfig.public.encryptKey
            );
            router.push({ path: "/dashboard" });
        } else {
            await $fetch("/api/logout", {
                method: "POST",
                ignoreResponseError: true,
            });
            router.push({ path: "/" });
        }
    };

    const userState = computed<UserState>({
        get() {
            if (storedToken.value) {
                const decryptedState = decryptData(
                    storedToken.value,
                    runtimeConfig.public.encryptKey
                ) as UserState;
                if (decryptedState) return decryptedState;
            }

            reAuthenticate();
            return null;
        },
        set(state) {
            if (state) {
                storedToken.value = encryptData(
                    state,
                    runtimeConfig.public.encryptKey
                );
            } else {
                storedToken.value = null;
            }
        },
    });

    return userState;
};
