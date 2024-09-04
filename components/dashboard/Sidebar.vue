<template>
    <aside class="flex-shrink-0">
        <Card class="py-4 h-[70vh] flex flex-col justify-between">
            <div>
                <h1 class="text-3xl px-4">Dashboard</h1>
                <div class="flex flex-col mt-8">
                    <h2 class="text-zlightgray ml-4">Agents</h2>
                    <a
                        href="/dashboard/agents"
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
                    </a>
                </div>
            </div>
            <div class="px-4">
                <client-only>
                    <h2>
                        User:
                        <span class="text-zyellow">{{ userState?.name }}</span>
                    </h2>
                </client-only>
            </div>
        </Card>
    </aside>
</template>

<script lang="ts" setup>
const userState = useAuth();
const router = useRouter();
</script>

<style></style>
