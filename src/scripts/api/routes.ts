/* Types */
import { Anime, APIResponse, Encode, Episode, Group, Segment, Session, Stats, User } from "../../ts/api";
import { get, fetchResource, fetchAllResources, post } from "./api";

export async function fetchUser(id: string): Promise<User | undefined> {
    return await fetchResource("users", id);
}

export async function fetchAnime(id: string): Promise<Anime | undefined> {
    return await fetchResource("animes", id);
}

export async function fetchAllAnimes(): Promise<Anime[]> {
    return await fetchAllResources("animes");
}

export async function fetchAnimeEpisodes(id: string): Promise<Episode[]> {
    const response: APIResponse = await get({ path: `/animes/episodes/fetch?id=${id}` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}

export async function fetchGroup(id: string): Promise<Group | undefined> {
    return await fetchResource("groups", id);
}

export async function fetchAllGroups(): Promise<Group[]> {
    return await fetchAllResources("groups");
}

export async function fetchEpisode(id: string): Promise<Episode | undefined> {
    return await fetchResource("episodes", id);
}

export async function fetchAllEpisodes(): Promise<Episode[]> {
    return await fetchAllResources("episodes");
}

export async function fetchEncode(id: string): Promise<Encode | undefined> {
    return await fetchResource("encodes", id);
}

export async function fetchAllEncodes(): Promise<Encode[]> {
    return await fetchAllResources("encodes");
}

export async function fetchEpisodeEncodes(id: string): Promise<Encode[]> {
    const response: APIResponse = await get({ path: `/episodes/encodes/fetch?id=${id}` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}

export async function fetchSegment(id: string): Promise<Segment | undefined> {
    return await fetchResource("segments", id);
}

export async function fetchAllSegments(): Promise<Segment[]> {
    return await fetchAllResources("segments");
}

export async function fetchEpisodeSegments(id: string): Promise<Segment[]> {
    const response: APIResponse = await get({ path: `/episodes/segments/fetch?id=${id}` });
    if (response.status !== 200) {
        return [];
    }

    return response.body;
}

export async function fetchStats(): Promise<Stats | undefined> {
    return await fetchResource("stats", "default");
}

export async function loginToken(): Promise<Session | undefined> {
    const response: APIResponse = await post({ path: `/login?type=token`, body: {} });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function login(username: string, password: string): Promise<Session | undefined> {
    const response: APIResponse = await post({ path: `/login?type=classic&username=${username}&password=${password}`, body: {} });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function register(username: string, password: string): Promise<User | undefined> {
    const response: APIResponse = await post({ path: `/register?username=${username}&password=${password}`, body: {} });
    if (response.status !== 200) {
        return undefined;
    }

    return response.body;
}

export async function pushSubscribe(url: string, key: string, auth: string): Promise<number> {
    const response: APIResponse = await post({ path: `/notifications/subscribe?url=${url}&key=${key}&auth=${auth}`, body: {} });
    return response.status;
}

export async function pushUnsubscribe(): Promise<number> {
    const response: APIResponse = await post({ path: "/notifications/unsubscribe", body: {} });
    return response.status;
}
