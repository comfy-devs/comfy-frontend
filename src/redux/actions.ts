/* Counter */
export function increaseCounter(value: number): ReduxAction {
    return {
        type: "INCREASE_COUNTER",
        data: value,
    };
}

export function resetCounter(): ReduxAction {
    return {
        type: "RESET_COUNTER",
        data: {},
    };
}

/* Users */
export function addUser(user: User): ReduxAction {
    return {
        type: "ADD_USER",
        data: user,
    };
}

export function fetchUser(id: string): ReduxAction {
    return {
        type: "FETCH_USER",
        data: id,
    };
}
export function fetchUserSuccess(user: User): ReduxAction {
    return {
        type: "FETCH_USER_SUCCESS",
        data: user,
    };
}

export function updateUser(user: User): ReduxAction {
    return {
        type: "UPDATE_USER",
        data: user,
    };
}

export function removeUser(id: string): ReduxAction {
    return {
        type: "REMOVE_USER",
        data: id,
    };
}
