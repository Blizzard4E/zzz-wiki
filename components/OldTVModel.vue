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
    displayMaterial.map = noiseTexture;
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
let screenVideoTextures: Texture[] = [];
const { scene: model, nodes } = await useGLTF("/models/Old_TV.glb");
const boxTexture = await useTexture(["/textures/TV_Box.png"]);
const crtTexture = (await useVideoTexture(
    "/textures/crt_effect.mp4"
)) as Texture;

const noiseTexture = (await useVideoTexture("/test/noise.mp4")) as Texture;
noiseTexture.flipY = false;
let order = 0;

console.log(screenVideoTextures);
const boxMaterial = new MeshStandardMaterial({ map: boxTexture });
const displayMaterial = new MeshLambertMaterial({ map: noiseTexture });
const effectMaterial = new MeshLambertMaterial({
    map: crtTexture,
    transparent: true,
    opacity: 0.05,
});
nodes.Cube.material = boxMaterial;
nodes.Cube_1.material = displayMaterial;
nodes.Cube_2.material = effectMaterial;
console.log(nodes);

function nextShow() {
    order++;
    if (order > screenVideoTextures.length - 1) order = 0;
    const videoElement = screenVideoTextures[order].image as HTMLVideoElement;
    videoElement.currentTime = 0; // Reset video to the beginning
    videoElement.play(); // Ensure the video is playing
    displayMaterial.map = screenVideoTextures[order];

    console.log("Playing " + order);
}
</script>

<style></style>
