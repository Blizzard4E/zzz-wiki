import { Faction } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Faction>> => {
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<Faction>(event, `/factions/${id}`, {
            method: "DELETE",
        });
    }
);
