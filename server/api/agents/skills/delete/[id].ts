import { AgentSkill } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<AgentSkill>> => {
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<AgentSkill>(event, `/agents/skills/${id}`, {
            method: "DELETE",
        });
    }
);
