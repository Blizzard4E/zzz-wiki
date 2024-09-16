<template>
    <aside class="flex-shrink-0">
        <Card class="h-[85vh] py-2 flex flex-col justify-between">
            <div>
                <div>
                    <NuxtLink
                        to="/dashboard"
                        class="duration-300 ease-in-out"
                        :class="
                            router.currentRoute.value.path == '/dashboard'
                                ? 'bg-zdarkgray text-zyellow'
                                : 'hover:bg-zdarkgray hover:text-zyellow '
                        "
                        ><h3 class="ml-4 px-4 py-3">Dashboard</h3></NuxtLink
                    >
                </div>
                <div class="flex flex-col mt-8">
                    <h2 class="text-zlightgray ml-4">Agents</h2>
                    <NuxtLink
                        to="/dashboard/agents"
                        class="duration-300 ease-in-out"
                        :class="
                            router.currentRoute.value.path.startsWith(
                                '/dashboard/agents'
                            )
                                ? 'bg-zdarkgray text-zyellow'
                                : 'hover:bg-zdarkgray hover:text-zyellow '
                        "
                    >
                        <h3 class="ml-4 px-4 py-3">Agents</h3>
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/ranks"
                        class="duration-300 ease-in-out"
                        :class="
                            router.currentRoute.value.path.startsWith(
                                '/dashboard/ranks'
                            )
                                ? 'bg-zdarkgray text-zyellow'
                                : 'hover:bg-zdarkgray hover:text-zyellow '
                        "
                    >
                        <h3 class="ml-4 px-4 py-3">Ranks</h3>
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/specialties"
                        class="duration-300 ease-in-out"
                        :class="
                            router.currentRoute.value.path.startsWith(
                                '/dashboard/specialties'
                            )
                                ? 'bg-zdarkgray text-zyellow'
                                : 'hover:bg-zdarkgray hover:text-zyellow '
                        "
                    >
                        <h3 class="ml-4 px-4 py-3">Specialties</h3>
                    </NuxtLink>
                    <NuxtLink
                        to="/dashboard/factions"
                        class="duration-300 ease-in-out"
                        :class="
                            router.currentRoute.value.path.startsWith(
                                '/dashboard/factions'
                            )
                                ? 'bg-zdarkgray text-zyellow'
                                : 'hover:bg-zdarkgray hover:text-zyellow '
                        "
                    >
                        <h3 class="ml-4 px-4 py-3">Factions</h3>
                    </NuxtLink>
                </div>
            </div>
            <div class="px-4">
                <client-only>
                    <h2 class="mb-4">
                        User:
                        <span class="text-zyellow">{{ userState?.name }}</span>
                    </h2>
                </client-only>
                <Button class="w-full" @click="logout">
                    <Loader v-if="logOutPending" />
                    <span v-else>Logout</span>
                </Button>
            </div>
        </Card>
    </aside>
</template>

<script lang="ts" setup>
const { userState } = useAuth();
const router = useRouter();
const logOutPending = ref(false);

const logout = async () => {
    logOutPending.value = true;
    const response = await $fetch("/api/logout", {
        method: "POST",
    });
    if (response.status == 200) {
        userState.value = null;
        logOutPending.value = false;
        navigateTo("/");
    }
};
</script>

<style></style>
