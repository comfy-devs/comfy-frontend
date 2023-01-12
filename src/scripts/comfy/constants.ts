import { ShowGenreMapping, ShowStatusMapping, ShowTagMapping, ShowTypeMapping, EpisodeLocationMapping } from "../../ts/common/const";

const filterTypeMap: Record<FilterType, any[]> = {
    GENRES: Object.values(ShowGenreMapping),
    YEAR: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
    TYPE: Object.values(ShowTypeMapping),
    STATUS: Object.values(ShowStatusMapping),
    SORT: ["TITLE_ASC", "TITLE_DESC", "RELEASE_ASC", "RELEASE_DESC", "FAVOURITES_ASC", "FAVOURITES_DESC"],
    TAGS: Object.values(ShowTagMapping),
    ITEMS: [50, 100, 150, 200],
    GROUP: ["YES", "NO"],
};

export function filterTypeToValues(type: FilterType) {
    return filterTypeMap[type];
}

const episodeLocationMap: Record<number, string> = {
    [EpisodeLocationMapping.VAPOREON]: location.host === "comfy.lamkas.dev" ? "https://vaporeon.comfy.lamkas.dev" : "https://localhost:546",
    [EpisodeLocationMapping.JOLTEON]: "https://jolteon.comfy.lamkas.dev",
    [EpisodeLocationMapping.FLAREON]: "https://flareon.comfy.lamkas.dev",
};
export function episodeLocationToURL(location: number) {
    return episodeLocationMap[location];
}

const fileNameMap: Record<EncodePreset, string> = {
    X264: "episode_x264.mp4",
    VP9: "episode_vp9.webm",
};
export function presetToFilename(preset: EncodePreset) {
    return fileNameMap[preset];
}
