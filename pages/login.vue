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
                    <div class="flex justify-between px-2 italic">
                        <ErrorMessage class="capitalize">{{
                            errorMessage
                        }}</ErrorMessage>
                        <a href="" class="hover:text-zyellow transition-all"
                            >Forget Password?</a
                        >
                    </div>

                    <Button class="w-full" type="submit" :disabled="pending">
                        <span v-if="pending">Logging in...</span>
                        <span v-else>Login</span></Button
                    >
                </form>
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { Input } from "~/components/ui/input";
import type { APIResponse } from "~/server/types/api";
import type { LoginRequest } from "~/server/types/request";
const email = ref("zzz@gmail.com");
const password = ref("zzz");
const userState = useAuth();
const errorMessage = ref();
const pending = ref(false);
const login = async () => {
    pending.value = true;
    const response = await $fetch<APIResponse<UserState>>("/api/login", {
        method: "POST",
        body: {
            email: email.value,
            password: password.value,
        } as LoginRequest,
    });
    pending.value = false;
    if (response.status == 200 && response.data) {
        userState.value = response.data;
        navigateTo("/dashboard");
    } else {
        console.log(response);
        errorMessage.value = response.message;
    }
};
</script>

<style></style>
