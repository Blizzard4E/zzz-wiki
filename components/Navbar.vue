<template>
    <div class="sticky top-0 left-0 z-[60]">
        <nav
            class="min-h-[8vh] h-2min-h-[8vh] bg-black text-white z-50 grid items-center w-full duration-300 ease-in-out"
            :style="{ transform: `translateY(${isOpen ? '0' : '-100%'})` }"
        >
            <div class="flex justify-between px-4 items-center">
                <NuxtLink to="/" class="text-3xl leading-none"
                    >ZZZ Navbar (WIP)</NuxtLink
                >
                <a href="/dashboard" class="leading-none">Dashboard</a>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
const isOpen = ref(true);
const router = useRouter();
</script>

<style></style>
