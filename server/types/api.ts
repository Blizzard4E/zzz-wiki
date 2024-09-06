import { UserState } from "~/composables/types";

export type APIResponse<Data = undefined> = {
    status: number;
    message: string;
    data?: Data;
};

// Login

export type LaravelAPILoginData = {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
        roles: string[];
        permissions: string[];
    };
    token: string;
    expires_at: string;
};
export type HTTPMethod =
    | "GET"
    | "HEAD"
    | "PATCH"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "get"
    | "head"
    | "patch"
    | "post"
    | "put"
    | "delete"
    | "connect"
    | "options"
    | "trace";
