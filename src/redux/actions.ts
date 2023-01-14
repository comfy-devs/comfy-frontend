function getAction(type: string, data: any): ReduxAction {
    return {
        type,
        data,
    };
}

/* App */
export function setDimensions(w: number, h: number): ReduxAction {
    return getAction("SET_DIMENSIONS", { w, h });
}

/* Users */
export function createUser(username: string, password: string): ReduxAction {
    return getAction("CREATE_USER", { username, password });
}
export function createUserSuccess(user: User): ReduxAction {
    return getAction("CREATE_USER_SUCCESS", user);
}
export function fetchUser(id: string): ReduxAction {
    return getAction("FETCH_USER", id);
}
export function fetchUserSuccess(user: User): ReduxAction {
    return getAction("FETCH_USER_SUCCESS", user);
}

/* Sessions */
export function createSession(type: "classic" | "token", username?: string, password?: string): ReduxAction {
    return getAction("CREATE_SESSION", { type, username, password });
}
export function createSessionSuccess(type: "classic" | "token", session: Session): ReduxAction {
    return getAction("CREATE_SESSION_SUCCESS", { type, session });
}
export function deleteSession(): ReduxAction {
    return getAction("DELETE_SESSION", {});
}

/* Shows */
export function fetchShow(id: string): ReduxAction {
    return getAction("FETCH_SHOW", id);
}
export function fetchShowSuccess(show: Show): ReduxAction {
    return getAction("FETCH_SHOW_SUCCESS", show);
}

export function fetchAllShows(): ReduxAction {
    return getAction("FETCH_ALL_SHOWS", {});
}
export function fetchAllShowsSuccess(shows: Show[]): ReduxAction {
    return getAction("FETCH_ALL_SHOWS_SUCCESS", shows);
}

export function fetchShowEpisodes(id: string): ReduxAction {
    return getAction("FETCH_SHOW_EPISODES", id);
}
export function fetchShowEpisodesSuccess(episodes: Episode[]): ReduxAction {
    return getAction("FETCH_SHOW_EPISODES_SUCCESS", episodes);
}

/* Groups */
export function fetchGroup(id: string): ReduxAction {
    return getAction("FETCH_GROUP", id);
}
export function fetchGroupSuccess(group: Group): ReduxAction {
    return getAction("FETCH_GROUP_SUCCESS", group);
}

export function fetchAllGroups(): ReduxAction {
    return getAction("FETCH_ALL_GROUPS", {});
}
export function fetchAllGroupsSuccess(groups: Group[]): ReduxAction {
    return getAction("FETCH_ALL_GROUPS_SUCCESS", groups);
}

/* Episodes */
export function fetchEpisode(id: string): ReduxAction {
    return getAction("FETCH_EPISODE", id);
}
export function fetchEpisodeSuccess(episode: Episode): ReduxAction {
    return getAction("FETCH_EPISODE_SUCCESS", episode);
}

export function fetchAllEpisodes(): ReduxAction {
    return getAction("FETCH_ALL_EPISODES", {});
}
export function fetchAllEpisodesSuccess(episodes: Episode[]): ReduxAction {
    return getAction("FETCH_ALL_EPISODES_SUCCESS", episodes);
}

export function fetchEpisodeEncodes(id: string): ReduxAction {
    return getAction("FETCH_EPISODE_ENCODES", id);
}
export function fetchEpisodeEncodesSuccess(encodes: Encode[]): ReduxAction {
    return getAction("FETCH_EPISODE_ENCODES_SUCCESS", encodes);
}

export function fetchEpisodeSegments(id: string): ReduxAction {
    return getAction("FETCH_EPISODE_SEGMENTS", id);
}
export function fetchEpisodeSegmentsSuccess(segments: Segment[]): ReduxAction {
    return getAction("FETCH_EPISODE_SEGMENTS_SUCCESS", segments);
}

/* Segments */
export function fetchSegment(id: string): ReduxAction {
    return getAction("FETCH_SEGMENT", id);
}
export function fetchSegmentSuccess(segment: Segment): ReduxAction {
    return getAction("FETCH_SEGMENT_SUCCESS", segment);
}

export function fetchAllSegments(): ReduxAction {
    return getAction("FETCH_ALL_SEGMENTS", {});
}
export function fetchAllSegmentsSuccess(segments: Segment[]): ReduxAction {
    return getAction("FETCH_ALL_SEGMENTS_SUCCESS", segments);
}

/* Stats */
export function fetchStats(): ReduxAction {
    return getAction("FETCH_STATS", {});
}
export function fetchStatsSuccess(stats: Stats): ReduxAction {
    return getAction("FETCH_STATS_SUCCESS", stats);
}

/* Authentication */
export function login(username: string, password: string): ReduxAction {
    return getAction("LOGIN", { username, password });
}
export function loginToken(): ReduxAction {
    return getAction("LOGIN_TOKEN", {});
}
export function loginSuccess(session: Session): ReduxAction {
    return getAction("LOGIN_SUCCESS", session);
}
export function register(username: string, password: string): ReduxAction {
    return getAction("REGISTER", { username, password });
}
export function registerSuccess(user: User): ReduxAction {
    return getAction("REGISTER_SUCCESS", user);
}
export function setAuthResult(result: AuthResult): ReduxAction {
    return getAction("SET_AUTH_RESULT", result);
}

