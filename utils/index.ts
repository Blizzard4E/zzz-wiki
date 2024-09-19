const fakeSkills: AgentSkill[] = [
    {
        id: 0,
        content:
            "<div><h3>Warmup Sparks</h3><p>Press Basic Attack to activate:<br>Unleashes up to 4 slashes, dealing Physical DMG.</p></div>",
        type: "Basic Attack",
        showcase:
            "https://res.cloudinary.com/duzvevuup/video/upload/v1725511724/ZZZ/Qingyi_Basic_Attack_qhizbl.mp4",
    },
    {
        id: 1,
        content:
            "<div><h3>Tactical Detour</h3><p>Press Dodge to activate: A rapid dodge. Character is invulnerable while using this skill.</p></div><div><h3>Firepower Offensive</h3><p>Assault Mode Press Basic Attack during a dodge to activate: Uses handgun to attack, dealing Ether DMG.</p></div>",
        type: "Dodge",
        showcase:
            "https://res.cloudinary.com/duzvevuup/video/upload/v1725511727/ZZZ/Qingyi_Basic_Hold_ipb7qz.mp4",
    },
    {
        id: 2,
        content:
            "<div><h3>Incident Management</h3><p>When the on-field character is launched in the air, press Ultimate to activate:<br>Throws a grenade at the enemy, dealing Electric DMG.<br>Character is invulnerable while using this skill.</p></div>",
        type: "Assist",
        showcase:
            "https://res.cloudinary.com/duzvevuup/video/upload/v1725511726/ZZZ/Qingyi_Charged_Attack_emrcge.mp4",
    },
    {
        id: 3,
        content:
            "<div><h3>Raging Fire</h3><p>Press Special Attack to activate:<br>Slashes enemies nearby, dealing Fire DMG.<br>Anti-Interrupt level is increased while using this skill.</p></div><div><h3>Fervent Fire</h3><p>With enough Energy, press Special Attack to activate:<br>Slashes enemies nearby, dealing massive Fire DMG.<br>Character is invulnerable while using this skill.<br>After using this skill, Soldier 11's Basic Attacks and Dash Attacks will trigger Fire Suppression for up to 15s or 8 times.</p></div>",
        type: "Special Attack",
        showcase:
            "https://res.cloudinary.com/duzvevuup/video/upload/v1725511727/ZZZ/Qingyi_Basic_Hold_ipb7qz.mp4",
    },
    {
        id: 4,
        content:
            "<div><h3>Avalanche</h3><p>When a Chain Attack is triggered, select the character to activate: Crash down from above and unleash an ice storm, dealing massive Ice DMG. Character is invulnerable while using this skill.</p></div><div><h3>Endless Winter</h3><p>When Decibel Rating is at Maximum, press Ultimate to activate: Crash down from above and unleash an ice storm before a powerful scissor strike, dealing massive Ice DMG. Character is invulnerable while using this skill.</p></div><div><h3>Avalanche</h3><p>When a Chain Attack is triggered, select the character to activate: Crash down from above and unleash an ice storm, dealing massive Ice DMG. Character is invulnerable while using this skill.</p></div><div><h3>Endless Winter</h3><p>When Decibel Rating is at Maximum, press Ultimate to activate: Crash down from above and unleash an ice storm before a powerful scissor strike, dealing massive Ice DMG. Character is invulnerable while using this skill.</p></div>",
        type: "Ultimate",
        showcase:
            "https://res.cloudinary.com/duzvevuup/video/upload/v1725511729/ZZZ/Qingyi_Ultimate_mwbkdx.mp4",
    },
];
export const fakeAgents: Agent[] = [
    {
        id: 0,
        name: "Soilder 11",
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/placeholder_agent_wbezax.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_0_v3jlgn.jpg",
        attribute: {
            id: 2,
            name: "Fire",
        },
        faction: {
            id: 0,
            name: "Obol Squad",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511168/ZZZ/placeholder_faction_mle9ms.png",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511172/ZZZ/placeholder_agent_1_kxfyez.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_1_xezcag.jpg",
        attribute: {
            id: 5,
            name: "Ether",
        },
        faction: {
            id: 1,
            name: "Criminal Investigation Special Response Team",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511169/ZZZ/placeholder_faction_1_d32cny.png",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/placeholder_agent_2_dcn27q.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_2_ulvanu.jpg",
        attribute: {
            id: 4,
            name: "Electric",
        },
        faction: {
            id: 2,
            name: "Belobog Heavy Industries",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511171/ZZZ/placeholder_faction_2_hpxcs8.png",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511172/ZZZ/placeholder_agent_3_xr4i1x.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_3_bhuzll.jpg",
        attribute: {
            id: 3,
            name: "Ice",
        },
        faction: {
            id: 3,
            name: "Victoria Housekeeping",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511171/ZZZ/placeholder_faction_3_s1rhf2.webp",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511168/ZZZ/placeholder_agent_4_uxl659.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511168/ZZZ/mind_4_hmcckt.jpg",
        attribute: {
            id: 1,
            name: "Physical",
        },
        faction: {
            id: 4,
            name: "Cunning Hares",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511171/ZZZ/placeholder_faction_4_e1u2qu.webp",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/placeholder_agent_wbezax.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_0_v3jlgn.jpg",
        attribute: {
            id: 2,
            name: "Fire",
        },
        faction: {
            id: 0,
            name: "Obol Squad",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511168/ZZZ/placeholder_faction_mle9ms.png",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511172/ZZZ/placeholder_agent_1_kxfyez.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_1_xezcag.jpg",
        attribute: {
            id: 5,
            name: "Ether",
        },
        faction: {
            id: 1,
            name: "Criminal Investigation Special Response Team",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511169/ZZZ/placeholder_faction_1_d32cny.png",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/placeholder_agent_2_dcn27q.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_2_ulvanu.jpg",
        attribute: {
            id: 4,
            name: "Electric",
        },
        faction: {
            id: 2,
            name: "Belobog Heavy Industries",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511171/ZZZ/placeholder_faction_2_hpxcs8.png",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511172/ZZZ/placeholder_agent_3_xr4i1x.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511167/ZZZ/mind_3_bhuzll.jpg",
        attribute: {
            id: 3,
            name: "Ice",
        },
        faction: {
            id: 3,
            name: "Section 6",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511171/ZZZ/placeholder_faction_3_s1rhf2.webp",
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
        portrait:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511168/ZZZ/placeholder_agent_4_uxl659.png",
        mindscape:
            "https://res.cloudinary.com/duzvevuup/image/upload/v1725511168/ZZZ/mind_4_hmcckt.jpg",
        attribute: {
            id: 1,
            name: "Physical",
        },
        faction: {
            id: 4,
            name: "Cunning Hares",
            icon: "https://res.cloudinary.com/duzvevuup/image/upload/v1725511171/ZZZ/placeholder_faction_4_e1u2qu.webp",
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
export enum Permissions {
    CreateUsers = "Create Users",
    EditUsers = "Edit Users",
    DeleteUsers = "Delete Users",
    CreateRoles = "Create Roles",
    EditRoles = "Edit Roles",
    DeleteRoles = "Delete Roles",
    CreateRanks = "Create Ranks",
    EditRanks = "Edit Ranks",
    DeleteRanks = "Delete Ranks",
    CreateAttributes = "Create Attributes",
    EditAttributes = "Edit Attributes",
    DeleteAttributes = "Delete Attributes",
    CreateSpecialties = "Create Specialties",
    EditSpecialties = "Edit Specialties",
    DeleteSpecialties = "Delete Specialties",
    CreateFactions = "Create Factions",
    EditFactions = "Edit Factions",
    DeleteFactions = "Delete Factions",
    CreateAgents = "Create Agents",
    EditAgents = "Edit Agents",
    DeleteAgents = "Delete Agents",
    CreateWEngines = "Create W_Engines",
    EditWEngines = "Edit W_Engines",
    DeleteWEngines = "Delete W_Engines",
    CreateBangboos = "Create Bangboos",
    EditBangboos = "Edit Bangboos",
    DeleteBangboos = "Delete Bangboos",
}
export function formatDateTime(dateInput: string | Date): string {
    const date = new Date(dateInput);

    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
    });

    return formatter.format(date);
}
export const getStripeBackgroundFromAttribute = (
    attribute: Attribute
): string => {
    const backgroundMap: { [key: number]: string } = {
        1: "/ui/physical_bg_stripe.png",
        2: "/ui/fire_bg_stripe.png",
        3: "/ui/ice_bg_stripe.png",
        4: "/ui/electric_bg_stripe.png",
        5: "/ui/ether_bg_stripe.png",
    };

    return backgroundMap[attribute.id] || "/ui/film_strip_bg.png";
};

export const getAttributeIconFromAttribute = (attribute: Attribute): string => {
    const iconMap: { [key: number]: string } = {
        1: "/ui/physical-attribute.webp",
        2: "/ui/fire-attribute.png",
        3: "/ui/ice-attribute.webp",
        4: "/ui/electric-attribute.webp",
        5: "/ui/ether-attribute.webp",
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
