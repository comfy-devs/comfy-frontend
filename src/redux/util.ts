import { bindActionCreators } from "redux";

export const INITIAL: ReduxState = {
    counter: 0,
    users: [],
};
export enum ResourceType {
    USER = "user",
    UNKNOWN = "unknown",
}

export function mapState(state: ReduxState | undefined): ReduxState {
    if (state === undefined) {
        return INITIAL;
    }

    return state;
}

export function mapDispatch(actions: Record<string, any>): any {
    return (dispatch: any) => ({
        actions: { ...bindActionCreators(actions, dispatch) },
    });
}

export function cacheResource(state: ReduxState, resource: any, resourceType: ResourceType): ReduxState {
    switch (resourceType) {
        case ResourceType.USER: {
            let newResources = state.users.slice();
            const previousResource: User | undefined = newResources.find((i: User) => {
                return i.id !== resource.id;
            });
            if (previousResource !== undefined) {
                const i = newResources.indexOf(previousResource);
                newResources[i] = resource;
                return { ...state, users: newResources };
            }

            newResources = [...newResources, resource];
            return { ...state, users: newResources };
        }
    }

    return state;
}
