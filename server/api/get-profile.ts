import { UserState } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<UserState>> => {
        return await fetchToLaravel<UserState>(event, "/get-profile", {
            method: "GET",
        });
    }
);
