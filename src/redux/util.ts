import { bindActionCreators } from "redux";

export const INITIAL: ReduxState = {
    counter: 0,
    users: new Map(),
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
            state.users.set(resource.id, resource);
            return { ...state, users: state.users };
        }
    }

    return state;
}
