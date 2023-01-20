/* Base */
type AppConnectedProps = ReduxState & {
    actions: ConnectedActions;
    user: User | null;
    dictionary: any;
};
type AppPreferences = {
    theme: "dark" | "light";
    torrent: boolean;
    lang: string;
    developer: boolean;
    blur: boolean;
    volume: number;
    progress: Map<string, number>;
};
type AuthResult = "NONE" | "USERNAME_TOO_SHORT" | "PASSWORD_TOO_SHORT" | "PASSWORD_NO_MATCH" | "NOT_FOUND" | "NOT_AUTHORIZED" | "USER_TAKEN";
type Dimensions = {
    w: number;
    h: number;
};

/* Player */
type PlayerState = "WAITING" | "TORRENT_NO_PEERS" | "TORRENT_LOADING" | "DONE";
type PlayerDataSubs = { enabled: boolean; lang: string };
type PlayerDataAudio = { lang: string };
type PlayerData = {
    state: PlayerState;
    preset: EncodePreset;
    theater: boolean;
    settings: boolean;
    overlay: boolean;
    subs: PlayerDataSubs;
    audio: PlayerDataAudio;

    opNotification: boolean;
    edNotification: boolean;
    resumeNotification: boolean;
    bandwith: number;
    manifest: PlayerManifest;
    manifestLevel: number;
};
type PlayerManifest = {
    levels: PlayerManifestLevel[];
    audio: PlayerManifestTrack[];
    subtitles: PlayerManifestTrack[];
};
type PlayerManifestLevel = {
    codecs: string;
    resolution: string;
    bitrate: number;
};
type PlayerManifestTrack = {
    name: string;
    lang: string;
};
type VideoPlayerNotificationType = "OP" | "ED" | "RESUME";

/* Filter */
type FilterData = {
    page: number;
    searchTerm: string;

    type: number | null;
    format: number | null;
    status: number | null;
    genres: number | null;
    sort: FilterSort;
    tags: number | null;
    items: number;
    group: FilterGroup;
};
type FilterType = "TYPE" | "FORMAT" | "STATUS" | "GENRES" | "SORT" | "TAGS" | "ITEMS" | "GROUP";
type FilterSort = "TITLE_ASC" | "TITLE_DESC" | "RELEASE_ASC" | "RELEASE_DESC" | "FAVOURITES_ASC" | "FAVOURITES_DESC";
type FilterGroup = "YES" | "NO";