/* Preferences */
export function fetchPreferences(): ReduxAction {
    return getAction("FETCH_PREFERENCES", {});
}
export function setPreferencesTheme(theme: "dark" | "light"): ReduxAction {
    return getAction("SET_PREFERENCES_THEME", theme);
}
export function setPreferencesTorrent(torrent: boolean): ReduxAction {
    return getAction("SET_PREFERENCES_TORRENT", torrent);
}
export function setPreferencesBlur(blur: boolean): ReduxAction {
    return getAction("SET_PREFERENCES_BLUR", blur);
}
export function setPreferencesVolume(volume: number): ReduxAction {
    return getAction("SET_PREFERENCES_VOLUME", volume);
}

/* Notifications */
export function pushSubscribe(url: string, key: string, auth: string): ReduxAction {
    return getAction("PUSH_SUBSCRIBE", { url, key, auth });
}
export function pushSubscribeSuccess(): ReduxAction {
    return getAction("PUSH_SUBSCRIBE_SUCCESS", {});
}

export function pushUnsubscribe(): ReduxAction {
    return getAction("PUSH_UNSUBSCRIBE", {});
}
export function pushUnsubscribeSuccess(): ReduxAction {
    return getAction("PUSH_UNSUBSCRIBE_SUCCESS", {});
}

/* Favourites */
export function favourite(id: string): ReduxAction {
    return getAction("FAVOURITE", id);
}
export function favouriteSuccess(user: User | undefined): ReduxAction {
    return getAction("FAVOURITE_SUCCESS", user);
}

/* Filters */
export function setFilterSearchTerm(searchTerm: string): ReduxAction {
    return getAction("SET_FILTER_SEARCH_TERM", searchTerm);
}

export function setFilterGenres(genres: ShowGenre | null): ReduxAction {
    return getAction("SET_FILTER_GENRES", genres);
}

export function setFilterYear(year: number | null): ReduxAction {
    return getAction("SET_FILTER_YEAR", year);
}

export function setFilterType(type: ShowType | null): ReduxAction {
    return getAction("SET_FILTER_TYPE", type);
}

export function setFilterStatus(status: ShowStatus | null): ReduxAction {
    return getAction("SET_FILTER_STATUS", status);
}

export function setFilterSort(sort: FilterSort): ReduxAction {
    return getAction("SET_FILTER_SORT", sort);
}

export function setFilterTags(tags: ShowTag | null): ReduxAction {
    return getAction("SET_FILTER_TAGS", tags);
}

export function setFilterItems(items: number): ReduxAction {
    return getAction("SET_FILTER_ITEMS", items);
}

export function setFilterGroup(group: FilterGroup): ReduxAction {
    return getAction("SET_FILTER_GROUP", group);
}

export function setFilterPage(page: number): ReduxAction {
    return getAction("SET_FILTER_PAGE", page);
}

/* Video Player */
export function setPlayerState(state: PlayerState): ReduxAction {
    return getAction("SET_PLAYER_STATE", state);
}
export function setPlayerPreset(preset: EncodePreset): ReduxAction {
    return getAction("SET_PLAYER_PRESET", preset);
}
export function setPlayerTheater(theater: boolean): ReduxAction {
    return getAction("SET_PLAYER_THEATER", theater);
}
export function setPlayerSettings(settings: boolean): ReduxAction {
    return getAction("SET_PLAYER_SETTINGS", settings);
}
export function setPlayerOverlay(overlay: boolean): ReduxAction {
    return getAction("SET_PLAYER_OVERLAY", overlay);
}
export function setPlayerSubs(subs: PlayerDataSubs): ReduxAction {
    return getAction("SET_PLAYER_SUBS", subs);
}
export function setPlayerAudio(audio: PlayerDataAudio): ReduxAction {
    return getAction("SET_PLAYER_AUDIO", audio);
}
export function setPlayerOpNotification(opNotifaction: boolean): ReduxAction {
    return getAction("SET_PLAYER_OP_NOTIFICATION", opNotifaction);
}
export function setPlayerEdNotification(edNotifaction: boolean): ReduxAction {
    return getAction("SET_PLAYER_ED_NOTIFICATION", edNotifaction);
}
export function setPlayerManifestLevels(levels: PlayerManifestLevel[]): ReduxAction {
    return getAction("SET_PLAYER_MANIFEST_LEVELS", levels);
}
export function setPlayerManifestAudio(tracks: PlayerManifestTrack[]): ReduxAction {
    return getAction("SET_PLAYER_MANIFEST_AUDIO", tracks);
}
export function setPlayerManifestSubtitles(tracks: PlayerManifestTrack[]): ReduxAction {
    return getAction("SET_PLAYER_MANIFEST_SUBTITLES", tracks);
}
export function setPlayerManifestLevel(level: number): ReduxAction {
    return getAction("SET_PLAYER_MANIFEST_LEVEL", level);
}
export function setPlayerBandwith(bandwith: number): ReduxAction {
    return getAction("SET_PLAYER_BANDWITH", bandwith);
}
export function setPlayerOverrideUrl(url?: string): ReduxAction {
    return getAction("SET_PLAYER_OVERRIDE_URL", url);
}
