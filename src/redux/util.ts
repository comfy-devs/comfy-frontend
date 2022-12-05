import { bindActionCreators, Dispatch } from "redux";

export const INITIAL: ReduxState = {
    dimensions: { w: 0, h: 0 },
    session: null,
    users: new Map(),
    animes: new Map(),
    groups: new Map(),
    episodes: new Map(),
    encodes: new Map(),
    segments: new Map(),
    stats: { size: 0, ammount: 0 },
    random: Math.floor(Math.random() * 1000000),
    preferences: { theme: "dark", torrent: false, lang: "en", developer: false, blur: true },
    filterData: { page: 0, searchTerm: "", genres: null, year: null, type: null, status: null, sort: "TITLE_ASC", tags: null, items: 100, group: "NO" },
    playerData: { state: "WAITING", theater: false, subs: true, opNotification: true, edNotification: true }
};

export enum ResourceType {
    USER,
    ANIME,
    EPISODE,
    ENCODE,
    SEGMENT,
    GROUP,
    UNKNOWN,
}

export function mapState(state: ReduxState | undefined): ReduxState {
    return state === undefined ? INITIAL : state;
}

export function mapDispatch(actions: Record<string, any>): any {
    return (dispatch: any) => ({
        actions: { ...bindActionCreators(actions, dispatch) },
    });
}

export function saveResources(state: ReduxState, key: KeysOfType<ReduxState, Map<string, object>>, resources: any[]) {
    const newResources = new Map(state[key] as Map<string, object>);
    resources.forEach(resource => {
        newResources.set(resource.id, resource);
    });
    return { ...state, [key]: newResources };
}

export function cacheResource(state: ReduxState, resource: any, resourceType: ResourceType): ReduxState {
    return cacheResources(state, [ resource ], resourceType);
}

export function cacheResources(state: ReduxState, resources: any[], resourceType: ResourceType): ReduxState {
    switch (resourceType) {
        case ResourceType.USER:
            return saveResources(state, "users", resources);

        case ResourceType.ANIME:
            return saveResources(state, "animes", resources);

        case ResourceType.EPISODE:
            return saveResources(state, "episodes", resources);

        case ResourceType.ENCODE:
            return saveResources(state, "encodes", resources);

        case ResourceType.SEGMENT:
            return saveResources(state, "segments", resources);

        case ResourceType.GROUP:
            return saveResources(state, "groups", resources);
    }

    return state;
}

export async function reducerFetch<T, J>(dispatch: Dispatch<ReduxAction>, data: T, fetchFunc: (data: T) => Promise<J | undefined>, successFunc: (resource: J) => ReduxAction) {
    const resource = await fetchFunc(data);
    if (resource === undefined) {
        return;
    }

    dispatch(successFunc(resource));
}

export async function reducerDelete<T>(dispatch: Dispatch<ReduxAction>, data: T, deleteFunc: (data: T) => Promise<boolean>, successFunc: (data: T) => ReduxAction) {
    const success = await deleteFunc(data);
    if (!success) {
        return;
    }

    dispatch(successFunc(data));
}

export async function reducerFetchMultiple<T, J>(dispatch: Dispatch<ReduxAction>, data: T, fetchFunc: (data: T) => Promise<J[]>, successFunc: (resource: J[]) => ReduxAction) {
    const resources = await fetchFunc(data);
    dispatch(successFunc(resources));
}
