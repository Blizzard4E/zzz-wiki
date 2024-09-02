<template>
    <div></div>
</template>

<script lang="ts" setup>
const testState = useState("testState", () => Math.random() * 100);
console.log(testState.value);
</script>

<style></style>
