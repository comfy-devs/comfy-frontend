/* Types */
import { fetchResource, post, sendDelete, fetchResources, createResource } from "./api";

export async function createUser(create: UserCreate): Promise<User | undefined> {
    return await createResource("/users", create);
}
export async function fetchUser(id: string): Promise<User | undefined> {
    return await fetchResource("/users", id);
}

export async function createSession(type: string, username?: string, password?: string): Promise<Session | undefined> {
    const response: APIResponse = await post({ path: `/sessions/create`, body: JSON.stringify({ type, username, password }) });
    if (response.status !== 200) {
        return undefined;
    }
    if(type === "classic") {
        location.href = "/overview";
    }

    return response.body;
}
export async function deleteSession(): Promise<boolean> {
    const response: APIResponse = await sendDelete({ path: `/sessions/delete` });
    location.href = "/";

    return response.status === 200;
}

export async function fetchAnime(id: string): Promise<Anime | undefined> {
    return await fetchResource("/animes", id);
}
export async function fetchAllAnimes(): Promise<Anime[]> {
    return await fetchResources("/animes/all");
}

export async function fetchGroup(id: string): Promise<Group | undefined> {
    return await fetchResource("/groups", id);
}
export async function fetchAllGroups(): Promise<Group[]> {
    return await fetchResources("/groups/all");
}

export async function fetchEpisode(id: string): Promise<Episode | undefined> {
    return await fetchResource("/episodes", id);
}
export async function fetchAllEpisodes(): Promise<Episode[]> {
    return await fetchResources("/episodes/all");
}
export async function fetchAnimeEpisodes(id: string): Promise<Episode[]> {
    return await fetchResources("/animes/episodes", id);
}

export async function fetchEncode(id: string): Promise<Encode | undefined> {
    return await fetchResource("/encodes", id);
}
export async function fetchAllEncodes(): Promise<Encode[]> {
    return await fetchResources("/encodes/all");
}
export async function fetchEpisodeEncodes(id: string): Promise<Encode[]> {
    return await fetchResources("/episodes/encodes", id);
}

export async function fetchSegment(id: string): Promise<Segment | undefined> {
    return await fetchResource("/segments", id);
}
export async function fetchAllSegments(): Promise<Segment[]> {
    return await fetchResources("/segments/all");
}
export async function fetchEpisodeSegments(id: string): Promise<Segment[]> {
    return await fetchResources("/episodes/segments", id);
}

export async function fetchStats(): Promise<Stats | undefined> {
    return await fetchResource("/stats", undefined);
}

export async function pushSubscribe(url: string, key: string, auth: string): Promise<number> {
    const response: APIResponse = await post({ path: `/notifications/subscribe?url=${url}&key=${key}&auth=${auth}`, body: {} });
    return response.status;
}
export async function pushUnsubscribe(): Promise<number> {
    const response: APIResponse = await post({ path: "/notifications/unsubscribe", body: {} });
    return response.status;
}

export async function favourite(id: string): Promise<User | undefined> {
    const response: APIResponse = await post({ path: `/animes/favourite?id=${id}`, body: {} });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
export async function unfavourite(id: string): Promise<User | undefined> {
    const response: APIResponse = await post({ path: `/animes/unfavourite?id=${id}`, body: {} });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}
