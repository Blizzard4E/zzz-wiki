const fakeSkills: AgentSkill[] = [
    {
        id: 0,
        content:
            "<div><h3>Warmup Sparks</h3><p>Press Basic Attack to activate:<br>Unleashes up to 4 slashes, dealing Physical DMG.</p></div>",
        type: "Basic Attack",
        showcase: "/test/Qingyi Basic Attack.mp4",
    },
    {
        id: 1,
        content:
            "<div><h3>Tactical Detour</h3><p>Press Dodge to activate: A rapid dodge. Character is invulnerable while using this skill.</p></div><div><h3>Firepower Offensive</h3><p>Assault Mode Press Basic Attack during a dodge to activate: Uses handgun to attack, dealing Ether DMG.</p></div>",
        type: "Dodge",
        showcase: "/test/Qingyi Basic Hold.mp4",
    },
    {
        id: 2,
        content:
            "<div><h3>Incident Management</h3><p>When the on-field character is launched in the air, press Ultimate to activate:<br>Throws a grenade at the enemy, dealing Electric DMG.<br>Character is invulnerable while using this skill.</p></div>",
        type: "Assist",
        showcase: "/test/Qingyi Charged Attack.mp4",
    },
    {
        id: 3,
        content:
            "<div><h3>Raging Fire</h3><p>Press Special Attack to activate:<br>Slashes enemies nearby, dealing Fire DMG.<br>Anti-Interrupt level is increased while using this skill.</p></div><div><h3>Fervent Fire</h3><p>With enough Energy, press Special Attack to activate:<br>Slashes enemies nearby, dealing massive Fire DMG.<br>Character is invulnerable while using this skill.<br>After using this skill, Soldier 11's Basic Attacks and Dash Attacks will trigger Fire Suppression for up to 15s or 8 times.</p></div>",
        type: "Special Attack",
        showcase: "/test/Qingyi Basic Hold.mp4",
    },
    {
        id: 4,
        content:
            "<div><h3>Avalanche</h3><p>When a Chain Attack is triggered, select the character to activate: Crash down from above and unleash an ice storm, dealing massive Ice DMG. Character is invulnerable while using this skill.</p></div><div><h3>Endless Winter</h3><p>When Decibel Rating is at Maximum, press Ultimate to activate: Crash down from above and unleash an ice storm before a powerful scissor strike, dealing massive Ice DMG. Character is invulnerable while using this skill.</p></div>",
        type: "Ultimate",
        showcase: "/test/Qingyi Ultimate.mp4",
    },
];
export const fakeAgents: Agent[] = [
    {
        id: 0,
        name: "Soilder 11",
        portrait: "/placeholder_agent.png",
        mindscape: "/mind_0.jpg",
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
        mindscape: "/mind_1.jpg",
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
        mindscape: "/mind_2.jpg",
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
        mindscape: "/mind_3.jpg",
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
        mindscape: "/mind_4.jpg",
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
        mindscape: "/mind_0.jpg",
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
        mindscape: "/mind_1.jpg",
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
        mindscape: "/mind_2.jpg",
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
        mindscape: "/mind_3.jpg",
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
        mindscape: "/mind_4.jpg",
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

export const getAgentSkillIconFromAgentSkill = (
    agentSkill: AgentSkill
): string => {
    const iconMap: { [key: string]: string } = {
        "Basic Attack": "/ui/basic-attack.webp",
        Dodge: "/ui/dodge.webp",
        Assist: "/ui/assist.webp",
        "Special Attack": "/ui/special-attack.webp",
        Ultimate: "/ui/ultimate.webp",
    };
    return iconMap[agentSkill.type] || "/ui/basic-attack.png";
};

export const agentSkillsToPlaylist = (agent: Agent): Playlist => {
    let newPlaylist: Playlist = {
        title: agent.name + " Showcase",
        videos: [],
    };
    for (let i = 0; i < agent.skills.length; i++) {
        let newVid: Video = {
            id: agent.skills[i].id,
            title: agent.skills[i].type,
            url: agent.skills[i].showcase,
        };
        newPlaylist.videos.push(newVid);
    }
    return newPlaylist;
};
export function formatSkillContent(text: string): string {
    const attributeDamagePattern = /(Fire|Electric|Ether|Physical|Ice) DMG/g;
    const attributeColorMap: { [key: string]: string } = {
        Fire: "text-red-500",
        Electric: "text-sky-500",
        Ether: "text-fuchsia-500",
        Physical: "text-amber-300",
        Ice: "text-cyan-300",
    };

    const skillTypeMap: { [key: string]: string } = {
        " Basic Attack ": "/ui/basic-attack.webp",
        " Ultimate ": "/ui/ultimate.webp",
        " Special Attack ": "/ui/special-attack.webp",
        " Dodge ": "/ui/dodge.webp",
        " Assist ": "/ui/assist.webp",
    };

    text = text.replace(attributeDamagePattern, (match) => {
        const elementType = match.split(" ")[0];
        const className = attributeColorMap[elementType] || "text-zyellow";
        return `<span class="${className}">${match}</span>`;
    });

    for (const skillType in skillTypeMap) {
        const imgElement = ` <img src="${skillTypeMap[skillType]}" alt="${skillType}" class="inline-skill-icon w-8 h-auto" style="display:inline; vertical-align:middle;" /> `;
        const skillTypePattern = new RegExp(skillType, "g");
        text = text.replace(skillTypePattern, imgElement);
    }

    text = text.replace(/<h3>/g, '<h3 class="text-xl">');
    text = text.replace(/<p>/g, '<p class="text mt-2">');

    return text;
}
