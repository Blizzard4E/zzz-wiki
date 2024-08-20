<template>
    <div
        class="relative overflow-x-clip z-10 flex w-[200vw]"
        style="background: url(/ui/film_strip_bg.png); background-size: 0.8vw"
        :class="
            top
                ? `animation-film-stripe-move-top`
                : 'animation-film-stripe-move-bottom'
        "
        :style="{
            marginLeft: -offSet + 'vw',
        }"
    >
        <img
            class="min-w-[100vw]"
            src="/ui/film_strip.png"
            alt="Film Strip Background"
        /><img
            class="min-w-[100vw]"
            src="/ui/film_strip.png"
            alt="Film Strip Background"
        />
    </div>
</template>

<script lang="ts" setup>
export interface Props {
    offSet?: number;
    top?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    offSet: 0,
    top: true,
});
</script>

<style></style>
