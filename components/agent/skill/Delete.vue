<template>
    <Dialog v-model:open="isOpen">
        <DialogTrigger><Button class="w-full">Delete</Button></DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Skill</DialogTitle>
                <DialogDescription>Delete skill.</DialogDescription>
            </DialogHeader>
            <form class="grid gap-4">
                <Input
                    placeholder="Skill Name"
                    v-model="skillName"
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
                        @click="deleteSkill"
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
    agent_skill: AgentSkill;
}>();

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { APIResponse } from "~/server/types/api";
const skillContent = reverseFormattedSkillContentToJSON(
    props.agent_skill.content
);
const isOpen = ref();
const skillName = ref(skillContent.skillName);
const errorMessage = ref();
const pending = ref(false);
const { userState } = useAuth();
const emit = defineEmits(["success"]);
const deleteSkill = async () => {
    pending.value = true;
    const response = await $fetch<APIResponse>(
        `/api/agents/skills/delete/${props.agent_skill.id}`,
        {
            method: "DELETE",
        }
    );
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
            errorMessage.value = "Unable to delete skill.";
    }
};
watch(isOpen, async () => {
    if (!isOpen.value) {
        errorMessage.value = undefined;
    }
});
</script>
