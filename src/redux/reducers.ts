/* Redux */
import { Dispatch } from "redux";
/* Redux */
import { fetchUserSuccess } from "./actions";
import { cacheResource, ResourceType } from "./util";
/* API */
import { fetchUser } from "../scripts/api/routes";

const REDUCERS: Record<string, (state: ReduxState, action: ReduxAction) => any> = {
    INCREASE_COUNTER: (state: ReduxState, action: ReduxAction): any => {
        state.counter += action.data;
        return state;
    },

    RESET_COUNTER: (state: ReduxState, action: ReduxAction): any => {
        state.counter = 0;
        return state;
    },

    FETCH_USER_SUCCESS: (state: ReduxState, action: ReduxAction): any => {
        state = cacheResource(state, action.data, ResourceType.USER);
        return state;
    },
};
const ASYNC_REDUCERS: Record<string, (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction) => Promise<void>> = {
    ADD_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        return;
    },

    FETCH_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        const user = await fetchUser(action.data);
        if (user === undefined) {
            return;
        }

        dispatch(fetchUserSuccess(user));
    },

    UPDATE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        return;
    },

    REMOVE_USER: async (dispatch: Dispatch<ReduxAction>, getState: () => ReduxState, action: ReduxAction): Promise<void> => {
        return;
    },
};

export { REDUCERS, ASYNC_REDUCERS };
