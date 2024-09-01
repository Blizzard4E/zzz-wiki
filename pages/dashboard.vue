<template>
    <div class="bg-zblack h-screen text-white">
        <client-only>
            <h1>Dashboard</h1>
            <div>
                Username: {{ userState?.name }} Email: {{ userState?.email }}
            </div>
            <Button @click="logout">Logout</Button>
        </client-only>
    </div>
</template>

<script lang="ts" setup>
import type { LogoutResponse } from "~/server/types/api";

const userState = useAuth();

if (import.meta.client) {
    console.log(userState.value);
}

const logout = async () => {
    try {
        const response = await $fetch<LogoutResponse>("/api/logout", {
            method: "POST",
        });
        if (response.success) {
            console.log(response.message);
            userState.value = null;
        } else {
            console.log(response.message);
        }
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
</script>

<style></style>
