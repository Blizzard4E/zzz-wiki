import { Attribute } from "~/composables/types";
import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(
    async (event): Promise<APIResponse<Attribute[]>> => {
        const response = await fetchToLaravel<Attribute[]>(
            event,
            "/attributes",
            {
                method: "GET",
            }
        );
        return response;
    }
);
