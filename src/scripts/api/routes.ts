import { get } from "./api";

export async function fetchUser(id: string): Promise<User | undefined> {
    const response: APIResponse = await get({ path: `/users/${id}` });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
