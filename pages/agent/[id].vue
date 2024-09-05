<template>
    <div
        @mousemove="handleMouseMove"
        class="bg-zblack h-screen min-w-screen text-white relative overflow-hidden"
        :style="{
            backgroundImage:
                'linear-gradient(rgba(18,18,18,0.87),rgba(18,18,18,0.87)),url(/ui/film_strip_bg.png)',
            backgroundSize: '0.8vw',
        }"
    >
        <!-- Background mindscape -->
        <div class="absolute top-0 left-0 z-0 animation-shaky select-none"">
            <img
                class="relative min-w-screen min-h-screen w-screen h-screen opacity-10 object-cover scale-105"
                :src="agent.mindscape"
                :alt="agent.name + ' Mindscape'"
            />
            <div
                class="absolute top-0 left-0 z-0 scale-105"
                :style="{
                    WebkitMaskImage: 'url(/ui/z_bg.png)',
                    maskImage: 'url(/ui/z_bg.png)',
                    maskSize: 'cover',
                    maskRepeat: 'no-repeat',
                }"
            >
                <img
                    class="relative min-w-screen min-h-screen w-screen h-screen opacity-20 object-cover z-10"
                    :src="agent.mindscape"
                    :alt="agent.name + ' Mindscape'"
                />
                <div
                    class="absolute top-0 left-0 bg-zdarkgray w-screen h-screen z-0"
                ></div>
            </div>
        </div>
        <!-- Agent Portrait -->
        <div class="absolute bottom-[-120px] left-[-300px] animation-left-slide-in">
            <img
                class=" min-w-[1100px] w-[1100px] z-20 animation-floating"
                :src="agent.portrait"
                :alt="agent.name + ' portrait'"
            />
        </div>
        <!-- Agent's Info -->
        <div class="absolute top-[2.5vw] left-[5vw] z-20 grid gap-[0.25vw] animation-left-slide-in">
            <h2 class="text-[1.5vw] leading-[100%] text-shadow select-none">
                {{ agent.faction.name }}
            </h2>
            <h1 class="text-[5vw] leading-[100%] text-shadow select-none">
                {{ agent.name }}
            </h1>
            <div class="flex gap-2">
                <img
                    class="min-w-[3vw] w-[3vw] h-auto select-none"
                    :src="getRankIconFromRank(agent.rank)"
                    :alt="agent.rank.name + ' Rank'"
                />
                <img
                    class="min-w-[3vw] w-[3vw] select-none"
                    :src="getAttributeIconFromAttribute(agent.attribute)"
                    :alt="agent.attribute.name + ' Attribute'"
                />
            </div>
        </div>
        <!-- Agent's skill selection -->
        <div
                class="absolute bottom-[5vh] left-[50%] translate-x-[-50%] z-30 "
            >
               <div class="flex gap-4 justify-center items-center select-none  ">
                    <button
                        v-for="skill in agent.skills"
                        @click="() => changeSkill(skill)"
                        class="rounded-full bg-zblack border-[3px] outline text-white duration-300 group animation-bottom-slide-in"
                        :class="
                            selectedSkill.id == skill.id
                                ? 'outline-[1px] outline-zyellow border-zyellow'
                                : 'outline-[3px] outline-zblack border-zgray '
                        "
                    >
                        <img
                            class="w-20 h-20 group-active:scale-[0.85] duration-150"
                            :class="
                                selectedSkill.id == skill.id
                                    ? 'scale-95 brightness-[1]'
                                    : 'brightness-[0.5] hover:brightness-[1] hover:scale-95'
                            "
                            :src="getAgentSkillIconFromAgentSkill(skill)"
                            :alt="selectedSkill.type + ' Icon'"
                        />
                    </button>
               </div>
            </div>
        <!-- Agent's selected skills info -->
        <div class="animation-right-slide-in">
            <div
                v-for="skill in agent.skills"
                class="absolute top-[29.5vh] right-[5vw] w-[460px] z-30 translate-x-[150%]"
                :class="
                    selectedSkill.id == skill.id
                        ? 'animation-agent-skill-in'
                        : 'animation-agent-skill-out'
                "
            >
                <div
                    class="rounded-lg px-2 py-1 flex gap-2 items-center bg-zblack border-[3px] border-zgray outline outline-[3px] outline-zblack text-white duration-300 ease-in-out"
                >
                    <img
                        class="w-12 h-12"
                        :src="getAgentSkillIconFromAgentSkill(skill)"
                        :alt="skill.type + ' Icon'"
                    />
                    <h4 class="text-xl">{{ skill.type }}</h4>
                </div>
                <div
                    class="mt-8 flex flex-col gap-8 rounded-lg p-4 items-center bg-zblack border-[3px] border-zgray outline outline-[3px] outline-zblack text-white duration-300 ease-in-out"
                    v-html="formatSkillContent(skill.content)"
                ></div>
            </div>
        </div>
        <!-- 3D TV skill showcase -->
        <TresCanvas window-size alpha class="z-10">
            <TresPerspectiveCamera
                :args="[80, 1, 0.1, 1000]"
                :position="[0, 0.2, 3.25]"
            />
            <TresAmbientLight :intensity="1" />
            <TresDirectionalLight :position="[0, 240, 80]" />
            <Suspense>
                <AgentShowcase
                    :selectedShowcaseId="selectedSkill.id"
                    :playlist="agentPlaylist"
                    :mouse-x="mousePosition.x"
                    :mouse-y="mousePosition.y"
                />
            </Suspense>
        </TresCanvas>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
let agent = fakeAgents[Number(route.params.id)];
const agentPlaylist = agentSkillsToPlaylist(agent);
const selectedSkill = ref(agent.skills[0]);
const mousePosition = reactive({
    x: 0,
    y: 0,
});
const handleMouseMove = (event: MouseEvent) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY; 
};
const changeSkill = (skill: AgentSkill) => {
    if (selectedSkill.value == skill) return;
    selectedSkill.value = skill;
};
</script>

<style ></style>
