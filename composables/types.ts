export type Agent = {
    id: number;
    name: string;
    portrait: string;
    rank: Rank;
    specialty: Specialty;
    attribute: Attribute;
    faction: Faction;
    skills: AgentSkill[];
};

export type AgentSkill = {
    id: number;
    title: string;
    content: string;
    type: string;
    showcase: string;
};

export type Rank = {
    id: number;
    name: string;
};

export type Attribute = {
    id: number;
    name: string;
};

export type Specialty = {
    id: number;
    name: string;
};

export type Faction = {
    id: number;
    name: string;
    icon: string;
};

export type Playlist = {
    title: string;
    videos: Video[];
};
export type Video = {
    id: number;
    title: string;
    url: string;
};
