<script setup lang="ts">
import {
    DialogRoot,
    type DialogRootEmits,
    type DialogRootProps,
    useForwardPropsEmits,
} from "radix-vue";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <client-only>
        <DialogRoot v-bind="forwarded">
            <slot />
        </DialogRoot>
    </client-only>
</template>
