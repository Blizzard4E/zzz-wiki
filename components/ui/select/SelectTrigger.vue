<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
    SelectIcon,
    SelectTrigger,
    type SelectTriggerProps,
    useForwardProps,
} from "radix-vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<
    SelectTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'h-12 px-6 rounded-full text-white bg-zdarkgray border-[3px] border-zgray outline outline-[3px] outline-zblack duration-300 ease-in-out placeholder:text-zgray focus:bg-zblack items-center justify-between flex',
                props.class
            )
        "
    >
        <slot />
        <SelectIcon as-child>
            <ChevronDown class="w-5 h-5 opacity-50 shrink-0" stroke-width="4" />
        </SelectIcon>
    </SelectTrigger>
</template>
