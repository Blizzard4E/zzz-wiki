<template>
    <div class="flex items-center">
        <label
            :for="id"
            class="cursor-pointer h-12 px-6 rounded-full text-white bg-zdarkgray border-[3px] border-zgray outline outline-[3px] outline-zblack duration-300 ease-in-out placeholder:text-zgray focus:bg-zblack w-full flex items-center"
            >{{ files ? files[0].name : label }}</label
        >
        <input :id="id" type="file" @change="handleFileChange" class="hidden" />
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        label: string;
        id: string;
    }>(),
    {
        label: "Upload File",
    }
);
const emit = defineEmits(["change"]);
const files = ref<FileList>();

const handleFileChange = (event: Event) => {
    if (!event.target) return;
    const fileList = (event.target as HTMLInputElement).files;
    files.value = fileList as FileList;
    emit("change", files.value);
};
</script>

<style></style>
