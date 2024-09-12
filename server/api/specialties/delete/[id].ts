import { Specialty } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Specialty>> => {
        const id = getRouterParam(event, "id");
        return await fetchToLaravel<Specialty>(event, `/specialties/${id}`, {
            method: "DELETE",
        });
    }
);
