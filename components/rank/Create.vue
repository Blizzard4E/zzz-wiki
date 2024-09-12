<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Create Rank</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Rank</DialogTitle>
                <DialogDescription
                    >Create rank to use for agents, bangboos, and
                    w-engines.</DialogDescription
                >
            </DialogHeader>
            <form @submit.prevent="createRank" class="grid gap-4">
                <Input placeholder="Rank Name" v-model="rankName" type="text" />
                <ErrorMessage v-if="errorMessage">{{
                    errorMessage
                }}</ErrorMessage>
                <div class="flex justify-between">
                    <DialogClose>
                        <Button type="button">Close</Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        @click="createRank"
                        :disabled="pending"
                    >
                        <span v-if="pending">Creating...</span>
                        <span v-else>Create</span>
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const isOpen = ref();
const rankName = ref();
const errorMessage = ref();
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);
const createRank = async () => {
    pending.value = true;
    const response = await $fetch("/api/ranks/create", {
        method: "POST",
        body: {
            name: rankName.value,
        },
    });
    pending.value = false;
    switch (response.status) {
        case 201:
            errorMessage.value = undefined;
            rankName.value = undefined;
            pending.value = false;
            isOpen.value = false;
            emit("success");
            break;
        case 401:
            userState.value = null;
            break;
        case 403:
            userState.value = null;
            break;
        default:
            //errorMessage.value = response.message;
            errorMessage.value = "Unable to create rank.";
    }
};
watch(isOpen, async () => {
    if (!isOpen.value) {
        rankName.value = undefined;
        errorMessage.value = undefined;
    }
});
</script>
