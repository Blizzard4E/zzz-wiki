import { Rank } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { RankRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(async (event): Promise<APIResponse<Rank>> => {
    const body = await readBody<RankRequest>(event);
    const id = getRouterParam(event, "id");
    return await fetchToLaravel<Rank>(event, `/ranks/${id}`, {
        method: "PATCH",
        body,
    });
});
