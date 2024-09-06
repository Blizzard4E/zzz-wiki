import { APIResponse, HTTPMethod } from "../types/api";

export async function fetchToLaravel<ResponseData = undefined>(
    event: any,
    route: string,
    fetchData: {
        method: HTTPMethod;
        body?: any;
    }
): Promise<APIResponse<ResponseData>> {
    const config = useRuntimeConfig();
    const sessionToken = getCookie(event, "session_token");
    let status: number = 500;
    let message = "internal server error";
    let data = undefined;
    if (sessionToken || route == "/login") {
        try {
            const responseFromLaravelAPI: APIResponse<ResponseData> =
                await $fetch(`${config.apiURL}${route}`, {
                    method: fetchData.method,
                    body: fetchData.body,
                    ignoreResponseError: true,
                    headers: {
                        Authorization: `Bearer ${sessionToken}`,
                    },
                    onResponse({ response }) {
                        status = response.status;
                    },
                    onResponseError({ response }) {
                        status = response.status;
                    },
                });

            switch (status) {
                case 200:
                    data = responseFromLaravelAPI.data;
                    break;
                case 401:
                    deleteCookie(event, "session_token");
                    break;
            }
            message = responseFromLaravelAPI.message;
        } catch (error) {}
    } else {
        status = 401;
        message = "unauthenticated";
    }

    return {
        status: status,
        message: message,
        data: data,
    };
}
