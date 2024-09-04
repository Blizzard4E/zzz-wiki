import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import type { UserState } from "./types";
import type { LogoutResponse } from "~/server/types/api";

export const useAuth = () => {
    const router = useRouter();
    const runtimeConfig = useRuntimeConfig();
    const storedToken = useLocalStorage<string>("userState", null, {
        serializer: StorageSerializers.string,
    });

    const logout = async () => {
        const response = await $fetch<LogoutResponse>("/api/logout", {
            method: "POST",
        });
        if (response.success) {
            storedToken.value = null;
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
            logout();
            return null;
        },
        set(state) {
            if (state) {
                console.log("helloS");
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
