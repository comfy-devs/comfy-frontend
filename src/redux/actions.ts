/* Types */
import { Anime, Episode, Group, Segment, Session, Stats, User } from "../ts/api";
import { AnimeGenre, AnimeStatus, AnimeTag, AnimeType, AuthResult, EpisodePreset, FilterGroup, FilterSort, PreferencesTheme } from "../ts/base";
import { ReduxAction } from "../ts/redux";

/* App */
export function setDimensions(w: number, h: number): ReduxAction {
    return {
        type: "SET_DIMENSIONS",
        data: { w, h },
    };
}

/* Users */
export function fetchUser(id: string): ReduxAction {
    return {
        type: "FETCH_USER",
        data: id,
    };
}
export function fetchUserSuccess(user: User): ReduxAction {
    return {
        type: "FETCH_USER_SUCCESS",
        data: user,
    };
}

/* Animes */
export function fetchAnime(id: string): ReduxAction {
    return {
        type: "FETCH_ANIME",
        data: id,
    };
}
export function fetchAnimeSuccess(anime: Anime): ReduxAction {
    return {
        type: "FETCH_ANIME_SUCCESS",
        data: anime,
    };
}

export function fetchAllAnimes(): ReduxAction {
    return {
        type: "FETCH_ALL_ANIMES",
        data: {},
    };
}
export function fetchAllAnimesSuccess(animes: Anime[]): ReduxAction {
    return {
        type: "FETCH_ALL_ANIMES_SUCCESS",
        data: animes,
    };
}

export function fetchAnimeEpisodes(id: string): ReduxAction {
    return {
        type: "FETCH_ANIME_EPISODES",
        data: id,
    };
}
export function fetchAnimeEpisodesSuccess(episodes: Episode[]): ReduxAction {
    return {
        type: "FETCH_ANIME_EPISODES_SUCCESS",
        data: episodes,
    };
}

/* Groups */
export function fetchGroup(id: string): ReduxAction {
    return {
        type: "FETCH_GROUP",
        data: id,
    };
}
export function fetchGroupSuccess(group: Group): ReduxAction {
    return {
        type: "FETCH_GROUP_SUCCESS",
        data: group,
    };
}

export function fetchAllGroups(): ReduxAction {
    return {
        type: "FETCH_ALL_GROUPS",
        data: {},
    };
}
export function fetchAllGroupsSuccess(groups: Group[]): ReduxAction {
    return {
        type: "FETCH_ALL_GROUPS_SUCCESS",
        data: groups,
    };
}

/* Episodes */
export function fetchEpisode(id: string): ReduxAction {
    return {
        type: "FETCH_EPISODE",
        data: id,
    };
}
export function fetchEpisodeSuccess(episode: Episode): ReduxAction {
    return {
        type: "FETCH_EPISODE_SUCCESS",
        data: episode,
    };
}

export function fetchAllEpisodes(): ReduxAction {
    return {
        type: "FETCH_ALL_EPISODES",
        data: {},
    };
}
export function fetchAllEpisodesSuccess(episodes: Episode[]): ReduxAction {
    return {
        type: "FETCH_ALL_EPISODES_SUCCESS",
        data: episodes,
    };
}

export function fetchEpisodeSegments(id: string): ReduxAction {
    return {
        type: "FETCH_EPISODE_SEGMENTS",
        data: id,
    };
}
export function fetchEpisodeSegmentsSuccess(segments: Segment[]): ReduxAction {
    return {
        type: "FETCH_EPISODE_SEGMENTS_SUCCESS",
        data: segments,
    };
}

/* Segments */
export function fetchSegment(id: string): ReduxAction {
    return {
        type: "FETCH_SEGMENT",
        data: id,
    };
}
export function fetchSegmentSuccess(segment: Segment): ReduxAction {
    return {
        type: "FETCH_SEGMENT_SUCCESS",
        data: segment,
    };
}

export function fetchAllSegments(): ReduxAction {
    return {
        type: "FETCH_ALL_SEGMENTS",
        data: {},
    };
}
export function fetchAllSegmentsSuccess(segments: Segment[]): ReduxAction {
    return {
        type: "FETCH_ALL_SEGMENTS_SUCCESS",
        data: segments,
    };
}

/* Stats */
export function fetchStats(): ReduxAction {
    return {
        type: "FETCH_STATS",
        data: {},
    };
}
export function fetchStatsSuccess(stats: Stats): ReduxAction {
    return {
        type: "FETCH_STATS_SUCCESS",
        data: stats,
    };
}

/* Authentication */
export function login(username: string, password: string): ReduxAction {
    return {
        type: "LOGIN",
        data: { username, password },
    };
}
export function loginToken(): ReduxAction {
    return {
        type: "LOGIN_TOKEN",
        data: { },
    };
}
export function loginSuccess(session: Session): ReduxAction {
    return {
        type: "LOGIN_SUCCESS",
        data: session,
    };
}

export function register(username: string, password: string): ReduxAction {
    return {
        type: "REGISTER",
        data: { username, password },
    };
}
export function registerSuccess(user: User): ReduxAction {
    return {
        type: "REGISTER_SUCCESS",
        data: user,
    };
}

/* Preferences */
export function fetchPreferences(): ReduxAction {
    return {
        type: "FETCH_PREFERENCES",
        data: {},
    };
}

export function setPreferencesTheme(theme: PreferencesTheme): ReduxAction {
    return {
        type: "SET_PREFERENCES_THEME",
        data: theme,
    };
}

