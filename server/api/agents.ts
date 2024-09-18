import { Agent } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Agent[]>> => {
        const response = await fetchToLaravel<Agent[]>(event, "/agents", {
            method: "GET",
        });
        return response;
    }
);
