import { Rank } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { RankRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(async (event): Promise<APIResponse<Rank>> => {
    const body = await readBody<RankRequest>(event);
    return await fetchToLaravel<Rank>(event, "/ranks", {
        method: "POST",
        body,
    });
});
