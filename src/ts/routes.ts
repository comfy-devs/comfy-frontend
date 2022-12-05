/* Types */
type RouteProps = {
    path: string;
    session: Session | null;
    actions: ConnectedActions;
    preferences: AppPreferences;
    dictionary: any;
};

type HomeConnectedProps = RouteProps & {
    dimensions: Dimensions;
    users: Map<string, User>;
    animes: Map<string, Anime>;
    episodes: Map<string, Episode>;
    groups: Map<string, Group>;
    random: number;
    user?: User;
};

type AllConnectedProps = RouteProps & {
    dimensions: Dimensions;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    filterData: FilterData;
};

type GenresConnectedProps = RouteProps & {
    animes: Map<string, Anime>;
};

type SettingsConnectedProps = RouteProps & {
    user: User | null;
};

type DownloadConnectedProps = RouteProps;
type StatusConnectedProps = RouteProps;

type AnimeConnectedProps = RouteProps & {
    animes: Map<string, Anime>;
    episodes: Map<string, Episode>;
    user: User | null;
    id: string;
};

type EpisodeConnectedProps = RouteProps & {
    dimensions: Dimensions;
    animes: Map<string, Anime>;
    episodes: Map<string, Episode>;
    segments: Map<string, Segment>;
    playerData: PlayerData;
    id: string;
};

type GroupRouteConnectedProps = RouteProps & {
    dimensions: Dimensions;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    id: string;
};

type LoginConnectedProps = RouteProps;
type RegisterConnectedProps = RouteProps;
