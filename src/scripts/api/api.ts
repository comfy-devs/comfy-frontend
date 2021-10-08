const apiEndpoint = "http://localhost:8081";
const apiVersion = "/v1";

export async function get(descriptor: APIGetRequest): Promise<APIResponse> {
    const response: Response = await fetch(apiEndpoint + apiVersion + descriptor.path, { method: "GET", credentials: "include" });
    return { status: response.status, body: response.json() };
}

export async function post(descriptor: APIPostRequest): Promise<APIResponse> {
    const response: Response = await fetch(apiEndpoint + apiVersion + descriptor.path, { method: "POST", body: descriptor.body, credentials: "include" });
    return { status: response.status, body: response.json() };
}
