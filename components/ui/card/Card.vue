<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div
        :class="
            props.class +
            ' ' +
            'outline outline-[3px] outline-zblack border-[3px] border-zgray rounded-3xl'
        "
        :style="{
            backgroundImage:
                'linear-gradient(rgba(18,18,18,0.87),rgba(18,18,18,0.87)),url(/ui/film_strip_bg.png)',
            backgroundSize: '10px',
        }"
    >
        <slot />
    </div>
</template>
