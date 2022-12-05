/* Redux */
import { Dispatch } from "redux";
/* Redux */
import * as actions from "./actions";
import { cacheResource, cacheResources, INITIAL, reducerFetch, reducerFetchMultiple, ResourceType } from "./util";
/* API */
import * as routes from "../scripts/api/routes";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    SET_DIMENSIONS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, dimensions: action.data };
    },

    FETCH_PREFERENCES: (state: ReduxState) => {
        const preferences = INITIAL.preferences;

        const theme = localStorage.getItem("theme");
        if (theme !== null) {
            preferences.theme = theme as "dark" | "light";
        }
        const torrent = localStorage.getItem("torrent");
        if (torrent !== null) {
            preferences.torrent = torrent === "true";
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
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    CREATE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.createUser, actions.createUserSuccess);
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchUser, actions.fetchUserSuccess);
    },

    CREATE_SESSION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await routes.createSession(action.data.type, action.data.username, action.data.password);
        if (session === undefined) {
            return;
        }
        const user = await routes.fetchUser(session.user);
        if (user === undefined) {
            return;
        }

        dispatch(actions.createSessionSuccess(session));
        dispatch(actions.fetchUserSuccess(user));
    },

    FETCH_ANIME: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchAnime, actions.fetchAnimeSuccess);
    },

    FETCH_ALL_ANIMES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllAnimes, actions.fetchAllAnimesSuccess);
    },

    FETCH_ANIME_EPISODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAnimeEpisodes, actions.fetchAnimeEpisodesSuccess);
    },

    FETCH_GROUP: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchGroup, actions.fetchGroupSuccess);
    },

    FETCH_ALL_GROUPS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllGroups, actions.fetchAllGroupsSuccess);
    },

    FETCH_EPISODE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchEpisodeSuccess, actions.fetchEpisodeSuccessSuccess);
    },

    FETCH_ALL_EPISODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllEpisodes, actions.fetchAllEpisodesSuccess);
    },

    FETCH_SEGMENT: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchSegment, actions.fetchSegmentSuccess);
    },

    FETCH_ALL_SEGMENTS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllSegments, actions.fetchAllSegmentsSuccess);
    },

    FETCH_EPISODE_SEGMENTS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchEpisodeSegments, actions.fetchEpisodeSegmentsSuccess);
    },

    FETCH_STATS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchStats, actions.fetchStatsSuccess);
    },

    PUSH_SUBSCRIBE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const result = await routes.pushSubscribe(action.data.url, action.data.key, action.data.auth);
        if (result === 200) {
            dispatch(actions.pushSubscribeSuccess());
        }
    },

    PUSH_UNSUBSCRIBE: async (dispatch: Dispatch<ReduxAction>): Promise<void> => {
        const result = await routes.pushUnsubscribe();
        if (result === 200) {
            dispatch(actions.pushUnsubscribeSuccess());
        }
    },

    FAVOURITE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.favourite, actions.favouriteSuccess);
    },

    UNFAVOURITE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.unfavourite, actions.unfavouriteSuccess);
    },
};

export { REDUCERS, ASYNC_REDUCERS };
