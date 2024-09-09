<template>
    <div class="flex items-center gap-2">
        <div class="text-black">{{ text }}</div>
        <div><div class="loader flex-shrink-0"></div></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text?: string;
}>();
</script>

<style></style>
