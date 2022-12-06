import { AnimeGenreMapping, AnimeStatusMapping, AnimeTagMapping, AnimeTypeMapping, EpisodeLocationMapping } from "../../ts/common/const";

const filterTypeMap: Record<FilterType, any[]> = {
    GENRES: Object.values(AnimeGenreMapping),
    YEAR: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
    TYPE: Object.values(AnimeTypeMapping),
    STATUS: Object.values(AnimeStatusMapping),
    SORT: ["TITLE_ASC", "TITLE_DESC", "RELEASE_ASC", "RELEASE_DESC", "FAVOURITES_ASC", "FAVOURITES_DESC"],
    TAGS: Object.values(AnimeTagMapping),
    ITEMS: [50, 100, 150, 200],
    GROUP: ["YES", "NO"],
};

export function filterTypeToValues(type: FilterType) {
    return filterTypeMap[type];
}

const episodeLocationMap: Record<number, string> = {
    [EpisodeLocationMapping.AKAGI]: location.host === "nyananime.xyz" ? "https://akagi.nyananime.xyz" : "https://localhost:546",
    [EpisodeLocationMapping.KAGA]: "https://kaga.nyananime.xyz",
};
export function episodeLocationToURL(location: number) {
    return episodeLocationMap[location];
}