/* Notifications */
export function pushSubscribe(url: string, key: string, auth: string): ReduxAction {
    return {
        type: "PUSH_SUBSCRIBE",
        data: { url, key, auth },
    };
}
export function pushSubscribeSuccess(): ReduxAction {
    return {
        type: "PUSH_SUBSCRIBE_SUCCESS",
        data: {},
    };
}

export function pushUnsubscribe(): ReduxAction {
    return {
        type: "PUSH_UNSUBSCRIBE",
        data: {},
    };
}
export function pushUnsubscribeSuccess(): ReduxAction {
    return {
        type: "PUSH_UNSUBSCRIBE_SUCCESS",
        data: {},
    };
}

/* Filters */
export function setFilterSearchTerm(searchTerm: string): ReduxAction {
    return {
        type: "SET_FILTER_SEARCH_TERM",
        data: searchTerm,
    };
}

export function setFilterGenres(genres: AnimeGenre | null): ReduxAction {
    return {
        type: "SET_FILTER_GENRES",
        data: genres,
    };
}

export function setFilterYear(year: number | null): ReduxAction {
    return {
        type: "SET_FILTER_YEAR",
        data: year,
    };
}

export function setFilterType(type: AnimeType | null): ReduxAction {
    return {
        type: "SET_FILTER_TYPE",
        data: type,
    };
}

export function setFilterStatus(status: AnimeStatus | null): ReduxAction {
    return {
        type: "SET_FILTER_STATUS",
        data: status,
    };
}

export function setFilterSort(sort: FilterSort): ReduxAction {
    return {
        type: "SET_FILTER_SORT",
        data: sort,
    };
}

export function setFilterTags(tags: AnimeTag | null): ReduxAction {
    return {
        type: "SET_FILTER_TAGS",
        data: tags,
    };
}

export function setFilterItems(items: number): ReduxAction {
    return {
        type: "SET_FILTER_ITEMS",
        data: items,
    };
}

export function setFilterGroup(group: FilterGroup): ReduxAction {
    return {
        type: "SET_FILTER_GROUP",
        data: group,
    };
}

/* Video Player */
export function setPlayerTheater(theater: boolean): ReduxAction {
    return {
        type: "SET_PLAYER_THEATER",
        data: theater,
    };
}

export function setPlayerSubs(subs: boolean): ReduxAction {
    return {
        type: "SET_PLAYER_SUBS",
        data: subs,
    };
}

export function setPlayerPreset(preset: EpisodePreset): ReduxAction {
    return {
        type: "SET_PLAYER_PRESET",
        data: preset,
    };
}

export function setPlayerOpNotification(opNotifaction: boolean): ReduxAction {
    return {
        type: "SET_PLAYER_OP_NOTIFICATION",
        data: opNotifaction,
    };
}

export function setPlayerEdNotification(edNotifaction: boolean): ReduxAction {
    return {
        type: "SET_PLAYER_ED_NOTIFICATION",
        data: edNotifaction,
    };
}

/* Auth */
export function setAuthUsername(username: string): ReduxAction {
    return {
        type: "SET_AUTH_USERNAME",
        data: username,
    };
}

export function setAuthPassword(password: string): ReduxAction {
    return {
        type: "SET_AUTH_PASSWORD",
        data: password,
    };
}

export function setAuthPassword2(password: string): ReduxAction {
    return {
        type: "SET_AUTH_PASSWORD_2",
        data: password,
    };
}

export function setAuthResult(result: AuthResult): ReduxAction {
    return {
        type: "SET_AUTH_RESULT",
        data: result,
    };
}

export type ConnectedActions = {
    setDimensions(w: number, h: number): ReduxAction;

    fetchUser(id: string): ReduxAction;
    fetchAnime(id: string): ReduxAction;
    fetchAllAnimes(): ReduxAction;
    fetchAnimeEpisodes(id: string): ReduxAction;
    fetchGroup(id: string): ReduxAction;
    fetchAllGroups(): ReduxAction;
    fetchEpisode(id: string): ReduxAction;
    fetchAllEpisodes(): ReduxAction;
    fetchEpisodeSegments(id: string): ReduxAction;
    fetchSegment(id: string): ReduxAction;
    fetchAllSegments(): ReduxAction;
    fetchStats(): ReduxAction;
    login(username: string, password: string): ReduxAction;
    loginToken(): ReduxAction;
    register(username: string, password: string): ReduxAction;
    pushSubscribe(url: string, key: string, auth: string): ReduxAction;
    pushUnsubscribe(): ReduxAction;

    fetchPreferences(): ReduxAction;
    setPreferencesTheme(theme: PreferencesTheme): ReduxAction;

    setFilterSearchTerm(searchTerm: string): ReduxAction;
    setFilterGenres(genres: AnimeGenre | null): ReduxAction;
    setFilterYear(year: number | null): ReduxAction;
    setFilterType(type: AnimeType | null): ReduxAction;
    setFilterStatus(status: AnimeStatus | null): ReduxAction;
    setFilterSort(sort: FilterSort): ReduxAction;
    setFilterTags(tags: AnimeTag | null): ReduxAction;
    setFilterItems(items: number): ReduxAction;
    setFilterGroup(group: FilterGroup): ReduxAction;

    setPlayerTheater(theater: boolean): ReduxAction;
    setPlayerSubs(subs: boolean): ReduxAction;
    setPlayerPreset(preset: EpisodePreset): ReduxAction;
    setPlayerOpNotification(opNotifaction: boolean): ReduxAction;
    setPlayerEdNotification(edNotifaction: boolean): ReduxAction;

    setAuthUsername(username: string): ReduxAction;
    setAuthPassword(password: string): ReduxAction;
    setAuthPassword2(password: string): ReduxAction;
    setAuthResult(result: AuthResult): ReduxAction;
};
