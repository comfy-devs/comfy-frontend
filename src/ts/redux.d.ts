/* Base Types */
type ReduxAction = {
    type: string;
    data: any;
};

/* Types */
type ReduxState = {
    users: User[];
    counter: number;
};

type ConnectedActions = {
    increaseCounter(): ReduxAction;
    resetCounter(): ReduxAction;

    addUser(user: User): ReduxAction;
    fetchUser(id: string): ReduxAction;
    updateUser(user: User): ReduxAction;
    removeUser(id: string): ReduxAction;
};
