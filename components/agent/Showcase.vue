<template>
    <primitive :object="model" />
</template>

<script lang="ts" setup>
import { MeshLambertMaterial, MeshStandardMaterial, Texture } from "three";

const props = defineProps<{
    playlist: Playlist;
    selectedShowcaseId: number;
    mouseX: number;
    mouseY: number;
}>();

const loadPlaylist = async () => {
    displayMaterial.map = noiseTexture;
    screenVideoTextures = [];
    for (let i = 0; i < props.playlist.videos.length; i++) {
        let screenVid = (await useVideoTexture(
            props.playlist.videos[i].url
        )) as Texture;
        screenVid.flipY = false;
        screenVideoTextures.push(screenVid);
    }
    if (props.playlist.videos.length > 0) playScreen();
};

onMounted(() => {
    loadPlaylist();
});

let screenVideoTextures: Texture[] = [];
const { scene: model, nodes } = await useGLTF("/models/Old_TV.glb");
const boxTexture = await useTexture(["/textures/TV_Box.png"]);
const crtTexture = (await useVideoTexture(
    "/textures/crt_effect.mp4"
)) as Texture;

const noiseTexture = (await useVideoTexture("/test/noise.mp4")) as Texture;
noiseTexture.flipY = false;

console.log(screenVideoTextures);
const boxMaterial = new MeshStandardMaterial({ map: boxTexture });
const displayMaterial = new MeshLambertMaterial({ map: noiseTexture });
const effectMaterial = new MeshLambertMaterial({
    map: crtTexture,
    transparent: true,
    opacity: 0.08,
});
nodes.Cube.material = boxMaterial;
nodes.Cube_1.material = displayMaterial;
nodes.Cube_2.material = effectMaterial;
model.rotation.y = -Math.PI * 0.3;

function playScreen() {
    let showcaseIndex = props.playlist.videos.findIndex(
        (video: Video) => video.id === props.selectedShowcaseId
    );
    const videoElement = screenVideoTextures[showcaseIndex]
        .image as HTMLVideoElement;
    videoElement.currentTime = 0;
    videoElement.play();
    console.log("Playing " + props.playlist.videos[showcaseIndex].title);
    displayMaterial.map = screenVideoTextures[showcaseIndex];
}
function updateModelRotation() {
    const rotationRangeX = Math.PI / 12; // 15 degrees
    const rotationRangeY = Math.PI / 6;
    const mouseXRatio = props.mouseX / window.innerWidth - 0.5;
    const mouseYRatio = props.mouseY / window.innerHeight - 0.5;

    const targetRotationX = -mouseYRatio * rotationRangeX;
    const targetRotationY = -mouseXRatio * rotationRangeY;

    model.rotation.x = Math.max(
        -rotationRangeX,
        Math.min(rotationRangeX, targetRotationX)
    );
    model.rotation.y = Math.max(
        -rotationRangeY,
        Math.min(rotationRangeY, targetRotationY)
    );
}

watch(() => [props.mouseX, props.mouseY], updateModelRotation);
watch(
    () => props.selectedShowcaseId,
    (current, prev) => {
        console.log(
            `Watcher triggered. Current ID: ${current}, Previous ID: ${prev}`
        );
        playScreen();
    }
);
</script>

<style></style>
