import { Rank } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(async (event): Promise<APIResponse<Rank>> => {
    const id = getRouterParam(event, "id");
    return await fetchToLaravel<Rank>(event, `/ranks/${id}`, {
        method: "DELETE",
    });
});
