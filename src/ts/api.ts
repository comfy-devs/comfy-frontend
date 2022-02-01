/* Types */
import { AnimeGenre, AnimeRating, AnimeStatus, AnimeTag, AnimeType, EpisodeLocation, EpisodePreset, PreferencesTheme, SegmentType } from "./base";

/* Base Types */
export type APIGetRequest = {
    path: string;
};

export type APIPostRequest = {
    path: string;
    body: any;
};

export type APIResponse = {
    status: number;
    body: any;
};

/* Types */
export type Preferences = {
    theme: PreferencesTheme;
    lang: string;
    developer: boolean;
};

export type Session = {
    id: string;
    user: string;
};

export type User = {
    id: string;
    username: string;
    pushEnabled: boolean;
};

export type Anime = {
    id: string;
    type: AnimeType;
    group: string | null;
    season: number | null;

    title: string;
    synopsis: string | null;
    episodes: number;
    favourites: number;

    status: AnimeStatus;
    genres: AnimeGenre;
    tags: AnimeTag;
    rating: AnimeRating;
    presets: EpisodePreset;
    location: EpisodeLocation;
    timestamp: number | null;
};

export type Group = {
    id: string;

    title: string;
};

export type Episode = {
    id: string;
    pos: number;
    anime: string;

    title: string;
    views: number;
};

export type Segment = {
    id: string;
    pos: number;
    episode: string;

    type: SegmentType;
    length: number;
};

export type Stats = {
    size: number;
    ammount: number;
};
