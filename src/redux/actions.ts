function getAction(type: string, data: any): ReduxAction {
    return {
        type, data
    }
}

/* App */
export function setDimensions(w: number, h: number): ReduxAction {
    return getAction("SET_DIMENSIONS", { w, h });
}

/* Users */
export function fetchUser(id: string): ReduxAction {
    return getAction("FETCH_USER", id);
}
export function fetchUserSuccess(user: User): ReduxAction {
    return getAction("FETCH_USER_SUCCESS", user);
}

/* Animes */
export function fetchAnime(id: string): ReduxAction {
    return getAction("FETCH_ANIME", id);
}
export function fetchAnimeSuccess(anime: Anime): ReduxAction {
    return getAction("FETCH_ANIME_SUCCESS", anime);
}

export function fetchAllAnimes(): ReduxAction {
    return getAction("FETCH_ALL_ANIMES", {});
}
export function fetchAllAnimesSuccess(animes: Anime[]): ReduxAction {
    return getAction("FETCH_ALL_ANIMES_SUCCESS", animes);
}

export function fetchAnimeEpisodes(id: string): ReduxAction {
    return getAction("FETCH_ANIME_EPISODES", id);
}
export function fetchAnimeEpisodesSuccess(episodes: Episode[]): ReduxAction {
    return getAction("FETCH_ANIME_EPISODES_SUCCESS", episodes);
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

/* Preferences */
export function fetchPreferences(): ReduxAction {
    return getAction("FETCH_PREFERENCES", {});
}

export function setPreferencesTheme(theme: PreferencesTheme): ReduxAction {
    return getAction("SET_PREFERENCES_THEME", theme);
}

export function setPreferencesTorrent(torrent: PreferencesTorrent): ReduxAction {
    return getAction("SET_PREFERENCES_TORRENT", torrent);
}

export function setPreferencesBlur(blur: boolean): ReduxAction {
    return getAction("SET_PREFERENCES_BLUR", blur);
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

export function unfavourite(id: string): ReduxAction {
    return getAction("UNFAVOURITE", id);
}
export function unfavouriteSuccess(user: User | undefined): ReduxAction {
    return getAction("UNFAVOURITE_SUCCESS", user);
}

/* Filters */
export function setFilterSearchTerm(searchTerm: string): ReduxAction {
    return getAction("SET_FILTER_SEARCH_TERM", searchTerm);
}

export function setFilterGenres(genres: AnimeGenre | null): ReduxAction {
    return getAction("SET_FILTER_GENRES", genres);
}

export function setFilterYear(year: number | null): ReduxAction {
    return getAction("SET_FILTER_YEAR", year);
}

export function setFilterType(type: AnimeType | null): ReduxAction {
    return getAction("SET_FILTER_TYPE", type);
}

export function setFilterStatus(status: AnimeStatus | null): ReduxAction {
    return getAction("SET_FILTER_STATUS", status);
}

export function setFilterSort(sort: FilterSort): ReduxAction {
    return getAction("SET_FILTER_SORT", sort);
}

export function setFilterTags(tags: AnimeTag | null): ReduxAction {
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

export function setPlayerTheater(theater: boolean): ReduxAction {
    return getAction("SET_PLAYER_THEATER", theater);
}

export function setPlayerSubs(subs: boolean): ReduxAction {
    return getAction("SET_PLAYER_SUBS", subs);
}

export function setPlayerOverrideUrl(url?: string): ReduxAction {
    return getAction("SET_PLAYER_OVERRIDE_URL", url);
}

export function setPlayerOpNotification(opNotifaction: boolean): ReduxAction {
    return getAction("SET_PLAYER_OP_NOTIFICATION", opNotifaction);
}

export function setPlayerEdNotification(edNotifaction: boolean): ReduxAction {
    return getAction("SET_PLAYER_ED_NOTIFICATION", edNotifaction);
}

/* Auth */
export function setAuthUsername(username: string): ReduxAction {
    return getAction("SET_AUTH_USERNAME", username);
}

export function setAuthPassword(password: string): ReduxAction {
    return getAction("SET_AUTH_PASSWORD", password);
}

export function setAuthPassword2(password: string): ReduxAction {
    return getAction("SET_AUTH_PASSWORD_2", password);
}

export function setAuthResult(result: AuthResult): ReduxAction {
    return getAction("SET_AUTH_RESULT", result);
}