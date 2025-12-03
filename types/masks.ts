export interface AvatarMaskDefinition {
    round: string;
    rect: string;
    sizes: number[] | null;
}

export interface AvatarBackgroundMaskDefinition {
    header: { round: string; rect: string };
    profileHeader: { round: string; rect: string };
    botHeader: { round: string; rect: string };
}
