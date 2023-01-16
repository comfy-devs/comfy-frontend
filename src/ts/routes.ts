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
    shows: Map<string, Show>;
    random: number;
    user: User | null;
};
type AccountConnectedProps = RouteProps & {
    dimensions: Dimensions;
    shows: Map<string, Show>;
    user: User | null;
};

type AllConnectedProps = RouteProps & {
    dimensions: Dimensions;
    shows: Map<string, Show>;
    groups: Map<string, Group>;
    filterData: FilterData;
};

type GenresConnectedProps = RouteProps & {
    shows: Map<string, Show>;
};

type SettingsConnectedProps = RouteProps & {
    user: User | null;
};

type DownloadConnectedProps = RouteProps;
type StatusConnectedProps = RouteProps;

type ShowConnectedProps = RouteProps & {
    shows: Map<string, Show>;
    episodes: Map<string, Episode>;
    user: User | null;
    id: string;
};

type EpisodeConnectedProps = RouteProps & {
    dimensions: Dimensions;
    shows: Map<string, Show>;
    episodes: Map<string, Episode>;
    encodes: Map<string, Encode>;
    segments: Map<string, Segment>;
    playerData: PlayerData;
    id: string;
};

type GroupRouteConnectedProps = RouteProps & {
    dimensions: Dimensions;
    shows: Map<string, Show>;
    groups: Map<string, Group>;
    id: string;
};

type AuthConnectedProps = RouteProps & {
    authResult: AuthResult;
};
type LoginConnectedProps = AuthConnectedProps;
type RegisterConnectedProps = AuthConnectedProps;
