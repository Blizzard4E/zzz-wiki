<template>
    <button
        class="py-[0.4vw] px-[0.9vw] rounded-full border-[0.5vw] border-zgray bg-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-zblack hover:text-zblack grid items-center"
        v-bind="$attrs"
    >
        <slot />
    </button>
</template>

<script lang="ts" setup></script>

<style></style>
