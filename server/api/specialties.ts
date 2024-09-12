import { Specialty } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Specialty[]>> => {
        const response = await fetchToLaravel<Specialty[]>(
            event,
            "/specialties",
            {
                method: "GET",
            }
        );
        return response;
    }
);
