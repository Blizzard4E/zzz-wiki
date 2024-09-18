import { Agent } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Agent>> => {
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<Agent>(event, `/agents/${id}`, {
            method: "DELETE",
        });
    }
);
