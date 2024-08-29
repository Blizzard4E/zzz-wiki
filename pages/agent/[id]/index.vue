<template>
    <div class="bg-zblack min-h-screen min-w-screen text-white">
        <TVDisplay ref="TVDisplayRef" />
        <button
            @click="changeShow"
            class="relative z-10 text-[1.15vw] py-[0.4vw] px-[0.9vw] rounded-full border-[0.5vw] border-zgray bg-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-zblack hover:text-zblack grid items-center"
        >
            Next Show
        </button>
        <button
            @click="changePlaylist"
            class="relative z-10 text-[1.15vw] py-[0.4vw] px-[0.9vw] rounded-full border-[0.5vw] border-zgray bg-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-zblack hover:text-zblack grid items-center"
        >
            Change Playlist
        </button>
    </div>
</template>

<script lang="ts" setup>
const TVDisplayRef = ref();
let currentPlaylist = 0;
const changeShow = () => {
    TVDisplayRef.value.changeScreen();
};
const changePlaylist = () => {
    if (currentPlaylist == 0) {
        TVDisplayRef.value.changePlaylist(qingyiPlaylist);
        currentPlaylist = 1;
    } else {
        TVDisplayRef.value.changePlaylist(testPlaylist);
        currentPlaylist = 0;
    }
};
</script>

<style></style>
