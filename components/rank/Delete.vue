<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Delete</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Rank</DialogTitle>
                <DialogDescription
                    >Delete rank to use for agents, bangboos, and
                    w-engines.</DialogDescription
                >
            </DialogHeader>
            <form class="grid gap-4">
                <Input
                    placeholder="Rank Name"
                    v-model="rankName"
                    type="text"
                    disabled
                />
                <ErrorMessage v-if="errorMessage">{{
                    errorMessage
                }}</ErrorMessage>
                <div class="flex justify-between">
                    <DialogClose>
                        <Button type="button">Close</Button>
                    </DialogClose>
                    <Button
                        @click="deleteRank"
                        :disabled="pending"
                        variant="danger"
                        type="submit"
                    >
                        <span v-if="pending"
                            ><Loader text="Deleting" class="invert"
                        /></span>
                        <span v-else>Delete</span>
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
    rank: Rank;
}>();

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const isOpen = ref();
const rankName = ref(props.rank.name);
const errorMessage = ref();
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);
const deleteRank = async () => {
    pending.value = true;
    const response = await $fetch(`/api/ranks/delete/${props.rank.id}`, {
        method: "DELETE",
    });
    pending.value = false;
    switch (response.status) {
        case 200:
            errorMessage.value = undefined;
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
            errorMessage.value = "Unable to delete rank.";
    }
};
watch(isOpen, async () => {
    if (!isOpen.value) {
        errorMessage.value = undefined;
    }
});
</script>
