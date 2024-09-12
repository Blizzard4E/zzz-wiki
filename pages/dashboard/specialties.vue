<template>
    <Card class="text-white w-full">
        <CardHeader>
            <div class="flex justify-between">
                <h1 class="text-2xl">Specialties</h1>
                <client-only>
                    <SpecialtyCreate
                        v-if="
                            userState?.permissions.includes(
                                Permissions.CreateSpecialties
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
                    >A list of specialties.</TableCaption
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
                    <TableRow
                        v-for="specialty in data?.data"
                        :key="specialty.id"
                    >
                        <TableCell>{{ specialty.id }}</TableCell>
                        <TableCell>{{ specialty.name }}</TableCell>
                        <TableCell>{{
                            formatDateTime(specialty.updated_at)
                        }}</TableCell>
                        <TableCell>{{
                            formatDateTime(specialty.created_at)
                        }}</TableCell>
                        <TableCell class="flex gap-4">
                            <SpecialtyEdit
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.EditSpecialties
                                    )
                                "
                                :specialty="specialty"
                                @success="refresh"
                            />
                            <SpecialtyDelete
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.DeleteSpecialties
                                    )
                                "
                                :specialty="specialty"
                                @success="refresh"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div v-else class="grid place-items-center py-8">
                <Loader text="Fetching Specialties" class="invert" />
            </div>
            <template #fallback>
                <div class="grid place-items-center py-8">
                    <Loader text="Fetching Specialties" class="invert" />
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

const { data, status, refresh } = await useFetch<APIResponse<Specialty[]>>(
    "/api/specialties",
    { method: "POST" }
);
if (data.value) {
    switch (data.value.status) {
        case 200:
            break;
        // No need permission check for getting specialties (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}
</script>

<style></style>
