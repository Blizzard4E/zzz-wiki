<template>
    <div class="flex flex-col overflow-hidden">
        <FilmStrip :off-set="0" />
        <div
            ref="agentCarousel"
            class="flex-grow outline-black outline-[0.5vw] bg-black relative z-0 flex duration-300 ease-in-out"
        >
            <AgentFrame
                v-for="(agent, index) in agentsData?.data"
                :key="index"
                :selectedAgent="selectedAgent"
                :agent="agent"
                @select-agent="(id: number) => selectAgent(id, index)"
            />
        </div>
        <FilmStrip :top="false" :off-set="0" />
    </div>
</template>

<script lang="ts" setup>
import type { APIResponse } from "~/server/types/api";

const agentCarousel = ref<HTMLDivElement | null>(null);
const selectedAgent = ref<number | null>(null);
const runtimeConfig = useRuntimeConfig();

const {
    data: agentsData,
    status: agentsStatus,
    refresh: agentsRefresh,
} = await useFetch<APIResponse<Agent[]>>(
    `${runtimeConfig.public.apiURL}/agents`
);
if (agentsData.value) {
    switch (agentsData.value.status) {
        case 200:
            break;
    }
}

const selectAgent = (id: number, pos: number) => {
    if (!agentsData.value?.data) return;
    let posToMoveTo = 0;
    if (!agentCarousel.value) return;
    if (selectedAgent.value == id) {
        selectedAgent.value = null;
        if (pos == agentsData.value?.data?.length - 1) {
            posToMoveTo = -pos + 4;
        } else if (pos == agentsData.value?.data?.length - 2) {
            posToMoveTo = -pos + 3;
        } else if (pos == agentsData.value?.data?.length - 3) {
            posToMoveTo = -pos + 2;
        } else if (pos > 1) {
            posToMoveTo = -pos + 2;
        } else return;

        agentCarousel.value.style.transform = `translate(calc(${posToMoveTo}*20vw),0)`;
        return;
    }
    selectedAgent.value = id;

    if (pos == agentsData.value?.data?.length - 1) {
        posToMoveTo = -pos + 2;
    } else if (pos > 1) {
        posToMoveTo = -pos + 1;
    }
    agentCarousel.value.style.transform = `translate(calc(${posToMoveTo}*20vw),0)`;
};
</script>

<style></style>
