<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
    SelectItem,
    SelectItemIndicator,
    type SelectItemProps,
    SelectItemText,
    useForwardProps,
} from "radix-vue";
import { Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<
    SelectItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectItem
        v-bind="forwardedProps"
        :class="
            cn(
                'h-12 px-6 rounded-full text-white my-2 bg-zdarkgray hover:bg-zyellow hover:text-zdarkgray  border-[3px] border-zgray outline outline-[3px] outline-zblack duration-300 ease-in-out placeholder:text-zgray focus:bg-zblack relative flex w-full cursor-default select-none items-center  py-1.5 pl-10 pr-2   outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                props.class
            )
        "
    >
        <span
            class="absolute left-2 pl-4 flex h-3.5 w-3.5 items-center justify-center"
        >
            <SelectItemIndicator>
                <Check class="h-4 w-4" stroke-width="5" />
            </SelectItemIndicator>
        </span>

        <SelectItemText>
            <div class="flex items-center gap-4"><slot /></div>
        </SelectItemText>
    </SelectItem>
</template>
