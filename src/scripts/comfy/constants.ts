import { AnimeGenreMapping, TVGenreMapping, ShowStatusMapping, ShowTagMapping, ShowTypeMapping, EpisodeLocationMapping, AnimeFormatMapping, TVFormatMapping } from "../../ts/common/const";
import { forceRemoteEndpoints } from "../api/api";

export function showTypeToGenres(type: number | null) {
    if (type) {
        return [];
    }
    return type === ShowTypeMapping.ANIME ? Object.values(AnimeGenreMapping) : Object.values(TVGenreMapping);
}

export function showTypeToFormats(type: number | null) {
    if (type) {
        return [];
    }
    return type === ShowTypeMapping.ANIME ? Object.values(AnimeFormatMapping) : Object.values(TVFormatMapping);
}

export function filterTypeToValues(type: number | null, filter: FilterType) {
    const filterTypeMap: Record<FilterType, any[]> = {
        TYPE: Object.values(ShowTypeMapping),
        FORMAT: showTypeToFormats(type),
        STATUS: Object.values(ShowStatusMapping),
        GENRES: showTypeToGenres(type),
        SORT: ["TITLE_ASC", "TITLE_DESC", "RELEASE_ASC", "RELEASE_DESC", "FAVOURITES_ASC", "FAVOURITES_DESC"],
        TAGS: Object.values(ShowTagMapping),
        ITEMS: [50, 100, 150, 200],
        GROUP: ["YES", "NO"],
    };
    return filterTypeMap[filter];
}

const episodeLocationMap: Record<number, string> = {
    [EpisodeLocationMapping.VAPOREON]: location.host === "comfy.lamkas.dev" || forceRemoteEndpoints ? "https://vaporeon.comfy.lamkas.dev" : "https://localhost:546",
    [EpisodeLocationMapping.JOLTEON]: "https://jolteon.comfy.lamkas.dev",
    [EpisodeLocationMapping.FLAREON]: "https://flareon.comfy.lamkas.dev",
};
export function episodeLocationToURL(location: number) {
    return episodeLocationMap[location];
}
