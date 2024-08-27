<template>
    <TresCanvas width clear-color="#121212" alpha
        ><TresPerspectiveCamera
            :args="[80, 1, 0.1, 1000]"
            :position="[0, 0, 3.5]"
        />
        <OrbitControls />
        <TresAmbientLight :intensity="1" />
        <TresDirectionalLight :position="[2, 240, 5]" />
        <Suspense>
            <OldTVModel />
        </Suspense>
    </TresCanvas>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const boxRef = ref();
const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
    // I will run at every frame ~ 60FPS (depending of your monitor)
    if (boxRef.value) {
        boxRef.value.rotation.y += delta;
        boxRef.value.rotation.z = elapsed * 0.2;
    }
});
</script>

<style></style>
