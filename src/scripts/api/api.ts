export const apiVersion = "/v1";
export function getImageEndpoint() {
    return location.host === "nyananime.xyz" ? "https://image.nyananime.xyz" : "https://localhost:545";
}
export function getApiEndpoint() {
    return location.host === "nyananime.xyz" ? "https://api.nyananime.xyz" : "https://localhost:9101";
}

export async function get(descriptor: APIGetRequest): Promise<APIResponse> {
    const response: Response = await fetch(getApiEndpoint() + apiVersion + descriptor.path, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json" } });
    return { status: response.status, body: response.json() };
}

export async function post(descriptor: APIPostRequest): Promise<APIResponse> {
    const response: Response = await fetch(getApiEndpoint() + apiVersion + descriptor.path, { method: "POST", body: JSON.stringify(descriptor.body), credentials: "include", headers: { "Content-Type": "application/json" } });
    return { status: response.status, body: response.json() };
}

export async function sendDelete(descriptor: APIGetRequest): Promise<APIResponse> {
    const response: Response = await fetch(getApiEndpoint() + apiVersion + descriptor.path, { method: "DELETE", credentials: "include", headers: { "Content-Type": "application/json" } });
    return { status: response.status, body: response.json() };
}

export async function fetchResource<T>(path: string, id?: string): Promise<T | undefined> {
    const response: APIResponse = await get({ path: `${path}/fetch${(id === undefined ? "" : `?id=${id}`)}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function fetchResources<T>(path: string, id?: string): Promise<T[]> {
    const response: APIResponse = await get({ path: `${path}/fetch${(id === undefined ? "" : `?id=${id}`)}` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}

export async function createResource<T>(path: string, item: any): Promise<T | undefined> {
    const response: APIResponse = await post({ path: `${path}/create`, body: JSON.stringify(item) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function editResource<T>(path: string, item: any): Promise<T | undefined> {
    const response: APIResponse = await post({ path: `${path}/edit`, body: JSON.stringify(item) });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function deleteResource(path: string, id: string): Promise<boolean> {
    const response: APIResponse = await sendDelete({ path: `${path}/delete?id=${id}` });
    return response.status === 200;
}