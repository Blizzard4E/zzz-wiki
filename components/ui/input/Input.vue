<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<{
    (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <input
        v-model="modelValue"
        :class="
            props.class +
            ' ' +
            'h-12 px-6 rounded-full text-white bg-zdarkgray border-[3px] border-zgray outline outline-[3px] outline-zblack duration-300 ease-in-out placeholder:text-zgray focus:bg-zblack'
        "
    />
</template>
