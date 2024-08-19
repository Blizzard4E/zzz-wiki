export type Agent = {
    id: number;
    name: string;
    portrait: string;
    attribute: Attribute;
    faction: Faction;
};

export type Attribute = {
    id: number;
    name: string;
};

export type Faction = {
    id: number;
    name: string;
    icon: string;
};
