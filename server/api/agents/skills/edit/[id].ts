import { Agent } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { AgentRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Agent>> => {
        const body = await readFormData(event);
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<Agent>(event, `/agents/skills/${id}`, {
            method: "POST",
            body,
        });
    }
);
