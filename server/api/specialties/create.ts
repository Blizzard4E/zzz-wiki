import { Specialty } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { SpecialtyRequest } from "~/server/types/request";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Specialty>> => {
        const body = await readBody<SpecialtyRequest>(event);
        return await fetchToLaravel<Specialty>(event, "/specialties", {
            method: "POST",
            body,
        });
    }
);
