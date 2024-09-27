export type LoginRequest = {
    email: string;
    password: string;
};
export type RankRequest = {
    name: string;
};
export type SpecialtyRequest = {
    name: string;
};
export type FactionRequest = {
    name: string;
    description: string;
};
export type AgentRequest = {
    name: string;
    rank_id: string;
    attribute_id: string;
    specialty_id: string;
    faction_id: string;
};
export type AgentSkillRequest = {
    name: string;
    rank_id: string;
    attribute_id: string;
    specialty_id: string;
    faction_id: string;
};
