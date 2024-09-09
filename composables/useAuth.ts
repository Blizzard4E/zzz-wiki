import type { UserState } from "./types";

export const useAuth = () => {
    const userState = useState<UserState>("userState", () => null);

    return { userState };
};
