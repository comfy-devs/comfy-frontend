/* Types */
import { Anime, Episode, Group, Preferences, Segment, Stats, User } from "./api";
import { FilterType, AnimeGenre, Dimensions, FilterData, PlayerData, VideoPlayerNotificationType, PlayerState } from "./base";
import { ConnectedActions } from "../redux/actions";
import { SegmentData } from "../scripts/nyan/functions";

/* Types */
export type HeaderConnectedProps = {
    user?: User;
};

export type SubHeaderConnectedProps = {
    dimensions: Dimensions;
};

export type FooterConnectedProps = {
    stats: Stats;
};

export type GenreConnectedProps = {
    item: AnimeGenre;
    animes: Map<string, Anime>;
};

export type VideoPlayerConnectedProps = {
    dimensions: Dimensions;
    item: Episode;
    parent: Anime;
    segments: Segment[];
    preferences: Preferences;

    playerData: PlayerData;
    actions: ConnectedActions;
};

export type VideoPlayerOverlayConnectedProps = {
    state: PlayerState;
};

export type VideoPlayerNotificationConnectedProps = {
    type: VideoPlayerNotificationType;
    segment: SegmentData;
    video: HTMLVideoElement | null;

    actions: ConnectedActions;
};

export type VideoPlayerTorrentWrapperConnectedProps = {
    item: Episode;
    parent: Anime;
    video: HTMLVideoElement | null;

    playerData: PlayerData;
    actions: ConnectedActions;
};

export type VideoPlayerControlsConnectedProps = {
    dimensions: Dimensions;
    item: Episode;
    parent: Anime;
    segments: Segment[];
    preferences: Preferences;
    video: HTMLVideoElement | null;
    timelineTooltip: HTMLElement | null;

    playerData: PlayerData;
    actions: ConnectedActions;
};

export type VideoPlayerControlsDevConnectedProps = {
    item: Episode;
    segments: Segment[];
    setSegments: any;
    video: HTMLVideoElement | null;
};

export type AnimeCardConnectedProps = {
    item?: Anime;
    alt?: boolean;
    extra?: JSX.Element;
    preferences: Preferences;
};

export type GroupCardConnectedProps = {
    item: Group;
    children: Anime[];
};

export type EpisodeCardConnectedProps = {
    item?: Episode;
    parent: Anime;
    i: number;
    disabled?: boolean;
    preferences: Preferences;
};

export type EpisodeSmallCardConnectedProps = Record<string, never>;

export type FilterConnectedProps = {
    type: FilterType;
    value: number | null;

    filterData: FilterData;
    actions: ConnectedActions;
};

export type TopicConnectedProps = {
    dimensions: Dimensions;
    title: string;
    icon?: string;
    small?: boolean;
    extra?: number;
    items: Anime[];
    preferences: Preferences;
};

export type NavigationConnectedProps = {
    filterData: FilterData;
};

export type NavigationButtonConnectedProps = {
    i: number;

    filterData: FilterData;
};
