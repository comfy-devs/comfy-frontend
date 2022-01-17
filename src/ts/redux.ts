import { Anime, Episode, Group, Preferences, Segment, Stats, User } from "./api";
import { AnimeGenre, AnimeStatus, AnimeTag, AnimeType, AuthData, AuthResult, Dimensions, EpisodePreset, FilterData, FilterGroup, FilterSort, PlayerData, PreferencesTheme } from "./base";

/* Base Types */
export type ReduxAction = {
    type: string;
    data: any;
};

/* Types */
export type ReduxState = {
    dimensions: Dimensions;
    users: Map<string, User>;
    episodes: Map<string, Episode>;
    animes: Map<string, Anime>;
    groups: Map<string, Group>;
    segments: Map<string, Segment>;
    stats: Stats;
    random: number;
    preferences: Preferences;

    filterData: FilterData;
    playerData: PlayerData;
    authData: AuthData;
};

export type ConnectedActions = {
    setDimensions(w: number, h: number): ReduxAction;

    fetchUser(id: string): ReduxAction;
    fetchUserSuccess(user: User): ReduxAction;
    fetchAnime(id: string): ReduxAction;
    fetchAnimeSuccess(anime: Anime): ReduxAction;
    fetchAllAnimes(): ReduxAction;
    fetchAllAnimesSuccess(animes: Anime[]): ReduxAction;
    fetchAnimeEpisodes(id: string): ReduxAction;
    fetchAnimeEpisodesSuccess(episodes: Episode[]): ReduxAction;
    fetchGroup(id: string): ReduxAction;
    fetchGroupSuccess(group: Group): ReduxAction;
    fetchAllGroups(): ReduxAction;
    fetchAllGroupsSuccess(groups: Group[]): ReduxAction;
    fetchEpisode(id: string): ReduxAction;
    fetchEpisodeSuccess(episode: Episode): ReduxAction;
    fetchAllEpisodes(): ReduxAction;
    fetchAllEpisodesSuccess(episodes: Episode[]): ReduxAction;
    fetchEpisodeSegments(id: string): ReduxAction;
    fetchEpisodeSegmentsSuccess(segments: Segment[]): ReduxAction;
    fetchSegment(id: string): ReduxAction;
    fetchSegmentSuccess(segment: Segment): ReduxAction;
    fetchAllSegments(): ReduxAction;
    fetchAllSegmentsSuccess(segments: Segment[]): ReduxAction;
    fetchStats(): ReduxAction;
    fetchStatsSuccess(stats: Stats): ReduxAction;
    login(username: string, password: string): ReduxAction;
    loginToken(): ReduxAction;
    register(username: string, password: string): ReduxAction;

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
