<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <h3 :class="cn('text-2xl leading-none text-center', props.class)">
        <slot />
    </h3>
</template>
