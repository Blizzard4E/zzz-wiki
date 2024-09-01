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
            cn(
                'flex flex-col gap-y-1.5 p-6 polka rounded-tl-3xl rounded-tr-3xl',
                props.class
            )
        "
    >
        <slot />
    </div>
</template>
