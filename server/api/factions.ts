import { Faction } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Faction[]>> => {
        const response = await fetchToLaravel<Faction[]>(event, "/factions", {
            method: "GET",
        });
        return response;
    }
);
