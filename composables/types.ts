export type Agent = {
    id: number;
    name: string;
    portrait: string;
    mindscape: string;
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

export type UserState = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
} | null;

export type Role = {
    id: number;
    name: string;
    permissions: Permission[];
};
export type Permission = {
    id: number;
    name: string;
};
