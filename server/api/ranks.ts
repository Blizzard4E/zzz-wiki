import { Rank } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Rank[]>> => {
        const response = await fetchToLaravel<Rank[]>(event, "/ranks", {
            method: "GET",
        });
        return response;
    }
);
