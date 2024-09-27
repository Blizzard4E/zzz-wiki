<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button>Create Skill</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Skill</DialogTitle>
                <DialogDescription> Create skill. </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="createSkill" class="grid gap-4">
                <Input
                    placeholder="Skill Name"
                    v-model="skillName"
                    type="text"
                    required
                />
                <textarea
                    placeholder="Skill Description"
                    v-model="skillDescription"
                    rows="4"
                    class="scroll-bar cursor-pointer h-12 px-6 py-2 rounded-3xl text-white bg-zdarkgray border-[3px] border-zgray outline outline-[3px] outline-zblack duration-300 ease-in-out placeholder:text-zgray focus:bg-zblack w-full flex items-center"
                ></textarea>
                <InputFile
                    label="Upload Skill Showcase"
                    id="skill-create-showcase-upload"
                    @change="handleShowcaseChange"
                />

                <!-- Rank Select -->
                <Select v-model="skillType">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a skill type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Basic Attack" key="Basic Attack"
                            >Basic Attack</SelectItem
                        >
                        <SelectItem value="Dodge" key="Dodge">Dodge</SelectItem>
                        <SelectItem value="Assist" key="Assist"
                            >Assist</SelectItem
                        >
                        <SelectItem value="Special Attack" key="Special Attack"
                            >Special Attack</SelectItem
                        >
                        <SelectItem value="Ultimate" key="Ultimate"
                            >Ultimate</SelectItem
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
    agentId?: number;
}>();
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import type { APIResponse } from "~/server/types/api";

const isOpen = ref(false);
const skillName = ref("");
const skillDescription = ref("");
const showcaseFile = ref<FileList>();
const skillType = ref();
const errorMessage = ref("");
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);

const handleShowcaseChange = (uploadedFiles: FileList) => {
    showcaseFile.value = uploadedFiles;
};

const createSkill = async () => {
    let formData = new FormData();

    if (skillName.value && skillDescription.value) {
        const skillContent = `<div><h3>${skillName.value}</h3><p>${skillDescription.value}</p></div>`;
        formData.append("content", skillContent);
    }
    if (skillType.value) formData.append("type", skillType.value);
    if (showcaseFile.value) formData.append("showcase", showcaseFile.value[0]);
    if (props.agentId) formData.append("agent_id", props.agentId.toString());

    pending.value = true;
    const response = await $fetch<APIResponse>("/api/agents/skills/create", {
        method: "POST",
        body: formData,
    });
    pending.value = false;
    switch (response.status) {
        case 200:
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
            errorMessage.value = "Unable to create skill.";
    }
};

const resetInput = () => {
    skillName.value = "";
    skillDescription.value = "";
    skillType.value = undefined;
    showcaseFile.value = undefined;
    errorMessage.value = "";
};

watch(isOpen, (newVal) => {
    if (!newVal) resetInput();
});
</script>
