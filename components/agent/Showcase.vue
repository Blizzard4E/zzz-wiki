<template>
    <primitive :object="model" />
</template>

<script lang="ts" setup>
import { MeshLambertMaterial, MeshStandardMaterial, Texture } from "three";
const runtimeConfig = useRuntimeConfig();

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
        let screenVid: Texture;
        if (props.playlist.videos[i].url) {
            console.log(
                runtimeConfig.public.apiURL +
                    "/get-file/" +
                    props.playlist.videos[i].url
            );
            screenVid = (await useVideoTexture(
                runtimeConfig.public.apiURL +
                    "/get-file/" +
                    props.playlist.videos[i].url
            )) as Texture;
            screenVid.flipY = false;
        } else {
            console.log("Set null");
            screenVid = noiseTexture;
        }

        screenVideoTextures.push(screenVid);
    }
    console.log(screenVideoTextures);
    if (props.playlist.videos.length > 0) playScreen();
};

onMounted(() => {
    loadPlaylist();
});

let screenVideoTextures: Texture[] = [];

// Load in TV model
const { scene: model, nodes } = await useGLTF(
    "https://res.cloudinary.com/duzvevuup/image/upload/v1725511676/ZZZ/Old_TV_s4thmz.glb"
);

// Load in initial textures
const boxTexture = await useTexture(["/textures/TV_Box.png"]);
const crtTexture = (await useVideoTexture(
    "https://res.cloudinary.com/duzvevuup/video/upload/v1725511631/ZZZ/crt_effect_qtw9j4.mp4"
)) as Texture;
const noiseTexture = (await useVideoTexture(
    "https://res.cloudinary.com/duzvevuup/video/upload/v1725511631/ZZZ/noise_mya2l8.mp4"
)) as Texture;
noiseTexture.flipY = false;
crtTexture.flipY = false;

// Create materials
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

function playScreen() {
    if (screenVideoTextures.length > 0) {
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
        playScreen();
    }
);
</script>

<style></style>
