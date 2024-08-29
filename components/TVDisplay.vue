<template>
    <TresCanvas window-size clear-color="#121212" alpha class="z-0">
        <TresPerspectiveCamera
            :args="[80, 1, 0.1, 1000]"
            :position="[0, 0, 3.5]"
        />
        <OrbitControls />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[0, 240, 80]" />
        <Suspense>
            <OldTVModel ref="OldTVRef" />
        </Suspense>
    </TresCanvas>
</template>

<script lang="ts" setup>
const OldTVRef = ref();
const changeScreen = () => {
    console.log("called changeScreen");
    OldTVRef.value.changeScreenTexture();
};

const changePlaylist = (playlist: Playlist) => {
    console.log("called changePlaylist");
    OldTVRef.value.changePlaylist(playlist);
};

defineExpose({ changeScreen, changePlaylist });
</script>

<style></style>
