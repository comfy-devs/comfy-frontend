/* Redux */
import { Dispatch } from "redux";
/* Types */
import { AuthResult } from "../ts/base";
import { ReduxAction, ReduxState } from "../ts/redux";
/* Redux */
import { cacheResource, cacheResources, INITIAL, ResourceType } from "./util";
import {
    favouriteSuccess,
    fetchAllAnimesSuccess,
    fetchAllEpisodesSuccess,
    fetchAllGroupsSuccess,
    fetchAllSegmentsSuccess,
    fetchAnimeEpisodesSuccess,
    fetchAnimeSuccess,
    fetchEpisodeSegmentsSuccess,
    fetchEpisodeSuccess,
    fetchGroupSuccess,
    fetchSegmentSuccess,
    fetchStatsSuccess,
    fetchUserSuccess,
    loginSuccess,
    pushSubscribeSuccess,
    pushUnsubscribeSuccess,
    registerSuccess,
    setAuthResult,
    unfavouriteSuccess,
} from "./actions";
// eslint-disable-next-line no-duplicate-imports
import { fetchUser as fetchUserAction, login as loginAction } from "./actions";
/* API */
import {
    favourite,
    fetchAllAnimes,
    fetchAllEpisodes,
    fetchAllGroups,
    fetchAllSegments,
    fetchAnime,
    fetchAnimeEpisodes,
    fetchEpisode,
    fetchEpisodeSegments,
    fetchGroup,
    fetchSegment,
    fetchStats,
    fetchUser,
    login,
    loginToken,
    pushSubscribe,
    pushUnsubscribe,
    register,
    unfavourite,
} from "../scripts/api/routes";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    SET_DIMENSIONS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, dimensions: action.data };
    },

    FETCH_PREFERENCES: (state: ReduxState) => {
        const preferences = INITIAL.preferences;

        const theme = localStorage.getItem("theme");
        if (theme !== null) {
            preferences.theme = parseInt(theme, 10);
        }
        const torrent = localStorage.getItem("torrent");
        if (torrent !== null) {
            preferences.torrent = parseInt(torrent, 10);
        }
        const lang = localStorage.getItem("lang");
        if (lang !== null) {
            preferences.lang = lang;
        }
        const developer = localStorage.getItem("developer");
        if (developer !== null) {
            preferences.developer = developer === "true";
        }
        const blur = localStorage.getItem("blur");
        if (blur !== null) {
            preferences.blur = blur === "true";
        }

        return { ...state, preferences };
    },

    LOGIN_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, session: action.data };
    },

    REGISTER_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.USER);
    },

    PUSH_SUBSCRIBE_SUCCESS: (state: ReduxState) => {
        return state;
    },

    PUSH_UNSUBSCRIBE_SUCCESS: (state: ReduxState) => {
        return state;
    },

    FAVOURITE_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        if(action.data === undefined) { return state; }
        return cacheResource(state, action.data, ResourceType.USER);
    },

    UNFAVOURITE_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        if(action.data === undefined) { return state; }
        return cacheResource(state, action.data, ResourceType.USER);
    },

    FETCH_USER_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.USER);
    },

    FETCH_ANIME_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.ANIME);
    },

    FETCH_ALL_ANIMES_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.ANIME);
    },

    FETCH_ANIME_EPISODES_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.EPISODE);
    },

    FETCH_GROUP_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.GROUP);
    },

    FETCH_ALL_GROUPS_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.GROUP);
    },

    FETCH_EPISODE_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.EPISODE);
    },

    FETCH_ALL_EPISODES_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.EPISODE);
    },

    FETCH_EPISODE_SEGMENTS_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.SEGMENT);
    },

    FETCH_EPISODE_ENCODES_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.ENCODE);
    },

    FETCH_ENCODE_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.ENCODE);
    },

    FETCH_ALL_ENCODES_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.ENCODE);
    },

    FETCH_SEGMENT_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.SEGMENT);
    },

    FETCH_ALL_SEGMENTS_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.SEGMENT);
    },

    FETCH_STATS_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, stats: action.data };
    },

    SET_PREFERENCES_THEME: (state: ReduxState, action: ReduxAction) => {
        return { ...state, preferences: { ...state.preferences, theme: action.data } };
    },

    SET_PREFERENCES_TORRENT: (state: ReduxState, action: ReduxAction) => {
        return { ...state, preferences: { ...state.preferences, torrent: action.data } };
    },

    SET_PREFERENCES_BLUR: (state: ReduxState, action: ReduxAction) => {
        return { ...state, preferences: { ...state.preferences, blur: action.data } };
    },

    SET_FILTER_SEARCH_TERM: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, searchTerm: action.data } };
    },

    SET_FILTER_GENRES: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, genres: action.data } };
    },

    SET_FILTER_YEAR: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, year: action.data } };
    },

    SET_FILTER_TYPE: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, type: action.data } };
    },

    SET_FILTER_STATUS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, status: action.data } };
    },

    SET_FILTER_SORT: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, sort: action.data } };
    },

    SET_FILTER_TAGS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, tags: action.data } };
    },

    SET_FILTER_ITEMS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, items: action.data } };
    },

    SET_FILTER_GROUP: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, group: action.data } };
    },

    SET_PLAYER_STATE: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, state: action.data } };
    },

    SET_FILTER_PAGE: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, page: action.data } };
    },

    SET_PLAYER_THEATER: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, theater: action.data } };
    },

    SET_PLAYER_SUBS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, subs: action.data } };
    },

    SET_PLAYER_PRESET: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, preset: action.data } };
    },

    SET_PLAYER_OVERRIDE_URL: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, overrideUrl: action.data } };
    },

    SET_PLAYER_OP_NOTIFICATION: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, opNotification: action.data } };
    },

    SET_PLAYER_ED_NOTIFICATION: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, edNotification: action.data } };
    },

    SET_AUTH_USERNAME: (state: ReduxState, action: ReduxAction) => {
        return { ...state, authData: { ...state.authData, username: action.data } };
    },

    SET_AUTH_PASSWORD: (state: ReduxState, action: ReduxAction) => {
        return { ...state, authData: { ...state.authData, password: action.data } };
    },

    SET_AUTH_PASSWORD_2: (state: ReduxState, action: ReduxAction) => {
        return { ...state, authData: { ...state.authData, password2: action.data } };
    },

    SET_AUTH_RESULT: (state: ReduxState, action: ReduxAction) => {
        return { ...state, authData: { ...state.authData, result: action.data } };
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    LOGIN: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await login(action.data.username, action.data.password);
        if (session === undefined) {
            dispatch(setAuthResult(AuthResult.FAILED_LOGIN));
            return;
        }

        dispatch(loginSuccess(session));
        window.location.replace("/");
    },

    LOGIN_TOKEN: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const session = await loginToken();
        if (session === undefined) {
            return;
        }

        dispatch(fetchUserAction(session.user));
        dispatch(loginSuccess(session));
    },

    REGISTER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await register(action.data.username, action.data.password);
        if (user === undefined) {
            dispatch(setAuthResult(AuthResult.FAILED_REGISTER));
            return;
        }

        dispatch(loginAction(action.data.username, action.data.password));
        dispatch(registerSuccess(user));
    },

    PUSH_SUBSCRIBE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const result = await pushSubscribe(action.data.url, action.data.key, action.data.auth);
        if (result === 200) {
            dispatch(pushSubscribeSuccess());
        }
    },

    PUSH_UNSUBSCRIBE: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const result = await pushUnsubscribe();
        if (result === 200) {
            dispatch(pushUnsubscribeSuccess());
        }
    },

    FAVOURITE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await favourite(action.data);
        dispatch(favouriteSuccess(user));
    },

    UNFAVOURITE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await unfavourite(action.data);
        dispatch(unfavouriteSuccess(user));
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await fetchUser(action.data);
        if (user === undefined) {
            return;
        }

        dispatch(fetchUserSuccess(user));
    },

    FETCH_ANIME: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const anime = await fetchAnime(action.data);
        if (anime === undefined) {
            return;
        }

        dispatch(fetchAnimeSuccess(anime));
    },

    FETCH_ALL_ANIMES: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const animes = await fetchAllAnimes();
        dispatch(fetchAllAnimesSuccess(animes));
    },

    FETCH_ANIME_EPISODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const episodes = await fetchAnimeEpisodes(action.data);
        dispatch(fetchAnimeEpisodesSuccess(episodes));
    },

    FETCH_GROUP: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const group = await fetchGroup(action.data);
        if (group === undefined) {
            return;
        }

        dispatch(fetchGroupSuccess(group));
    },

    FETCH_ALL_GROUPS: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const groups = await fetchAllGroups();
        dispatch(fetchAllGroupsSuccess(groups));
    },

    FETCH_EPISODE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const episode = await fetchEpisode(action.data);
        if (episode === undefined) {
            return;
        }

        dispatch(fetchEpisodeSuccess(episode));
    },

    FETCH_ALL_EPISODES: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const episodes = await fetchAllEpisodes();
        dispatch(fetchAllEpisodesSuccess(episodes));
    },

    FETCH_SEGMENT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const segment = await fetchSegment(action.data);
        if (segment === undefined) {
            return;
        }

        dispatch(fetchSegmentSuccess(segment));
    },

    FETCH_ALL_SEGMENTS: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const segments = await fetchAllSegments();
        dispatch(fetchAllSegmentsSuccess(segments));
    },

    FETCH_EPISODE_SEGMENTS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const segments = await fetchEpisodeSegments(action.data);
        dispatch(fetchEpisodeSegmentsSuccess(segments));
    },

    FETCH_STATS: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const stats = await fetchStats();
        if (stats === undefined) {
            return;
        }

        dispatch(fetchStatsSuccess(stats));
    },
};

export { REDUCERS, ASYNC_REDUCERS };
