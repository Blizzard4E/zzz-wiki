<template>
    <primitive :object="model" />
</template>

<script lang="ts" setup>
import { MeshLambertMaterial, MeshStandardMaterial, Texture } from "three";

const changeScreenTexture = () => {
    if (screenVideoTextures.length <= 0) return;
    nextShow();
    console.log("TV screen changed");
};
const changePlaylist = async (playlist: Playlist) => {
    ScreenMaterial.map = noiseTexture;
    order = 0;
    screenVideoTextures = [];
    for (let i = 0; i < playlist.videos.length; i++) {
        let screenVid = (await useVideoTexture(
            playlist.videos[i].url
        )) as Texture;
        screenVid.flipY = false;
        screenVideoTextures.push(screenVid);
    }
    nextShow();
    console.log("Finished Loading Video Textures for playlist");
};

defineExpose({ changeScreenTexture, changePlaylist });

const { scene: model, nodes } = await useGLTF("/models/Old_TV.glb");
const TVBoxTexture = await useTexture(["/textures/TV_Box.png"]);
const ScreenTexture = await useTexture(["/textures/TV_Screen_ImageTest.png"]);
let screenVideoTextures: Texture[] = [];
const noiseTexture = (await useVideoTexture("/test/noise.mp4")) as Texture;
noiseTexture.flipY = false;
let order = 0;

console.log(screenVideoTextures);
ScreenTexture.flipY = false;
const TVMaterial = new MeshStandardMaterial({ map: TVBoxTexture });
const ScreenMaterial = new MeshLambertMaterial({ map: noiseTexture });

nodes.Cube.material = TVMaterial;
nodes.Cube_1.material = ScreenMaterial;
console.log(nodes);

function nextShow() {
    order++;
    if (order > screenVideoTextures.length - 1) order = 0;
    const videoElement = screenVideoTextures[order].image as HTMLVideoElement;
    videoElement.currentTime = 0; // Reset video to the beginning
    videoElement.play(); // Ensure the video is playing
    ScreenMaterial.map = screenVideoTextures[order];

    console.log("Playing " + order);
}
</script>

<style></style>
