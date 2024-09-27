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

export const agentSkillsToPlaylist = (agentSkills: AgentSkill[]): Playlist => {
    let newPlaylist: Playlist = {
        title: "Showcase",
        videos: [],
    };

    for (let i = 0; i < agentSkills.length; i++) {
        let newVid: Video = {
            id: agentSkills[i].id,
            title: agentSkills[i].type,
            url: agentSkills[i].showcase,
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

    // Detect and replace line breaks with <br> tags
    text = text.replace(/\n/g, "<br>");

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

    // Replace standard <h3> and <p> with styled ones
    text = text.replace(/<h3>/g, '<h3 class="text-xl">');
    text = text.replace(/<p>/g, '<p class="text mt-2">');

    return text;
}

export function reverseFormattedSkillContentToJSON(formattedText: string): {
    skillName: string;
    skillDescription: string;
} {
    const attributeDamagePattern = /<span class="[^"]+">([^<]+)<\/span>/g;
    const skillTypeMap: { [key: string]: string } = {
        " Basic Attack ": "/ui/basic-attack.webp",
        " Ultimate ": "/ui/ultimate.webp",
        " Special Attack ": "/ui/special-attack.webp",
        " Dodge ": "/ui/dodge.webp",
        " Assist ": "/ui/assist.webp",
    };

    // Reverse <span> elements (remove formatting but keep the raw text)
    formattedText = formattedText.replace(
        attributeDamagePattern,
        (_, match) => match
    );

    // Reverse <img> elements (convert them back to their corresponding skill type text)
    for (const skillType in skillTypeMap) {
        const imgPattern = new RegExp(
            `<img[^>]+src="${skillTypeMap[skillType]}"[^>]*>`,
            "g"
        );
        formattedText = formattedText.replace(imgPattern, skillType);
    }

    // Extract the skill name from an <h3> tag (assuming skill name is inside an <h3>)
    const skillNameMatch = formattedText.match(/<h3[^>]*>([^<]+)<\/h3>/);
    const skillName = skillNameMatch ? skillNameMatch[1].trim() : "";

    // Extract the skillDescription by stripping HTML tags and preserving raw text
    const skillDescription = formattedText
        .replace(/<h3[^>]*>[^<]*<\/h3>/g, "") // Remove the <h3> tag
        .replace(/<[^>]+>/g, "") // Remove all other HTML tags
        .trim(); // Trim any leading or trailing spaces

    return {
        skillName,
        skillDescription,
    };
}
export function combineAgentSkills(skills: AgentSkill[]): AgentSkill[] {
    // Step 1: Group the skills by type
    const groupedSkills: { [key: string]: AgentSkill[] } = {};

    skills.forEach((skill) => {
        if (!groupedSkills[skill.type]) {
            groupedSkills[skill.type] = [];
        }
        groupedSkills[skill.type].push(skill);
    });

    // Step 2: Sort each group by created_at and combine content, keep the oldest id, showcase, and created_at
    const combinedSkills: AgentSkill[] = [];

    for (const type in groupedSkills) {
        // Sort the skills by created_at within each type group (oldest first)
        groupedSkills[type].sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
        );

        // Combine the content of the sorted skills (oldest to newest)
        const combinedContent = groupedSkills[type]
            .map((skill) => skill.content)
            .join("");

        // Get the first skill in the sorted array (oldest) for id, showcase, created_at, updated_at
        const oldestSkill = groupedSkills[type][0];

        // Create a new combined AgentSkill object with the oldest skill's metadata
        combinedSkills.push({
            id: oldestSkill.id,
            content: combinedContent,
            type: type,
            showcase: oldestSkill.showcase, // Use the oldest showcase
            created_at: oldestSkill.created_at, // Keep the oldest created_at
            updated_at: oldestSkill.updated_at, // Keep the oldest updated_at
        });
    }

    // Step 3: Sort combinedSkills by the custom order of types
    const typeOrder = [
        "Basic Attack",
        "Dodge",
        "Assist",
        "Special Attack",
        "Ultimate",
    ];

    combinedSkills.sort((a, b) => {
        return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    });

    return combinedSkills;
}
