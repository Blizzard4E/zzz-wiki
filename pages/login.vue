<template>
    <div
        class="h-screen bg-zblack text-white grid place-items-center bg-cover bg-no-repeat bg-center"
        :style="{
            backgroundImage:
                'linear-gradient(rgba(18,18,18,0.8),rgba(18,18,18,0.8)), url(https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/background_0_q1vqwp.webp)',
        }"
    >
        <Card class="w-[500px]">
            <CardHeader><CardTitle>Login</CardTitle></CardHeader>
            <CardContent>
                <form @submit.prevent="login" class="grid gap-4 pt-6">
                    <Input
                        placeholder="Enter email"
                        type="email"
                        v-model="email"
                    />
                    <Input
                        placeholder="Enter password"
                        type="password"
                        v-model="password"
                    />
                    <div class="flex justify-end px-2 italic">
                        <a href="" class="hover:text-zyellow transition-all"
                            >Forget Password?</a
                        >
                    </div>
                    <Button class="w-full" type="submit">Login</Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { Input } from "~/components/ui/input";
import type { LoginRequest, LoginResponse } from "~/server/types/api";
const email = ref("zzz@gmail.com");
const password = ref("zzz");
const userState = useAuth();

const login = async () => {
    const response = await $fetch<LoginResponse>("/api/login", {
        method: "POST",
        body: {
            email: email.value,
            password: password.value,
        } as LoginRequest,
    });
    if (response.success) {
        console.log(response.message);
        userState.value = response.userState;
        navigateTo("/dashboard");
    } else {
    }
};
</script>

<style></style>
