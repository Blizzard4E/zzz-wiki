<template>
    <div
        class="h-screen pt-24 bg-zblack text-white bg-cover bg-no-repeat bg-center p-4"
        :style="{
            backgroundImage:
                'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url(https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/background_0_q1vqwp.webp)',
        }"
    >
        <div class="flex gap-8"><DashboardSidebar /><slot /></div>
    </div>
</template>

<script lang="ts" setup></script>

<style></style>
