import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import type { UserState } from "./types";

export const useAuth = () => {
    const router = useRouter();
    const storedToken = useLocalStorage<string>("userState", null, {
        serializer: StorageSerializers.string,
    });

    const userState = computed<UserState>({
        get() {
            if (storedToken.value) {
                return decryptData(storedToken.value) as UserState;
            }
            router.push({ path: "/" });
            return null;
        },
        set(state) {
            if (state) {
                storedToken.value = encryptData(state);
            } else {
                storedToken.value = null;
            }
        },
    });

    return userState;
};
