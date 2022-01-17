/* Types */
import { APIGetRequest, APIPostRequest, APIResponse } from "../../ts/api";

const apiEndpoint = "https://api.nyananime.xyz";
const apiVersion = "/v1";

export async function get(descriptor: APIGetRequest): Promise<APIResponse> {
    const response: Response = await fetch(apiEndpoint + apiVersion + descriptor.path, { method: "GET", mode: "cors", credentials: "include" });
    return { status: response.status, body: response.json() };
}

export async function post(descriptor: APIPostRequest): Promise<APIResponse> {
    const response: Response = await fetch(apiEndpoint + apiVersion + descriptor.path, { method: "POST", body: JSON.stringify(descriptor.body), credentials: "include" });
    const body = response.status === 200 ? response.json() : undefined;
    return { status: response.status, body };
}

export async function fetchResource(path: string, id: string): Promise<any> {
    const response: APIResponse = await get({ path: `/${path}/fetch?id=${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function fetchAllResources(path: string): Promise<any[]> {
    const response: APIResponse = await get({ path: `/${path}/all/fetch` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}
