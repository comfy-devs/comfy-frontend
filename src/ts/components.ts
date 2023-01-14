/* Base */
type HeaderConnectedProps = {
    user: User | null;
};
type SubHeaderConnectedProps = {
    dimensions: Dimensions;
};
type FooterConnectedProps = {
    stats: Stats;
};

/* Types */
type GenreConnectedProps = {
    item: ShowGenre;
    shows: Map<string, Show>;
};

type VideoPlayerConnectedProps = {
    dimensions: Dimensions;
    item: Episode;
    encode: Encode | null;
    parent: Show;
    segments: Segment[];
    preferences: AppPreferences;

    playerData: PlayerData;
    actions: ConnectedActions;
};

type VideoPlayerOverlayConnectedProps = {
    state: PlayerState;
};

type SegmentData = {
    end: number;
    item: Segment | null;
};
type VideoPlayerNotificationConnectedProps = {
    type: VideoPlayerNotificationType;
    segment: SegmentData;
    video: HTMLVideoElement | null;

    actions: ConnectedActions;
};

type VideoPlayerHlsWrapperConnectedProps = {
    item: Episode;
    parent: Show;
    video: HTMLVideoElement | null;
    preferences: AppPreferences;

    playerData: PlayerData;
    actions: ConnectedActions;
};

type VideoPlayerControlsConnectedProps = {
    dimensions: Dimensions;
    item: Episode;
    encode: Encode | null;
    parent: Show;
    segments: Segment[];
    preferences: AppPreferences;
    video: HTMLVideoElement | null;
    timelineTooltip: HTMLElement | null;
    timelineText: HTMLElement | null;
    timelineCanvas: HTMLCanvasElement | null;

    playerData: PlayerData;
    actions: ConnectedActions;
};
type VideoPlayerControlsOverlayConnectedProps = {
    item: Episode;
    encode: Encode | null;
    preferences: AppPreferences;
    video: HTMLVideoElement | null;

    playerData: PlayerData;
};
type VideoPlayerControlsDevConnectedProps = {
    item: Episode;
    segments: Segment[];
    setSegments: (segments: Segment[]) => void;
    video: HTMLVideoElement | null;
};

type VideoPlayerSettingsConnectedProps = {
    item: Episode;
    encode: Encode | null;

    playerData: PlayerData;
    actions: ConnectedActions;
};

type ShowCardConnectedProps = {
    item?: Show;
    alt?: boolean;
    extra?: JSX.Element;
    preferences: AppPreferences;
};

type GroupCardConnectedProps = {
    item: Group;
    children: Show[];
};

type EpisodeCardConnectedProps = {
    item?: Episode;
    parent: Show;
    i: number;
    disabled?: boolean;
    preferences: AppPreferences;
};

type EpisodeSmallCardConnectedProps = Record<string, never>;

type FilterConnectedProps = {
    type: FilterType;
    value: any | null;

    filterData: FilterData;
    actions: ConnectedActions;
};

type TopicConnectedProps = {
    dimensions: Dimensions;
    title: string;
    icon?: string;
    small?: boolean;
    extra?: number;
    items: Show[];
    preferences: AppPreferences;
};

type NavigationConnectedProps = {
    items: number;
    page: number;
    limit: number;
    actions: ConnectedActions;
};

type NavigationButtonConnectedProps = {
    i: number;
    page: number;
    actions: ConnectedActions;
};
