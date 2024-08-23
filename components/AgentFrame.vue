<template>
    <button
        @click="$emit('selectAgent', agent.id)"
        class="bg-gray-400 flex-shrink-0 duration-300 ease-in-out h-[34vw] border-black border-[0.5vw] relative overflow-hidden"
        :style="{
            width: (isSelected ? 60 : 20) + 'vw',
            backgroundImage: `url(${getStripeBackgroundFromAttribute(
                agent.attribute
            )})`,
            backgroundSize: '0.8vw',
        }"
    >
        <div
            class="absolute bottom-[1vw] left-[1vw] text-left duration-300 ease-in-out z-30"
            :style="{
                opacity: isSelected ? 1 : 0,
                whiteSpace: isSelected ? 'normal' : 'no-wrap',
            }"
        >
            <h3
                class="text-[2.25vw] duration-300 ease-in-out w-[30vw] leading-[100%] mb-[1vw] drop-shadow-lg"
            >
                {{ agent.faction.name }}
            </h3>
            <h2
                class="text-[6vw] w-[40vw] leading-[100%] duration-300 ease-in-out drop-shadow-lg"
            >
                {{ agent.name }}
            </h2>
        </div>
        <img
            :src="agent.portrait"
            class="absolute bottom-0 min-w-[48vw] w-[48vw] duration-300 ease-in-out z-20"
            :style="{
                right: isSelected ? '-8vw' : '-15vw',
            }"
            :alt="agent.name + ' Portrait'"
        />
        <img
            class="absolute bottom-[-5vw] left-[-5vw] min-w-[25vw] w-[25vw] grayscale duration-300 ease-in-out"
            :src="agent.faction.icon"
            :alt="agent.faction.name + ' Icon'"
            :style="{
                opacity: isSelected ? 0.3 : 0,
            }"
        />
        <div
            class="absolute top-[-4vw] left-0 text-[12vw] text-white text-left duration-300 ease-in-out uppercase text-nowrap z-10 animation-text-infinite-scroll flex flex-nowrap"
            :style="{
                opacity: isSelected ? 0.45 : 0,
            }"
        >
            <div class="mx-[2vw]">{{ agent.name }}</div>
            <div class="mx-[2vw]">{{ agent.name }}</div>
            <div class="mx-[2vw]">{{ agent.name }}</div>
            <div class="mx-[2vw]">{{ agent.name }}</div>
        </div>

        <img
            src="/ui/z_bg.png"
            class="absolute top-0 min-w-[60vw] w-[60vw] opacity-20 duration-300 ease-in-out"
            :style="{
                right: (isSelected ? 0 : -7) + 'vw',
            }"
            alt="Z Background"
        />
    </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
    selectedAgent: number | null;
    agent: Agent;
}>();
const isSelected = computed(() => props.selectedAgent === props.agent.id);
</script>

<style scoped></style>
