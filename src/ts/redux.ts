import { Anime, Encode, Episode, Group, Preferences, Segment, Stats, User } from "./api";
import { AuthData, Dimensions, FilterData, PlayerData } from "./base";

/* Base Types */
export type ReduxAction = {
    type: string;
    data: any;
};

/* Types */
export type ReduxState = {
    dimensions: Dimensions;
    users: Map<string, User>;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    episodes: Map<string, Episode>;
    encodes: Map<string, Encode>;
    segments: Map<string, Segment>;
    stats: Stats;
    random: number;
    preferences: Preferences;

    filterData: FilterData;
    playerData: PlayerData;
    authData: AuthData;
};
