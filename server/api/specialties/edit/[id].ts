import { Rank, Specialty } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { RankRequest, SpecialtyRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Specialty>> => {
        const body = await readBody<SpecialtyRequest>(event);
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<Specialty>(event, `/specialties/${id}`, {
            method: "PATCH",
            body,
        });
    }
);
