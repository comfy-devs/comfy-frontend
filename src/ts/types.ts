/* Redux */
type ReduxAction = {
    type: string;
    data: any;
};

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

/* Components */
type AppConnectedProps = {
    users: User[];
    counter: number;
    actions: ConnectedActions;
};

type HomeConnectedProps = {
    path: string;

    users: User[];
    counter: number;
    actions: ConnectedActions;
};

type HeaderConnectedProps = Record<string, never>;

/* API Types */
type User = {
    id: string;
    username: string;
};

/* API Base Types */
type APIGetRequest = {
    path: string;
};

type APIPostRequest = {
    path: string;
    body: any;
};

type APIResponse = {
    status: number;
    body: any;
};
