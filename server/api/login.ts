import {
    ExternalAPILoginResponse,
    LoginRequest,
    LoginResponse,
} from "../types/api";

export default defineEventHandler(async (event): Promise<LoginResponse> => {
    const body = await readBody<LoginRequest>(event);
    const config = useRuntimeConfig();

    let status: number = 500;
    let message: string = "Something went wrong";

    try {
        const responseFromExternalAPI: ExternalAPILoginResponse = await $fetch(
            `${config.apiURL}/login`,
            {
                method: "POST",
                body,
                onResponse({ response }) {
                    status = response.status;
                    message = response.statusText;
                },
                onResponseError({ response }) {
                    console.log(response);
                    status = response.status;
                    message = response.statusText;
                },
            }
        );
        if (status === 200) {
            const expiresAt = new Date(responseFromExternalAPI.data.expires_at);
            setCookie(
                event,
                "session_token",
                responseFromExternalAPI.data.token,
                {
                    httpOnly: true,
                    expires: expiresAt,
                }
            );
            return {
                success: true,
                message: message,
                userState: responseFromExternalAPI.data.user,
            };
        }
    } catch (error) {
        console.error("Error during API request:", error);
    }

    return {
        success: false,
        message: message,
        userState: null,
    };
});
