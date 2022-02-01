/* Types */
import { Anime, Episode, Group, Preferences, Segment, Session, Stats, User } from "./api";
import { ConnectedActions } from "../redux/actions";

/* Types */
export type AppConnectedProps = {
    dimensions: Dimensions;
    session: Session;
    users: Map<string, User>;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    episodes: Map<string, Episode>;
    segments: Map<string, Segment>;
    stats: Stats;
    random: number;
    preferences: Preferences;

    playerData: PlayerData;
    filterData: FilterData;
    authData: AuthData;
    actions: ConnectedActions;
};

export type Dimensions = {
    w: number;
    h: number;
};

export enum PreferencesTheme {
    DARK, LIGHT
}

export enum AuthResult {
    NONE, WAITING, FAILED_LOGIN, FAILED_REGISTER, USERNAME_TOO_SHORT, PASSWORD_TOO_SHORT, PASSWORD_NO_MATCH, USERNAME_EXISTS
}

export type AuthData = {
    username: string;
    password: string;
    password2: string;
    result: AuthResult;
};

export type PlayerData = {
    theater: boolean;
    subs: boolean;
    preset: EpisodePreset;
    opNotification: boolean;
    edNotification: boolean;
};

export enum VideoPlayerNotificationType {
    OP, ED
}

export type FilterData = {
    page: number;
    searchTerm: string;

    genres: AnimeGenre | null;
    year: number | null;
    type: AnimeType | null;
    status: AnimeStatus | null;
    sort: FilterSort;
    tags: AnimeTag | null;
    items: number;
    group: FilterGroup;
};
export enum FilterType { GENRES, YEAR, TYPE, STATUS, SORT, TAGS, ITEMS, GROUP }
export enum FilterSort { TITLE, RELEASE, FAVOURITES }
export enum FilterGroup { YES, NO }

export enum AnimeType {
    TV,
    SPECIAL,
    OVA,
    MOVIE,
    ONA,
}

export enum AnimeStatus {
    AIRING,
    FINISHED,
}

export enum AnimeGenre {
    ACTION = 1,
    ADVENTURE = 2,
    COMEDY = 4,
    DRAMA = 8,
    ECCHI = 16,
    FANTASY = 32,
    HORROR = 64,
    MAHOU_SHOUJO = 128,
    MECHA = 256,
    MUSIC = 512,
    MYSTERY = 1024,
    PSYCHOLOGICAL = 2048,
    ROMANCE = 4096,
    SCIFI = 8192,
    SLICE_OF_LIFE = 16384,
    SPORTS = 32768,
    SUPERNATURAL = 65536,
    THRILLER = 131072
}

export enum AnimeTag {
    SUBBED = 1,
    HARD_SUBBED = 2,
    DUBBED = 4,
}

export enum AnimeRating {
    PG,
    R,
}

export enum EpisodePreset {
    LOW = 1,
    MEDIUM = 2, 
    HIGH = 4,
    VP9 = 8
}

export enum EpisodeLocation {
    AKAGI, KAGA
}

export enum SegmentType {
    OP, EPISODE, ED
}
