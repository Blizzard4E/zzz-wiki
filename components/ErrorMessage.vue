<template>
    <p :class="props.class + ' text-red-500'">
        <slot />
    </p>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<style></style>
