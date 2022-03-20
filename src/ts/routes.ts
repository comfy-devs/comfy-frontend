/* Types */
import { Anime, Episode, Group, Preferences, Segment, User } from "./api";
import { AuthData, Dimensions, FilterData, PlayerData } from "./base";
import { ConnectedActions } from "../redux/actions";

/* Types */
export type HomeConnectedProps = {
    dimensions: Dimensions;
    users: Map<string, User>;
    animes: Map<string, Anime>;
    episodes: Map<string, Episode>;
    groups: Map<string, Group>;
    random: number;
    preferences: Preferences;
    user?: User;

    actions: ConnectedActions;
    dictionary: any;
};

export type AllConnectedProps = {
    dimensions: Dimensions;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    filterData: FilterData;
    preferences: Preferences;

    actions: ConnectedActions;
    dictionary: Record<string, any>;
};

export type GenresConnectedProps = {
    animes: Map<string, Anime>;

    actions: ConnectedActions;
};

export type SettingsConnectedProps = {
    preferences: Preferences;
    user?: User;

    actions: ConnectedActions;
};

export type StatusConnectedProps = Record<never, never>;

export type AnimeConnectedProps = {
    animes: Map<string, Anime>;
    episodes: Map<string, Episode>;
    preferences: Preferences;
    user?: User;

    actions: ConnectedActions;
};

export type EpisodeConnectedProps = {
    dimensions: Dimensions;
    animes: Map<string, Anime>;
    episodes: Map<string, Episode>;
    segments: Map<string, Segment>;
    preferences: Preferences;
    playerData: PlayerData;

    actions: ConnectedActions;
};

export type GroupRouteConnectedProps = {
    dimensions: Dimensions;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    preferences: Preferences;

    actions: ConnectedActions;
};

export type LoginConnectedProps = {
    authData: AuthData;

    actions: ConnectedActions;
    dictionary: Record<string, any>;
};

export type RegisterConnectedProps = {
    authData: AuthData;

    actions: ConnectedActions;
    dictionary: Record<string, any>;
};
