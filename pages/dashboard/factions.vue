<template>
    <Card class="text-white w-full">
        <CardHeader>
            <div class="flex justify-between">
                <h1 class="text-2xl">Factions</h1>
                <client-only>
                    <FactionCreate
                        v-if="
                            userState?.permissions.includes(
                                Permissions.CreateFactions
                            )
                        "
                        @success="refresh"
                    />
                    <div v-else></div>
                </client-only>
            </div>
        </CardHeader>
        <ClientOnly fallback-tag="div">
            <Table v-if="status == 'success'">
                <TableCaption class="polka-bottom p-4"
                    >A list of factions.</TableCaption
                >
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="faction in data?.data" :key="faction.id">
                        <TableCell>{{ faction.id }}</TableCell>
                        <TableCell>{{ faction.name }}</TableCell>
                        <TableCell>{{ faction.description }}</TableCell>
                        <TableCell>
                            <NuxtLink
                                v-if="faction.icon"
                                target="_blank"
                                :to="`${runtimeConfig.public.apiURL}/get-file/${faction.icon}`"
                            >
                                <NuxtImg
                                    fit="cover"
                                    width="80"
                                    height="80"
                                    :src="`${runtimeConfig.public.apiURL}/get-file/${faction.icon}`"
                            /></NuxtLink>
                            <span v-else>No Icon</span>
                        </TableCell>
                        <TableCell>{{
                            formatDateTime(faction.updated_at)
                        }}</TableCell>
                        <TableCell>{{
                            formatDateTime(faction.created_at)
                        }}</TableCell>
                        <TableCell class="flex gap-4">
                            <FactionEdit
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.EditFactions
                                    )
                                "
                                :faction="faction"
                                @success="refresh"
                            />
                            <FactionDelete
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.DeleteFactions
                                    )
                                "
                                :faction="faction"
                                @success="refresh"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div v-else class="grid place-items-center py-8">
                <Loader text="Fetching Factions" class="invert" />
            </div>
            <template #fallback>
                <div class="grid place-items-center py-8">
                    <Loader text="Fetching Factions" class="invert" />
                </div>
            </template>
        </ClientOnly>
    </Card>
</template>

<script lang="ts" setup>
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import type { APIResponse } from "~/server/types/api";
import { Permissions } from "~/utils";
const { userState } = useAuth();
const runtimeConfig = useRuntimeConfig();

const { data, status, refresh } = await useFetch<APIResponse<Faction[]>>(
    "/api/factions",
    { method: "POST" }
);
if (data.value) {
    switch (data.value.status) {
        case 200:
            break;
        // No need permission check for getting factions (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}
</script>

<style></style>
