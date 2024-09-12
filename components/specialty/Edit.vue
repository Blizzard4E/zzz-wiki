<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Edit</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Specialty</DialogTitle>
                <DialogDescription
                    >Edit specialty to use for agents.</DialogDescription
                >
            </DialogHeader>
            <form @submit.prevent="editSpecialty" class="grid gap-4">
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
                    <Button
                        type="submit"
                        @click="editSpecialty"
                        :disabled="pending"
                    >
                        <span v-if="pending">Editing...</span>
                        <span v-else>Edit</span>
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
    specialty: Specialty;
}>();

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const isOpen = ref();
const specialtyName = ref(props.specialty.name);
const errorMessage = ref();
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);
const editSpecialty = async () => {
    pending.value = true;
    const response = await $fetch(
        `/api/specialties/edit/${props.specialty.id}`,
        {
            method: "PATCH",
            body: {
                name: specialtyName.value,
            },
        }
    );
    pending.value = false;
    switch (response.status) {
        case 200:
            if (response.data) {
                errorMessage.value = undefined;
                specialtyName.value = response.data.name;
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
            errorMessage.value = "Unable to edit specialty.";
    }
};
watch(isOpen, async () => {
    if (!isOpen.value) {
        specialtyName.value = props.specialty.name;
        errorMessage.value = undefined;
    }
});
</script>
