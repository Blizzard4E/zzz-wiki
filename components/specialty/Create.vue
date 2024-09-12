<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Create Specialty</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Specialty</DialogTitle>
                <DialogDescription
                    >Create specialty to use for agents.</DialogDescription
                >
            </DialogHeader>
            <form @submit.prevent="createSpecialty" class="grid gap-4">
                <Input
                    placeholder="Specialty Name"
                    v-model="specialtyName"
                    type="text"
                />
                <ErrorMessage v-if="errorMessage">{{
                    errorMessage
                }}</ErrorMessage>
                <div class="flex justify-between">
                    <DialogClose>
                        <Button type="button">Close</Button>
                    </DialogClose>
                    <Button type="submit" :disabled="pending">
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
const specialtyName = ref();
const errorMessage = ref();
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);
const createSpecialty = async () => {
    pending.value = true;
    const response = await $fetch("/api/specialties/create", {
        method: "POST",
        body: {
            name: specialtyName.value,
        },
    });
    pending.value = false;
    switch (response.status) {
        case 201:
            errorMessage.value = undefined;
            specialtyName.value = undefined;
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
            errorMessage.value = "Unable to create specialty.";
    }
};
watch(isOpen, async () => {
    if (!isOpen.value) {
        specialtyName.value = undefined;
        errorMessage.value = undefined;
    }
});
</script>
