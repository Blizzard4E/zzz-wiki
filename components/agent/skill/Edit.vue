<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger
            ><Button class="w-full">Edit Skill</Button></DialogTrigger
        >
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Skill</DialogTitle>
                <DialogDescription> Edit skill. </DialogDescription>
            </DialogHeader>
            <form @submit.prevent="editSkill" class="grid gap-4">
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
                    label="Change Skill Showcase"
                    id="skill-edit-showcase-upload"
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
                        <span v-else>Edit</span>
                    </Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    agent_skill: AgentSkill;
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
const skillContent = reverseFormattedSkillContentToJSON(
    props.agent_skill.content
);
const isOpen = ref(false);
const skillName = ref(skillContent.skillName);
const skillDescription = ref(skillContent.skillDescription);
const showcaseFile = ref<FileList>();
const skillType = ref(props.agent_skill.type);
const runtimeConfig = useRuntimeConfig();
const errorMessage = ref("");
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);

const handleShowcaseChange = (uploadedFiles: FileList) => {
    showcaseFile.value = uploadedFiles;
};

const editSkill = async () => {
    let formData = new FormData();

    if (skillName.value && skillDescription.value) {
        const skillContent = `<div><h3>${skillName.value}</h3><p>${skillDescription.value}</p></div>`;
        formData.append("content", skillContent);
    }
    if (skillType.value) formData.append("type", skillType.value);
    if (showcaseFile.value) formData.append("showcase", showcaseFile.value[0]);

    pending.value = true;
    const response = await $fetch<APIResponse>(
        `/api/agents/skills/edit/${props.agent_skill.id.toString()}`,
        {
            method: "POST",
            body: formData,
        }
    );
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
            errorMessage.value = "Unable to edit skill.";
            errorMessage.value = response.message;
    }
};

const resetInput = () => {
    skillName.value = skillContent.skillName;
    skillDescription.value = skillContent.skillDescription;
    skillType.value = props.agent_skill.type;
    showcaseFile.value = undefined;
    errorMessage.value = "";
};

watch(isOpen, (newVal) => {
    if (!newVal) resetInput();
});
</script>
