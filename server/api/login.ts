import { UserState } from "~/composables/types";
import { APIResponse, LaravelAPILoginData } from "../types/api";
import { LoginRequest } from "../types/request";

export default defineEventHandler(
    async (event): Promise<APIResponse<UserState>> => {
        const body = await readBody<LoginRequest>(event);
        const laravelResponse = await fetchToLaravel<LaravelAPILoginData>(
            event,
            "/login",
            {
                method: "POST",
                body,
            }
        );
        // Extract token and return back userState without token to store in sessionStorage
        if (laravelResponse.data) {
            const expiresAt = new Date(laravelResponse.data.expires_at);
            setCookie(event, "session_token", laravelResponse.data.token, {
                httpOnly: true,
                expires: expiresAt,
            });
        }
        return {
            status: laravelResponse.status,
            message: laravelResponse.message,
            data: laravelResponse.data?.user,
        };
    }
);
