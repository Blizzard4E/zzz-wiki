<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Edit</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Faction</DialogTitle>
                <DialogDescription
                    >Edit faction to use for agents, bangboos, and
                    w-engines.</DialogDescription
                >
            </DialogHeader>
            <form @submit.prevent="editFaction" class="grid gap-4">
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
                    :id="faction.id + '-faction-icon-input'"
                    @change="handleFileChange"
                    label="Change Icon"
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
                        @click="editFaction"
                        :disabled="pending"
                    >
                        <span v-if="pending">{{ pendingMessage }}...</span>
                        <span v-else>Edit</span>
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
const props = defineProps<{
    faction: Faction;
}>();
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const isOpen = ref();
const factionName = ref<string | undefined>(props.faction.name);
const factionDescription = ref<string | undefined>(props.faction.description);
const errorMessage = ref();
const pending = ref(false);
const pendingMessage = ref("");
const { userState } = useAuth();
const emit = defineEmits(["success"]);
const files = ref();

const handleFileChange = (uploadedFiles: FileList) => {
    files.value = uploadedFiles;
};

const changeIcon = async () => {
    let formData = new FormData();
    formData.append("icon", files.value[0]);
    pendingMessage.value = "Uploading Icon";
    const response = await $fetch(
        `/api/factions/change-icon/${props.faction.id}`,
        {
            method: "POST",
            body: formData,
        }
    );
    pending.value = false;
    switch (response.status) {
        case 200:
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
            errorMessage.value = response.message;
        //errorMessage.value = "Unable to edit faction.";
    }
};

const editFaction = async () => {
    pending.value = true;
    pendingMessage.value = "Editing Info";
    const response = await $fetch(`/api/factions/edit/${props.faction.id}`, {
        method: "POST",
        body: {
            name: factionName.value,
            description: factionDescription.value,
        },
    });

    if (files.value) {
        changeIcon();
        return;
    }

    pending.value = false;
    switch (response.status) {
        case 200:
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
            errorMessage.value = "Unable to edit faction.";
    }
};

const resetInput = () => {
    factionName.value = props.faction.name;
    errorMessage.value = undefined;
    factionDescription.value = props.faction.description;
    pendingMessage.value = "";
    files.value = undefined;
};

watch(isOpen, async () => {
    if (!isOpen.value) resetInput();
});
</script>
