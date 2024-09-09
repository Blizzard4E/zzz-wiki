<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Edit</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Rank</DialogTitle>
                <DialogDescription
                    >Edit rank to use for agents, bangboos, and
                    w-engines.</DialogDescription
                >
            </DialogHeader>
            <form @submit.prevent="editRank" class="grid gap-4">
                <Input placeholder="Rank Name" v-model="rankName" type="text" />
                <ErrorMessage v-if="errorMessage">{{
                    errorMessage
                }}</ErrorMessage>
            </form>
            <div class="flex justify-between mt-4">
                <DialogClose>
                    <Button>Close</Button>
                </DialogClose>
                <Button :disabled="pending">
                    <span v-if="pending">Editing...</span>
                    <span v-else>Edit</span>
                </Button>
            </div>
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
const editRank = async () => {
    pending.value = true;
    const response = await $fetch(`/api/ranks/edit/${props.rank.id}`, {
        method: "PATCH",
        body: {
            name: rankName.value,
        },
    });
    pending.value = false;
    switch (response.status) {
        case 200:
            if (response.data) {
                errorMessage.value = undefined;
                rankName.value = response.data.name;
                pending.value = false;
                isOpen.value = false;
                emit("success");
            }

            break;
        case 401:
            userState.value = null;
            break;
        case 403:
            userState.value = null;
            break;
        default:
            //errorMessage.value = response.message;
            errorMessage.value = "Unable to edit rank.";
    }
};
watch(isOpen, async () => {
    if (!isOpen.value) {
        rankName.value = props.rank.name;
        errorMessage.value = undefined;
    }
});
</script>
