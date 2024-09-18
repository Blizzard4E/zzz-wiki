<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Create Agent</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Agent</DialogTitle>
                <DialogDescription> Create agent. </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="createAgent" class="grid gap-4">
                <Input
                    placeholder="Agent Name"
                    v-model="agentName"
                    type="text"
                    required
                />
                <Input
                    placeholder="Agent Description"
                    v-model="agentDescription"
                    type="text"
                />
                <InputFile
                    label="Upload Agent Portrait"
                    id="agent-create-portrait-upload"
                    @change="handlePortraitChange"
                />
                <InputFile
                    label="Upload Agent Mindscape"
                    id="agent-create-mindscape-upload"
                    @change="handleMindscapeChange"
                />

                <!-- Rank Select -->
                <Select v-model="rankId">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a rank" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="rank in ranks"
                            :value="rank.id.toString()"
                            :key="'rank-' + rank.id"
                            >{{ rank.name }}</SelectItem
                        >
                    </SelectContent>
                </Select>

                <!-- Attribute Select -->
                <Select v-model="attributeId">
                    <SelectTrigger>
                        <SelectValue placeholder="Select an attribute" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="attribute in attributes"
                            :value="attribute.id.toString()"
                            :key="'attribute-' + attribute.id"
                            >{{ attribute.name }}</SelectItem
                        >
                    </SelectContent>
                </Select>

                <!-- Specialty Select -->
                <Select v-model="specialtyId">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="specialty in specialties"
                            :value="specialty.id.toString()"
                            :key="'specialty-' + specialty.id"
                            >{{ specialty.name }}</SelectItem
                        >
                    </SelectContent>
                </Select>

                <!-- Faction Select -->
                <Select v-model="factionId">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a faction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="faction in factions"
                            :value="faction.id.toString()"
                            :key="'faction-' + faction.id"
                            ><NuxtImg
                                :src="`${runtimeConfig.public.apiURL}/get-file/${faction.icon}`"
                                width="32"
                                height="32"
                                fit="cover"
                            />{{ faction.name }}</SelectItem
                        >
                    </SelectContent>
                </Select>

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
const props = defineProps<{
    ranks?: Rank[];
    attributes?: Attribute[];
    specialties?: Specialty[];
    factions?: Faction[];
}>();
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

const isOpen = ref(false);
const agentName = ref("");
const agentDescription = ref("");
const portraitFile = ref<FileList>();
const mindscapeFile = ref<FileList>();
const rankId = ref<string>();
const attributeId = ref<string>();
const specialtyId = ref<string>();
const factionId = ref<string>();
const runtimeConfig = useRuntimeConfig();
const errorMessage = ref("");
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);

const handlePortraitChange = (uploadedFiles: FileList) => {
    portraitFile.value = uploadedFiles;
};
const handleMindscapeChange = (uploadedFiles: FileList) => {
    mindscapeFile.value = uploadedFiles;
};

const createAgent = async () => {
    let formData = new FormData();
    if (agentName.value) formData.append("name", agentName.value);
    if (agentDescription.value) {
        formData.append("description", agentDescription.value);
    }
    if (portraitFile.value) formData.append("portrait", portraitFile.value[0]);
    if (mindscapeFile.value)
        formData.append("mindscape", mindscapeFile.value[0]);
    if (rankId.value) formData.append("rank_id", rankId.value.toString());
    if (attributeId.value)
        formData.append("attribute_id", attributeId.value.toString());
    if (specialtyId.value)
        formData.append("specialty_id", specialtyId.value.toString());
    if (factionId.value)
        formData.append("faction_id", factionId.value.toString());

    pending.value = true;
    const response = await $fetch("/api/agents/create", {
        method: "POST",
        body: formData,
    });
    pending.value = false;
    switch (response.status) {
        case 201:
            resetInput();
            isOpen.value = false;
            emit("success");
            break;
        case 401:
        case 403:
            userState.value = null;
            break;
        default:
            errorMessage.value = "Unable to create agent.";
    }
};

const resetInput = () => {
    agentName.value = "";
    agentDescription.value = "";
    portraitFile.value = undefined;
    mindscapeFile.value = undefined;
    rankId.value = undefined;
    attributeId.value = undefined;
    specialtyId.value = undefined;
    factionId.value = undefined;
    errorMessage.value = "";
};

watch(isOpen, (newVal) => {
    if (!newVal) resetInput();
});
</script>
