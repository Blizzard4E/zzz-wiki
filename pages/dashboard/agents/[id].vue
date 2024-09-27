<template>
    <Card class="text-white w-full">
        <CardHeader>
            <div class="flex justify-between">
                <h1 class="text-2xl">{{ data?.data?.name }}'s skills</h1>
                <client-only>
                    <AgentSkillCreate
                        v-if="
                            userState?.permissions.includes(
                                Permissions.EditAgents
                            )
                        "
                        :agent-id="data?.data?.id"
                        @success="refresh"
                    />
                </client-only>
            </div>
        </CardHeader>
        <ClientOnly fallback-tag="div">
            <div v-if="status == 'success'" class="p-8 px-6 grid gap-8">
                <div
                    v-for="skill in data?.data?.agent_skills"
                    :key="`agent-skill-${skill.id}`"
                    class="flex gap-8 text-white"
                >
                    <div
                        class="w-56 flex flex-col rounded-lg p-4 gap-2 polka border-[3px] border-zgray outline outline-[3px] outline-zblack items-center"
                    >
                        <img
                            class="w-24 h-24"
                            :src="getAgentSkillIconFromAgentSkill(skill)"
                            :alt="skill.type + ' Icon'"
                        />
                        <h4 class="mb-2 text-center">{{ skill.type }}</h4>
                        <NuxtLink
                            class="h-12 px-6 rounded-full bg-zblack border-[3px] border-zgray outline outline-[3px] outline-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-white hover:text-zblack grid place-items-center disabled:bg-white disabled:border-white disabled:text-zblack"
                            target="_blank"
                            :to="`${runtimeConfig.public.apiURL}/get-file/${skill.showcase}`"
                            >Showcase</NuxtLink
                        >
                    </div>
                    <div
                        class="flex-grow rounded-lg p-4 bg-zblack border-[3px] border-zgray outline outline-[3px] outline-zblack"
                        v-html="formatSkillContent(skill.content)"
                    ></div>
                    <div class="flex flex-col gap-4 w-40">
                        <AgentSkillEdit
                            :agent_skill="skill"
                            @success="refresh"
                        />
                        <AgentSkillDelete
                            :agent_skill="skill"
                            @success="refresh"
                        />
                    </div>
                </div>
            </div>
            <div v-else class="grid place-items-center py-8">
                <Loader text="Fetching Agent's Skill" class="invert" />
            </div>
            <template #fallback>
                <div class="grid place-items-center py-8">
                    <Loader text="Fetching Agent's Skill" class="invert" />
                </div>
            </template>
        </ClientOnly>
    </Card>
</template>

<script lang="ts" setup>
import type { APIResponse } from "~/server/types/api";
import { Permissions } from "~/utils";
const { userState } = useAuth();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const agentSkills = ref<AgentSkill[]>([]);
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
