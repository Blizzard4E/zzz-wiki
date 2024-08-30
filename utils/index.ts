const fakeSkills: AgentSkill[] = [
    {
        id: 0,
        title: "Warmup Sparks",
        content:
            "Slashes enemies in front, dealing Fire DMG. Character is invulnerable while using this skill.",
        type: "Basic Attack",
        showcase: "/test/Qingyi Basic Attack.mp4",
    },
    {
        id: 1,
        title: "Raging Fire",
        content:
            "Slashes enemies nearby, dealing Fire DMG. Anti-Interrupt level is increased while using this skill.",
        type: "Special Attack",
        showcase: "/test/Qingyi Basic Hold.mp4",
    },
];
export const fakeAgents: Agent[] = [
    {
        id: 0,
        name: "Soilder 11",
        portrait: "/placeholder_agent.png",
        attribute: {
            id: 0,
            name: "Fire",
        },
        faction: {
            id: 0,
            name: "Obol Squad",
            icon: "/placeholder_faction.png",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 1,
        name: "Zhu Yuan",
        portrait: "/placeholder_agent_1.png",
        attribute: {
            id: 4,
            name: "Ether",
        },
        faction: {
            id: 1,
            name: "Criminal Investigation Special Response Team",
            icon: "/placeholder_faction_1.png",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 2,
        name: "Grace",
        portrait: "/placeholder_agent_2.png",
        attribute: {
            id: 1,
            name: "Electric",
        },
        faction: {
            id: 2,
            name: "Belobog Heavy Industries",
            icon: "/placeholder_faction_2.png",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 3,
        name: "Ellen Joe",
        portrait: "/placeholder_agent_3.png",
        attribute: {
            id: 2,
            name: "Ice",
        },
        faction: {
            id: 3,
            name: "Victoria Housekeeping",
            icon: "/placeholder_faction_3.webp",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 4,
        name: "Billy Kid",
        portrait: "/placeholder_agent_4.png",
        attribute: {
            id: 3,
            name: "Physical",
        },
        faction: {
            id: 4,
            name: "Cunning Hares",
            icon: "/placeholder_faction_4.webp",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 5,
        name: "Soilder 11",
        portrait: "/placeholder_agent.png",
        attribute: {
            id: 0,
            name: "Fire",
        },
        faction: {
            id: 0,
            name: "Obol Squad",
            icon: "/placeholder_faction.png",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 6,
        name: "Zhu Yuan",
        portrait: "/placeholder_agent_1.png",
        attribute: {
            id: 4,
            name: "Ether",
        },
        faction: {
            id: 1,
            name: "Criminal Investigation Special Response Team",
            icon: "/placeholder_faction_1.png",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 7,
        name: "Grace",
        portrait: "/placeholder_agent_2.png",
        attribute: {
            id: 1,
            name: "Electric",
        },
        faction: {
            id: 2,
            name: "Belobog Heavy Industries",
            icon: "/placeholder_faction_2.png",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 8,
        name: "Soukaku",
        portrait: "/placeholder_agent_3.png",
        attribute: {
            id: 2,
            name: "Ice",
        },
        faction: {
            id: 3,
            name: "Section 6",
            icon: "/placeholder_faction_3.webp",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
    {
        id: 9,
        name: "Billy Kid",
        portrait: "/placeholder_agent_4.png",
        attribute: {
            id: 3,
            name: "Physical",
        },
        faction: {
            id: 4,
            name: "Cunning Hares",
            icon: "/placeholder_faction_4.webp",
        },
        rank: {
            id: 0,
            name: "S",
        },
        specialty: {
            id: 0,
            name: "Attack",
        },
        skills: fakeSkills,
    },
];
export const getStripeBackgroundFromAttribute = (
    attribute: Attribute
): string => {
    const backgroundMap: { [key: number]: string } = {
        0: "/ui/fire_bg_stripe.png",
        1: "/ui/electric_bg_stripe.png",
        2: "/ui/ice_bg_stripe.png",
        3: "/ui/physical_bg_stripe.png",
        4: "/ui/ether_bg_stripe.png",
    };

    return backgroundMap[attribute.id] || "/ui/film_strip_bg.png";
};

export const getAttributeIconFromAttribute = (attribute: Attribute): string => {
    const iconMap: { [key: number]: string } = {
        0: "/ui/fire-attribute.png",
        1: "/ui/electric-attribute.webp",
        2: "/ui/ice-attribute.webp",
        3: "/ui/physical-attribute.webp",
        4: "/ui/ether-attribute.webp",
    };

    return iconMap[attribute.id] || "/ui/fire-attribute.png";
};

export const getRankIconFromRank = (rank: Rank): string => {
    const iconMap: { [key: number]: string } = {
        0: "/ui/s-rank.png",
    };

    return iconMap[rank.id] || "/ui/s-rank.png";
};

export const agentSkillsToPlaylist = (agent: Agent): Playlist => {
    let newPlaylist: Playlist = {
        title: agent.name + " Showcase",
        videos: [],
    };
    for (let i = 0; i < agent.skills.length; i++) {
        let newVid: Video = {
            id: agent.skills[i].id,
            title: agent.skills[i].title,
            url: agent.skills[i].showcase,
        };
        newPlaylist.videos.push(newVid);
    }
    return newPlaylist;
};
