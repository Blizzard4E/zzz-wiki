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
            class="absolute bottom-[1vw] left-[1vw] z-20 text-left drop-shadow-md duration-300 ease-in-out"
            :style="{
                opacity: isSelected ? 1 : 0,
                whiteSpace: isSelected ? 'normal' : 'no-wrap',
            }"
        >
            <h3
                class="text-[2.5vw] duration-300 ease-in-out w-[35vw] leading-[100%] mb-[1vw]"
            >
                {{ agent.faction.name }}
            </h3>
            <h2
                class="text-[6vw] w-[40vw] leading-[100%] duration-300 ease-in-out"
            >
                {{ agent.name }}
            </h2>
        </div>
        <img
            :src="agent.portrait"
            class="absolute bottom-0 min-w-[48vw] w-[48vw] duration-300 ease-in-out z-10"
            :style="{
                right: isSelected ? '-8vw' : '-15vw',
            }"
            :alt="agent.name"
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
