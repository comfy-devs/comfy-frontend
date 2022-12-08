/* Base Types */
type ReduxAction = {
    type: string;
    data: any;
};

/* Types */
type ReduxState = {
    dimensions: Dimensions;
    session: Session | null;
    users: Map<string, User>;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    episodes: Map<string, Episode>;
    encodes: Map<string, Encode>;
    segments: Map<string, Segment>;
    stats: Stats;
    random: number;
    preferences: AppPreferences;
    filterData: FilterData;
    playerData: PlayerData;
};

type ConnectedActions = {
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
    fetchEpisodeEncodes(id: string): ReduxAction;
    fetchEncode(id: string): ReduxAction;
    fetchAllEncodes(): ReduxAction;
    fetchSegment(id: string): ReduxAction;
    fetchAllSegments(): ReduxAction;
    fetchStats(): ReduxAction;
    login(username: string, password: string): ReduxAction;
    loginToken(): ReduxAction;
    register(username: string, password: string): ReduxAction;
    pushSubscribe(url: string, key: string, auth: string): ReduxAction;
    pushUnsubscribe(): ReduxAction;
    favourite(id: string): ReduxAction;
    unfavourite(id: string): ReduxAction;

    fetchPreferences(): ReduxAction;
    setPreferencesTheme(theme: string): ReduxAction;
    setPreferencesTorrent(torrent: boolean): ReduxAction;
    setPreferencesBlur(blur: boolean): ReduxAction;
    setPreferencesVolume(volume: number): ReduxAction;

    setFilterSearchTerm(searchTerm: string): ReduxAction;
    setFilterGenres(genres: AnimeGenre | null): ReduxAction;
    setFilterYear(year: number | null): ReduxAction;
    setFilterType(type: AnimeType | null): ReduxAction;
    setFilterStatus(status: AnimeStatus | null): ReduxAction;
    setFilterSort(sort: FilterSort): ReduxAction;
    setFilterTags(tags: AnimeTag | null): ReduxAction;
    setFilterItems(items: number): ReduxAction;
    setFilterGroup(group: FilterGroup): ReduxAction;
    setFilterPage(page: number): ReduxAction;

    setPlayerState(state: PlayerState): ReduxAction;
    setPlayerPreset(preset: EncodePreset): ReduxAction;
    setPlayerTheater(theater: boolean): ReduxAction;
    setPlayerSubs(subs: boolean): ReduxAction;
    setPlayerOverrideUrl(url?: string): ReduxAction;
    setPlayerOpNotification(opNotifaction: boolean): ReduxAction;
    setPlayerEdNotification(edNotifaction: boolean): ReduxAction;
    setPlayerOverlay(overlay: boolean): ReduxAction;
    setPlayerBandwith(bandwith: number): ReduxAction;
    setPlayerManifestLevels(levels: PlayerManifestLevel[]): ReduxAction;
    setPlayerManifestSubtitles(tracks: PlayerManifestTrack[]): ReduxAction;
    setPlayerManifestLevel(level: number): ReduxAction;
};
