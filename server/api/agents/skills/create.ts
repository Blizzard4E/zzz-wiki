import { APIResponse } from "~/server/types/api";
import { fetchToLaravel } from "~/server/utils/fetchToLaravel";

export default defineEventHandler(async (event): Promise<APIResponse> => {
    const body = await readFormData(event);
    return await fetchToLaravel(event, "/agents/skills", {
        method: "POST",
        body,
    });
});
