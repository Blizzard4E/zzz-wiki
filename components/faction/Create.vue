<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Create Faction</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Faction</DialogTitle>
                <DialogDescription
                    >Create faction to use for agents, bangboos, and
                    w-engines.</DialogDescription
                >
            </DialogHeader>
            <form @submit.prevent="createFaction" class="grid gap-4">
                <Input
                    placeholder="Faction Name"
                    v-model="factionName"
                    type="text"
                />
                <Input
                    placeholder="Faction Description"
                    v-model="factionDescription"
                    type="text"
                />
                <InputFile
                    label="Upload Faction Icon"
                    id="faction-create-icon-upload"
                    @change="handleFileChange"
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
                        @click="createFaction"
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
const factionName = ref();
const factionDescription = ref();
const files = ref();
const errorMessage = ref();
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);

const handleFileChange = (uploadedFiles: FileList) => {
    files.value = uploadedFiles;
};

const createFaction = async () => {
    let formData = new FormData();
    if (factionName.value) formData.append("name", factionName.value);
    if (factionDescription.value) {
        formData.append("description", factionDescription.value);
    }
    if (files.value) {
        formData.append("icon", files.value[0]);
    }

    pending.value = true;
    const response = await $fetch("/api/factions/create", {
        method: "POST",
        body: formData,
    });
    pending.value = false;
    switch (response.status) {
        case 201:
            resetInput();
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
            errorMessage.value = "Unable to create faction.";
    }
};

const resetInput = () => {
    factionName.value = undefined;
    errorMessage.value = undefined;
    factionDescription.value = undefined;
    files.value = undefined;
};

watch(isOpen, async () => {
    if (!isOpen.value) resetInput();
});
</script>
