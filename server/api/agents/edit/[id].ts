import { Agent } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { AgentRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Agent>> => {
        const body = await readFormData(event);
        const id = getRouterParam(event, "id");
        const res = await fetchToLaravel<Agent>(event, `/agents/${id}`, {
            method: "POST",
            body,
        });
        console.log(res);
        return res;
    }
);
