<template>
    <div class="fixed z-[60]">
        <nav
            class="absolute top-0 left-0 min-h-20 h-2min-h-20 bg-black text-white z-50 grid items-center w-screen duration-300 ease-in-out"
            :style="{ transform: `translateY(${isOpen ? '0' : '-100%'})` }"
            @mouseenter="openNavbar"
            @mouseleave="closeNavbar"
        >
            <div class="flex justify-between px-4 items-center">
                <a href="/" class="text-3xl leading-none">ZZZ Navbar (WIP)</a>
                <a href="/dashboard" class="leading-none">Dashboard</a>
            </div>
        </nav>
        <div
            class="absolute top-0 left-0 min-h-20 h-2min-h-20 w-screen"
            @mouseenter="openNavbar"
            @mouseleave="closeNavbar"
        ></div>
    </div>
</template>

<script lang="ts" setup>
const isOpen = ref(true);

const openNavbar = () => {
    isOpen.value = true;
};

const closeNavbar = () => {
    isOpen.value = false;
};

onMounted(() => {
    setTimeout(() => {
        closeNavbar();
    }, 1500);
});
</script>

<style></style>
