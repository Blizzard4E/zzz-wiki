import {
    ExternalAPILoginResponse,
    LoginRequest,
    LoginResponse,
} from "../types/api";

export default defineEventHandler(async (event): Promise<LoginResponse> => {
    const body = await readBody<LoginRequest>(event);
    if (body.email == "zzz@gmail.com" && body.password == "zzz") {
        const responseFromExternalAPI: ExternalAPILoginResponse = {
            status: "ok",
            message: "Login successful",
            data: {
                user: {
                    id: 6,
                    name: "God",
                    email: "stylerbabyzzz@gmail.com",
                    email_verified_at: null,
                    created_at: "2024-08-22T09:05:10.000000Z",
                    updated_at: "2024-08-22T09:05:10.000000Z",
                    roles: [
                        {
                            id: 0,
                            name: "Admin",
                            permissions: [
                                {
                                    id: 0,
                                    name: "Admin",
                                },
                            ],
                        },
                    ],
                },
                token: "23|piXZMRVhvUPrYiNERKRkjpVhSfzMyEacSI3oyCbffa88d",
                expires_at: "2024-09-02T09:23:25.000000Z",
            },
        };
        const expiresAt = new Date(responseFromExternalAPI.data.expires_at);
        setCookie(event, "session_token", responseFromExternalAPI.data.token, {
            httpOnly: true,
            expires: expiresAt,
        });
        return {
            success: true,
            message: "Login successful",
            userState: responseFromExternalAPI.data.user,
        };
    }
    return {
        success: false,
        message: "Invalid credentials",
        userState: null,
    };
});
