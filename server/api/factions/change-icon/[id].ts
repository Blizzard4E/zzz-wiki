import { Faction } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { FactionRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Faction>> => {
        const body = await readFormData(event);
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<Faction>(
            event,
            `/factions/${id}/change-icon`,
            {
                method: "POST",
                body,
            }
        );
    }
);
