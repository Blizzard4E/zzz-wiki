<template>
    <Card class="text-white w-full">
        <CardHeader>
            <div class="flex justify-between">
                <h1 class="text-2xl">Agents</h1>
                <client-only>
                    <AgentCreate
                        v-if="
                            userState?.permissions.includes(
                                Permissions.CreateAgents
                            ) &&
                            attributesStatus == 'success' &&
                            ranksStatus == 'success' &&
                            specialtiesStatus == 'success' &&
                            factionsStatus == 'success'
                        "
                        :attributes="attributesData?.data"
                        :specialties="specialtiesData?.data"
                        :ranks="ranksData?.data"
                        :factions="factionsData?.data"
                        @success="agentsRefresh"
                    />
                    <div v-else></div>
                </client-only>
            </div>
        </CardHeader>
        <ClientOnly fallback-tag="div">
            <Table v-if="agentsStatus == 'success'">
                <TableCaption class="polka-bottom p-4"
                    >A list of agents.</TableCaption
                >
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Portrait</TableHead>
                        <TableHead>Mindscape</TableHead>
                        <TableHead>Rank</TableHead>
                        <TableHead>Attribute</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Faction</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="agent in agentsData?.data" :key="agent.id">
                        <TableCell>{{ agent.id }}</TableCell>
                        <TableCell>{{ agent.name }}</TableCell>
                        <TableHead>
                            <NuxtLink
                                v-if="agent.portrait"
                                target="_blank"
                                :to="`${runtimeConfig.public.apiURL}/get-file/${agent.portrait}`"
                            >
                                <NuxtImg
                                    fit="cover"
                                    width="80"
                                    height="80"
                                    :src="`${runtimeConfig.public.apiURL}/get-file/${agent.portrait}`"
                            /></NuxtLink>
                            <span v-else>No Icon</span></TableHead
                        >
                        <TableHead
                            ><NuxtLink
                                v-if="agent.mindscape"
                                target="_blank"
                                :to="`${runtimeConfig.public.apiURL}/get-file/${agent.mindscape}`"
                            >
                                <NuxtImg
                                    fit="cover"
                                    width="80"
                                    height="80"
                                    :src="`${runtimeConfig.public.apiURL}/get-file/${agent.mindscape}`"
                            /></NuxtLink>
                            <span v-else>No Icon</span></TableHead
                        >
                        <TableHead>{{ agent.rank.name }}</TableHead>
                        <TableHead>
                            <div class="flex items-center gap-2">
                                <NuxtImg
                                    width="30"
                                    height="30"
                                    :src="
                                        getAttributeIconFromAttribute(
                                            agent.attribute
                                        )
                                    "
                                />{{ agent.attribute.name }}
                            </div>
                        </TableHead>
                        <TableHead>{{ agent.specialty.name }}</TableHead>
                        <TableHead
                            ><NuxtLink
                                v-if="agent.faction.icon"
                                target="_blank"
                                :to="`${runtimeConfig.public.apiURL}/get-file/${agent.faction.icon}`"
                            >
                                <NuxtImg
                                    fit="cover"
                                    width="80"
                                    height="80"
                                    :src="`${runtimeConfig.public.apiURL}/get-file/${agent.faction.icon}`"
                            /></NuxtLink>
                            <span v-else>No Icon</span></TableHead
                        >
                        <TableCell>{{
                            formatDateTime(agent.updated_at)
                        }}</TableCell>
                        <TableCell>{{
                            formatDateTime(agent.created_at)
                        }}</TableCell>
                        <TableCell class="flex gap-4">
                            <AgentEdit
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.EditAgents
                                    )
                                "
                                :agent="agent"
                                :attributes="attributesData?.data"
                                :specialties="specialtiesData?.data"
                                :ranks="ranksData?.data"
                                :factions="factionsData?.data"
                                @success="agentsRefresh"
                            />
                            <AgentDelete
                                v-if="
                                    userState?.permissions.includes(
                                        Permissions.DeleteAgents
                                    )
                                "
                                :agent="agent"
                                @success="agentsRefresh"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div v-else class="grid place-items-center py-8">
                <Loader text="Fetching Agents" class="invert" />
            </div>
            <template #fallback>
                <div class="grid place-items-center py-8">
                    <Loader text="Fetching Agents" class="invert" />
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

const {
    data: agentsData,
    status: agentsStatus,
    refresh: agentsRefresh,
} = await useFetch<APIResponse<Agent[]>>("/api/agents", { method: "POST" });
if (agentsData.value) {
    switch (agentsData.value.status) {
        case 200:
            break;
        // No need permission check for getting agents (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}

const {
    data: ranksData,
    status: ranksStatus,
    refresh: ranksRefresh,
} = await useFetch<APIResponse<Rank[]>>("/api/ranks", { method: "POST" });
if (ranksData.value) {
    switch (ranksData.value.status) {
        case 200:
            break;
        // No need permission check for getting ranks (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}

const {
    data: specialtiesData,
    status: specialtiesStatus,
    refresh: specialtiesRefresh,
} = await useFetch<APIResponse<Specialty[]>>("/api/specialties", {
    method: "POST",
});
if (specialtiesData.value) {
    switch (specialtiesData.value.status) {
        case 200:
            break;
        // No need permission check for getting specialties (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}

const {
    data: factionsData,
    status: factionsStatus,
    refresh: factionsRefresh,
} = await useFetch<APIResponse<Faction[]>>("/api/factions", { method: "POST" });
if (factionsData.value) {
    switch (factionsData.value.status) {
        case 200:
            break;
        // No need permission check for getting factions (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}

const {
    data: attributesData,
    status: attributesStatus,
    refresh: attributesRefresh,
} = await useFetch<APIResponse<Attribute[]>>("/api/attributes", {
    method: "POST",
});
if (attributesData.value) {
    switch (attributesData.value.status) {
        case 200:
            break;
        // No need permission check for getting attributes (no need to handle 403)
        case 401:
            userState.value = null;
            break;
    }
}
</script>

<style></style>
