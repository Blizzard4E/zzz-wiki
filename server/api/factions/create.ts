import { Faction } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Faction>> => {
        const body = await readFormData(event);
        return await fetchToLaravel<Faction>(event, "/factions", {
            method: "POST",
            body,
        });
    }
);
