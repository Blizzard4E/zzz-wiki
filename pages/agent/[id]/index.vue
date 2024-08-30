<template>
    <div
        class="bg-zblack h-screen min-w-screen text-white relative overflow-hidden"
        :style="{
            backgroundImage:
                'linear-gradient(rgba(18,18,18,0.87),rgba(18,18,18,0.87)),url(/ui/film_strip_bg.png)',
            backgroundSize: '0.8vw',
        }"
    >
        <div>
            <img
                class="absolute top-[-2.5vw] left-0 min-w-screen w-screen z-0"
                src="/ui/z_bg.png"
                alt="Background Image"
                :style="{
                    filter: 'invert(0%) sepia(4%) saturate(4353%) hue-rotate(320deg) brightness(108%) contrast(78%)',
                }"
            />
            <img
                class="absolute bottom-[-120px] left-[-300px] min-w-[1100px] w-[1100px] z-0"
                :src="agent.portrait"
                :alt="agent.name + ' portrait'"
            />
        </div>
        <img
            class="absolute top-0 left-0 w-[15vw] grayscale opacity-20"
            :src="agent.faction.icon"
            :alt="agent.faction.name + ' Icon'"
        />
        <div class="absolute top-[2.5vw] left-[5vw] z-20 grid gap-[0.25vw]">
            <h2 class="text-[1.5vw] leading-[100%]">
                {{ agent.faction.name }}
            </h2>
            <h1 class="text-[5vw] leading-[100%]">{{ agent.name }}</h1>
            <div class="flex gap-2">
                <img
                    class="min-w-[3vw] w-[3vw] h-auto"
                    :src="getRankIconFromRank(agent.rank)"
                    :alt="agent.rank.name + ' Rank'"
                />
                <img
                    class="min-w-[3vw] w-[3vw]"
                    :src="getAttributeIconFromAttribute(agent.attribute)"
                    :alt="agent.attribute.name + ' Attribute'"
                />
            </div>
        </div>
        <div class="absolute right-0 top-[50vh] z-50 flex gap-4">
            <button
                class="z-40 text-[1.15vw] py-[0.4vw] px-[0.9vw] rounded-full border-[0.5vw] border-zgray bg-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-zblack hover:text-zblack grid items-center"
                v-for="skill in agent.skills"
                @click="() => changeSkill(skill.id)"
            >
                {{ skill.type }}
            </button>
        </div>
        <TresCanvas alpha class="z-10">
            <TresPerspectiveCamera
                :args="[80, 1, 0.1, 1000]"
                :position="[0, 0, 3.5]"
            />
            <TresAmbientLight :intensity="1" />
            <TresDirectionalLight :position="[0, 240, 80]" />
            <Suspense>
                <AgentShowcase
                    :selectedShowcaseId="selectedSkillId"
                    :playlist="agentPlaylist"
                />
            </Suspense>
        </TresCanvas>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
let agent = fakeAgents[Number(route.params.id)];
const agentPlaylist = agentSkillsToPlaylist(agent);
const selectedSkillId = ref(agent.skills[1].id);

const changeSkill = (skillId: number) => {
    if (selectedSkillId.value == skillId) return;
    selectedSkillId.value = skillId;
};
</script>

<style></style>
