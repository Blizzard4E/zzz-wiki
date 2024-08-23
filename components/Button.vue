<template>
    <button
        class="py-2 px-4 rounded-full border-[6px] border-zgray bg-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-zblack hover:text-zblack grid items-center"
        v-bind="$attrs"
    >
        <slot />
    </button>
</template>

<script lang="ts" setup></script>

<style></style>
