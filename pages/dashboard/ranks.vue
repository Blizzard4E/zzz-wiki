<template>
    <Card class="text-white w-full">
        <CardHeader>
            <div class="flex justify-between">
                <h1 class="text-2xl">Ranks</h1>
                <client-only>
                    <RankCreate v-if="showCreate" @success="refresh" />
                    <div v-else></div>
                </client-only>
            </div>
        </CardHeader>

        <Table>
            <TableCaption class="polka-bottom p-4"
                >A list of ranks.</TableCaption
            >
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Added</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="rank in data?.data">
                    <TableCell>{{ rank.id }}</TableCell>
                    <TableCell>{{ rank.name }}</TableCell>
                    <TableCell>{{ formatDateTime(rank.updated_at) }}</TableCell>
                    <TableCell>{{ formatDateTime(rank.created_at) }}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
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
const userState = useAuth();
const showCreate = ref(false);
if (
    import.meta.client &&
    userState.value &&
    userState.value.permissions.includes(Permissions.CreateRanks)
) {
    showCreate.value = true;
}

const { data, error, execute, refresh } = await useFetch<APIResponse<Rank[]>>(
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
