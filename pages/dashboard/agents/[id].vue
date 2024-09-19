<template>
    <div>
        <h1>{{ data?.data?.name }}'s skills</h1>
    </div>
</template>

<script lang="ts" setup>
import type { APIResponse } from "~/server/types/api";
import { Permissions } from "~/utils";
const { userState } = useAuth();
const route = useRoute();
const { data, status, refresh } = await useFetch<APIResponse<Agent>>(
    `/api/agents/${route.params.id}`,
    { method: "POST" }
);
if (data.value) {
    switch (data.value.status) {
        case 200:
            break;
        // No need permission check for getting agents (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}
</script>

<style></style>
