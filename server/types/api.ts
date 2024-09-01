import { Role, UserState } from "~/composables/types";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    userState: UserState;
    message?: string;
}

export interface LogoutResponse {
    success: boolean;
    message?: string;
}

export interface ExternalAPILoginResponse {
    status: string;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            email_verified_at: string | null;
            created_at: string;
            updated_at: string;
            roles: Role[];
        };
        token: string;
        expires_at: string;
    };
}
