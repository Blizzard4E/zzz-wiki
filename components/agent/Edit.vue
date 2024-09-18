<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Edit Agent</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Agent</DialogTitle>
                <DialogDescription>
                    Edit the details of the agent.
                </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="editAgent" class="grid gap-4">
                <Input
                    placeholder="Agent Name"
                    v-model="agentName"
                    type="text"
                />
                <InputFile
                    label="Chnage Agent Portrait"
                    id="agent-create-portrait-chnage"
                    @change="handlePortraitChange"
                />
                <InputFile
                    label="Chnage Agent Mindscape"
                    id="agent-create-mindscape-chnage"
                    @change="handleMindscapeChange"
                />
                <!-- Dropdown for Rank -->
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
                <!-- Dropdown for Attribute -->
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
                <!-- Dropdown for Specialty -->
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
                <!-- Dropdown for Faction -->
                <Select v-model="factionId">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a faction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            v-for="faction in factions"
                            :value="faction.id.toString()"
                            :key="'faction-' + faction.id"
                            >{{ faction.name }}</SelectItem
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
                    <Button
                        type="submit"
                        @click="editAgent"
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
    agent: Agent;
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
const agentName = ref<string | undefined>(props.agent.name);
const rankId = ref<string | undefined>(props.agent.rank.id.toString());
const attributeId = ref<string | undefined>(
    props.agent.attribute.id.toString()
);
const specialtyId = ref<string | undefined>(
    props.agent.specialty.id.toString()
);
const factionId = ref<string | undefined>(props.agent.faction.id.toString());
const portraitFile = ref<FileList>();
const mindscapeFile = ref<FileList>();
const errorMessage = ref<string | undefined>(undefined);
const pending = ref(false);
const pendingMessage = ref("");
const { userState } = useAuth();
const emit = defineEmits(["success"]);

const handlePortraitChange = (uploadedFiles: FileList) => {
    portraitFile.value = uploadedFiles;
};
const handleMindscapeChange = (uploadedFiles: FileList) => {
    mindscapeFile.value = uploadedFiles;
};

const editAgent = async () => {
    pending.value = true;
    pendingMessage.value = "Editing Agent";

    let formData = new FormData();
    if (agentName.value && agentName.value != props.agent.name)
        formData.append("name", agentName.value);
    if (portraitFile.value) formData.append("portrait", portraitFile.value[0]);
    if (mindscapeFile.value)
        formData.append("mindscape", mindscapeFile.value[0]);
    if (rankId.value) {
        formData.append("rank_id", rankId.value.toString());
    }
    if (attributeId.value)
        formData.append("attribute_id", attributeId.value.toString());
    if (specialtyId.value)
        formData.append("specialty_id", specialtyId.value.toString());
    if (factionId.value)
        formData.append("faction_id", factionId.value.toString());
    console.log(rankId.value);
    const response = await $fetch(`/api/agents/edit/${props.agent.id}`, {
        method: "POST",
        body: formData,
    });

    pending.value = false;
    switch (response.status) {
        case 200:
            console.log(response.message);
            resetInput();
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
            errorMessage.value = "Unable to edit agent.";
    }
};

const resetInput = () => {
    agentName.value = props.agent.name;
    rankId.value = props.agent.rank.id.toString();
    attributeId.value = props.agent.attribute.id.toString();
    specialtyId.value = props.agent.specialty.id.toString();
    factionId.value = props.agent.faction.id.toString();
    portraitFile.value = undefined;
    mindscapeFile.value = undefined;
    errorMessage.value = undefined;
    pendingMessage.value = "";
};

watch(isOpen, (newVal) => {
    if (!newVal) resetInput();
});
</script>
