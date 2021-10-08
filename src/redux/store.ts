/* Redux */
import { createStore, applyMiddleware } from "redux";
import { REDUCERS, ASYNC_REDUCERS } from "./reducers";
import { INITIAL } from "./util";

const asyncMiddleware = (storeAPI: any) => (next: any) => (action: ReduxAction) => {
    if (ASYNC_REDUCERS[action.type]) {
        return ASYNC_REDUCERS[action.type](storeAPI.dispatch, storeAPI.getState, action);
    }

    return next(action);
};

const middlewareEnchancer = applyMiddleware(asyncMiddleware);
const store = createStore(
    (state: ReduxState | undefined, action: ReduxAction) => {
        if (state === undefined) {
            return state;
        }
        if (REDUCERS[action.type]) {
            return REDUCERS[action.type](state, action);
        }

        return state;
    },
    INITIAL,
    middlewareEnchancer
);
export default store;
