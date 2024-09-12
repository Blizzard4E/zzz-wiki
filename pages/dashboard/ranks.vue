<template>
    <Card class="text-white w-full">
        <CardHeader>
            <div class="flex justify-between">
                <h1 class="text-2xl">Ranks</h1>
                <client-only>
                    <RankCreate
                        v-if="
                            userState?.permissions.includes(
                                Permissions.CreateRanks
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
                    >A list of ranks.</TableCaption
                >
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="rank in data?.data" :key="rank.id">
                        <TableCell>{{ rank.id }}</TableCell>
                        <TableCell>{{ rank.name }}</TableCell>
                        <TableCell>{{
                            formatDateTime(rank.updated_at)
                        }}</TableCell>
                        <TableCell>{{
                            formatDateTime(rank.created_at)
                        }}</TableCell>
                        <TableCell class="flex gap-4">
                            <RankEdit
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.EditRanks
                                    )
                                "
                                :rank="rank"
                                @success="refresh"
                            />
                            <RankDelete
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.DeleteRanks
                                    )
                                "
                                :rank="rank"
                                @success="refresh"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div v-else class="grid place-items-center py-8">
                <Loader text="Fetching Ranks" class="invert" />
            </div>
            <template #fallback>
                <div class="grid place-items-center py-8">
                    <Loader text="Fetching Ranks" class="invert" />
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

const { data, status, refresh } = await useFetch<APIResponse<Rank[]>>(
    "/api/ranks",
    { method: "POST" }
);
if (data.value) {
    switch (data.value.status) {
        case 200:
            break;
        // No need permission check for getting ranks (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}
</script>

<style></style>
