import { APIResponse } from "../types/api";

export default defineEventHandler(
    async (event): Promise<APIResponse<undefined>> => {
        const response = await fetchToLaravel(event, "/logout", {
            method: "POST",
        });
        deleteCookie(event, "session_token");
        return response;
    }
);
