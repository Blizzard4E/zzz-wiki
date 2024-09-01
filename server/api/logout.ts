import { LogoutResponse } from "../types/api";

export default defineEventHandler(async (event): Promise<LogoutResponse> => {
    deleteCookie(event, "session_token");
    return {
        success: true,
        message: "Logout Successful",
    };
});
