/* Redux */
import { bindActionCreators } from "redux";
import { AuthResult, FilterGroup, FilterSort, PlayerState, PreferencesTheme, PreferencesTorrent } from "../ts/base";
import { ReduxState } from "../ts/redux";

export const INITIAL: ReduxState = {
    dimensions: { w: 0, h: 0 },
    users: new Map(),
    animes: new Map(),
    groups: new Map(),
    episodes: new Map(),
    encodes: new Map(),
    segments: new Map(),
    stats: { size: 0, ammount: 0 },
    random: Math.floor(Math.random() * 1000000),
    preferences: { theme: PreferencesTheme.DARK, torrent: PreferencesTorrent.OFF, lang: "en", developer: false, blur: true },

    playerData: { state: PlayerState.WAITING, theater: false, subs: true, opNotification: true, edNotification: true },
    filterData: { page: 0, searchTerm: "", genres: null, year: null, type: null, status: null, sort: FilterSort.TITLE_ASC, tags: null, items: 100, group: FilterGroup.NO },
    authData: { username: "", password: "", password2: "", result: AuthResult.NONE },
};

export function mapState(state: ReduxState | undefined): ReduxState {
    return state === undefined ? INITIAL : state;
}

export function mapDispatch(actions: Record<string, any>): any {
    return (dispatch: any) => ({
        actions: { ...bindActionCreators(actions, dispatch) },
    });
}

export enum ResourceType {
    USER = "user",
    ANIME = "anime",
    EPISODE = "episode",
    ENCODE = "encode",
    SEGMENT = "segment",
    GROUP = "group",
    UNKNOWN = "unknown",
}

export function cacheResource(state: ReduxState, resource: any, resourceType: ResourceType): ReduxState {
    switch (resourceType) {
        case ResourceType.USER: {
            const users = new Map(state.users);
            users.set(resource.id, resource);
            return { ...state, users };
        }

        case ResourceType.ANIME: {
            const animes = new Map(state.animes);
            animes.set(resource.id, resource);
            return { ...state, animes };
        }

        case ResourceType.EPISODE: {
            const episodes = new Map(state.episodes);
            episodes.set(resource.id, resource);
            return { ...state, episodes };
        }

        case ResourceType.ENCODE: {
            const encodes = new Map(state.encodes);
            encodes.set(resource.id, resource);
            return { ...state, encodes };
        }

        case ResourceType.SEGMENT: {
            const segments = new Map(state.segments);
            segments.set(resource.id, resource);
            return { ...state, segments };
        }

        case ResourceType.GROUP: {
            const groups = new Map(state.groups);
            groups.set(resource.id, resource);
            return { ...state, groups };
        }
    }

    return state;
}

export function cacheResources(state: ReduxState, resources: any[], resourceType: ResourceType): ReduxState {
    resources.forEach((resource) => {
        state = cacheResource(state, resource, resourceType);
    });

    return state;
}
