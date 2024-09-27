import { AgentSkill } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<AgentSkill[]>> => {
        const response = await fetchToLaravel<AgentSkill[]>(
            event,
            "/agents/skills",
            {
                method: "GET",
            }
        );
        return response;
    }
);
