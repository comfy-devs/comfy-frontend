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
        preferences.theme = (localStorage.getItem("theme") ?? "dark") as "dark" | "light";
        preferences.developer = (localStorage.getItem("torrent") ?? "false") === "true";
        preferences.lang = localStorage.getItem("lang") ?? "eng";
        preferences.developer = (localStorage.getItem("developer") ?? "false") === "true";
        preferences.blur = (localStorage.getItem("blur") ?? "false") === "true";
        preferences.volume = parseFloat(localStorage.getItem("volume") ?? "0.5");
        preferences.progress = new Map();
        for (const key in localStorage) {
            if (key.startsWith("progress_")) {
                const id = key.replace("progress_", "");
                preferences.progress.set(id, parseInt(localStorage[key], 10));
            }
        }

        return { ...state, preferences };
    },

    CREATE_USER_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        location.href = "/";
        return cacheResource(state, action.data, ResourceType.USER);
    },

    CREATE_SESSION_SUCCESS: (state: ReduxState, action: ReduxAction): ReduxState => {
        if (action.data.type === "classic") {
            location.href = "/";
        }
        return { ...state, session: action.data.session };
    },

    DELETE_SESSION: (state: ReduxState): ReduxState => {
        routes.deleteSession();
        return state;
    },

    SET_AUTH_RESULT: (state: ReduxState, action: ReduxAction): ReduxState => {
        return { ...state, authResult: action.data };
    },

    FETCH_USER_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.USER);
    },

    FAVOURITE_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        if (action.data === undefined) {
            return state;
        }
        return cacheResource(state, action.data, ResourceType.USER);
    },

    FETCH_SHOW_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResource(state, action.data, ResourceType.SHOW);
    },

    FETCH_ALL_SHOWS_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.SHOW);
    },

    FETCH_SHOW_EPISODES_SUCCESS: (state: ReduxState, action: ReduxAction) => {
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

    FETCH_ALL_JOBS_SUCCESS: (state: ReduxState, action: ReduxAction) => {
        return cacheResources(state, action.data, ResourceType.JOB);
    },

    PUSH_SUBSCRIBE_SUCCESS: (state: ReduxState) => {
        return state;
    },

    PUSH_UNSUBSCRIBE_SUCCESS: (state: ReduxState) => {
        return state;
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

    SET_PREFERENCES_VOLUME: (state: ReduxState, action: ReduxAction) => {
        return { ...state, preferences: { ...state.preferences, volume: action.data } };
    },

    SET_PREFERENCES_PROGRESS: (state: ReduxState, action: ReduxAction) => {
        const preferences = { ...state.preferences, progress: new Map(state.preferences.progress) };
        preferences.progress.set(action.data.id, action.data.time);
        return { ...state, preferences };
    },

    SET_FILTER_SEARCH_TERM: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, searchTerm: action.data } };
    },

    SET_FILTER_TYPE: (state: ReduxState, action: ReduxAction) => {
        const filterData = { ...state.filterData, type: action.data };
        if (filterData.type === null) {
            filterData.format = null;
            filterData.genres = null;
        }
        return { ...state, filterData };
    },

    SET_FILTER_FORMAT: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, format: action.data } };
    },

    SET_FILTER_STATUS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, status: action.data } };
    },

    SET_FILTER_GENRES: (state: ReduxState, action: ReduxAction) => {
        return { ...state, filterData: { ...state.filterData, genres: action.data } };
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

    SET_PLAYER_SETTINGS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, settings: action.data } };
    },

    SET_PLAYER_SUBS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, subs: action.data } };
    },

    SET_PLAYER_AUDIO: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, audio: action.data } };
    },

    SET_PLAYER_PRESET: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, preset: action.data } };
    },

    SET_PLAYER_OP_NOTIFICATION: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, opNotification: action.data } };
    },

    SET_PLAYER_ED_NOTIFICATION: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, edNotification: action.data } };
    },

    SET_PLAYER_RESUME_NOTIFICATION: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, resumeNotification: action.data } };
    },

    SET_PLAYER_OVERLAY: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, overlay: action.data } };
    },

    SET_PLAYER_MANIFEST_LEVELS: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, manifest: { ...state.playerData.manifest, levels: action.data } } };
    },

    SET_PLAYER_MANIFEST_AUDIO: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, manifest: { ...state.playerData.manifest, audio: action.data } } };
    },

    SET_PLAYER_MANIFEST_SUBTITLES: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, manifest: { ...state.playerData.manifest, subtitles: action.data } } };
    },

    SET_PLAYER_MANIFEST_LEVEL: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, manifest: { ...state.playerData.manifest, level: action.data } } };
    },

    SET_PLAYER_BANDWITH: (state: ReduxState, action: ReduxAction) => {
        return { ...state, playerData: { ...state.playerData, bandwith: action.data } };
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    CREATE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await routes.createUser(action.data.username, action.data.password);
        if (user === 403) {
            dispatch(actions.setAuthResult("USER_TAKEN"));
            return;
        }

        dispatch(actions.createUserSuccess(user));
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchUser, actions.fetchUserSuccess);
    },

    CREATE_SESSION: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const session = await routes.createSession(action.data.type, action.data.username, action.data.password);
        if (session === 404) {
            dispatch(actions.setAuthResult("NOT_FOUND"));
            return;
        } else if (session === 401) {
            dispatch(actions.setAuthResult("NOT_AUTHORIZED"));
            return;
        }
        dispatch(actions.createSessionSuccess(action.data.type, session));

        const user = await routes.fetchUser(session.user);
        if (user === undefined) {
            return;
        }
        dispatch(actions.fetchUserSuccess(user));
    },

    FETCH_SHOW: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchShow, actions.fetchShowSuccess);
    },

    FETCH_ALL_SHOWS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllShows, actions.fetchAllShowsSuccess);
    },

    FETCH_SHOW_EPISODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchShowEpisodes, actions.fetchShowEpisodesSuccess);
    },

    FETCH_GROUP: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchGroup, actions.fetchGroupSuccess);
    },

    FETCH_ALL_GROUPS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllGroups, actions.fetchAllGroupsSuccess);
    },

    FETCH_EPISODE: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchEpisode, actions.fetchEpisodeSuccess);
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

    FETCH_EPISODE_ENCODES: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchEpisodeEncodes, actions.fetchEpisodeEncodesSuccess);
    },

    FETCH_STATS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetch(dispatch, action.data, routes.fetchStats, actions.fetchStatsSuccess);
    },

    FETCH_ALL_JOBS: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        await reducerFetchMultiple(dispatch, action.data, routes.fetchAllJobs, actions.fetchAllJobsSuccess);
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
};

export { REDUCERS, ASYNC_REDUCERS };
