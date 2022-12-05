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
};
type Dimensions = {
    w: number;
    h: number;
};

/* Player */
type PlayerState = "WAITING" | "TORRENT_NO_PEERS" | "TORRENT_LOADING" | "DONE";
type PlayerData = {
    state: PlayerState;
    theater: boolean;
    subs: boolean;
    overrideUrl?: string;
    opNotification: boolean;
    edNotification: boolean;
};
type VideoPlayerNotificationType = "OP" | "ED";

/* Filter */
type FilterData = {
    page: number;
    searchTerm: string;

    genres: number | null;
    year: number | null;
    type: number | null;
    status: number | null;
    sort: FilterSort;
    tags: number | null;
    items: number;
    group: FilterGroup;
};
type FilterType = "GENRES" | "YEAR" | "TYPE" | "STATUS" | "SORT" | "TAGS" | "ITEMS" | "GROUP";
type FilterSort = "TITLE_ASC" | "TITLE_DESC" | "RELEASE_ASC" | "RELEASE_DESC" | "FAVOURITES_ASC" | "FAVOURITES_DESC";
type FilterGroup = "YES" | "NO";
