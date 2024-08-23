export type Agent = {
    id: number;
    name: string;
    portrait: string;
    rank: Rank;
    specialty: Specialty;
    attribute: Attribute;
    faction: Faction;
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
