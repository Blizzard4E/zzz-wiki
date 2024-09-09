<template>
    <div>
        <client-only>
            <h1>Dashboard</h1>
            <div>
                Username: {{ userState?.name }} Email: {{ userState?.email }}
            </div>
        </client-only>
    </div>
</template>

<script lang="ts" setup>
const { userState } = useAuth();
</script>

<style></style>
