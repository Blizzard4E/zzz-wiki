<template>
    <div>
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
const userState = useAuth();

const logout = async () => {
    const response = await $fetch("/api/logout", {
        method: "POST",
    });
    console.log("logout button", response);
    if (response.status == 200) {
        userState.value = null;
    }
};
</script>

<style></style>
