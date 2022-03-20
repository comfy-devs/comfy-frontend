/* Types */
import { FilterType, AnimeGenre, AnimeStatus, AnimeTag, AnimeType, FilterSort, FilterGroup, EpisodeLocation } from "../../ts/base";

export function filterTypeToValues(type: FilterType) {
    const map: Record<number, number[]> = {
        [FilterType.GENRES]: Object.keys(AnimeGenre)
            .filter((e) => {
                return !isNaN(parseInt(e, 10));
            })
            .map((e) => {
                return parseInt(e, 10);
            }, []),
        [FilterType.YEAR]: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
        [FilterType.TYPE]: Object.keys(AnimeType)
            .filter((e) => {
                return !isNaN(parseInt(e, 10));
            })
            .map((e) => {
                return parseInt(e, 10);
            }, []),
        [FilterType.STATUS]: Object.keys(AnimeStatus)
            .filter((e) => {
                return !isNaN(parseInt(e, 10));
            })
            .map((e) => {
                return parseInt(e, 10);
            }, []),
        [FilterType.SORT]: Object.keys(FilterSort)
            .filter((e) => {
                return !isNaN(parseInt(e, 10));
            })
            .map((e) => {
                return parseInt(e, 10);
            }, []),
        [FilterType.TAGS]: Object.keys(AnimeTag)
            .filter((e) => {
                return !isNaN(parseInt(e, 10));
            })
            .map((e) => {
                return parseInt(e, 10);
            }, []),
        [FilterType.ITEMS]: [50, 100, 150, 200],
        [FilterType.GROUP]: Object.keys(FilterGroup)
            .filter((e) => {
                return !isNaN(parseInt(e, 10));
            })
            .map((e) => {
                return parseInt(e, 10);
            }, []),
    };
    return map[type];
}

const episodeLocationMap: Record<number, string> = {
    [EpisodeLocation.AKAGI]: "https://akagi.nyananime.xyz",
    [EpisodeLocation.KAGA]: "https://kaga.nyananime.xyz",
};
export function episodeLocationToURL(location: EpisodeLocation) {
    return episodeLocationMap[location];
}
