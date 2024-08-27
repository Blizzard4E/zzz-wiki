<template>
    <primitive :object="model" />
</template>

<script lang="ts" setup>
import {
    MeshLambertMaterial,
    MeshStandardMaterial,
    Texture,
    TextureLoader,
} from "three";
const { scene: model, nodes } = await useGLTF("/models/Old_TV.glb");
const TVBoxTexture = await useTexture(["/textures/TV_Box.png"]);
const ScreenTexture = await useTexture(["/textures/TV_Screen_ImageTest.png"]);
const screenVideoTextures: Texture[] = [];
const noiseTexture = (await useVideoTexture("/test/noise.mp4")) as Texture;
noiseTexture.flipY = false;
let order = 0;

for (let i = 0; i < testVideos.length; i++) {
    let screenVid = (await useVideoTexture(testVideos[i].url)) as Texture;
    screenVid.flipY = false;
    screenVideoTextures.push(screenVid);
}

console.log(screenVideoTextures);
ScreenTexture.flipY = false;
const TVMaterial = new MeshStandardMaterial({ map: TVBoxTexture });
const ScreenMaterial = new MeshLambertMaterial({ map: noiseTexture });

nodes.Cube.material = TVMaterial;
nodes.Cube_1.material = ScreenMaterial;
console.log(nodes);

function startShow() {
    order++;
    if (order > testVideos.length - 1) order = 0;
    ScreenMaterial.map = screenVideoTextures[order];
    console.log("Playing " + order);
}

// Start the interval after 2 seconds
setTimeout(() => {
    startShow();
    setInterval(() => {
        startShow();
    }, testVideos[order].duration * 1000);
}, 2000);
</script>

<style></style>
