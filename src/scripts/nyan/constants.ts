/* Types */
import { FilterType, AnimeGenre, AnimeStatus, AnimeTag, AnimeType, FilterSort, FilterGroup, PreferencesTheme, SegmentType, VideoPlayerNotificationType, EpisodeLocation, EpisodePreset, AuthResult } from "../../ts/base";
import { Anime, User } from "../../ts/api";
import { secondsToStringHuman } from "./util";

const preferenceThemeMap: Record<number, string> = {
    [PreferencesTheme.DARK]: "Dark",
    [PreferencesTheme.LIGHT]: "Light"
}
export function preferencesThemeToDisplayName(theme: PreferencesTheme) {
    return preferenceThemeMap[theme];
}
const notificationPreferenceMap: Record<NotificationPermission, string> = {
    "default": "Off",
    "granted": "On",
    "denied": "Blocked",
}
export function notificationPreferencesToDisplayName(permission: NotificationPermission, user?: User) {
    return user === undefined ? "Not Logged In" : (!user.pushEnabled ? "Off" : notificationPreferenceMap[permission]);
}

const authResultMap: Record<number, string> = {
    [AuthResult.NONE]: "",
    [AuthResult.WAITING]: "Waiting...",
    [AuthResult.FAILED_LOGIN]: "Failed to login!",
    [AuthResult.FAILED_REGISTER]: "Failed to register!",
    [AuthResult.USERNAME_TOO_SHORT]: "Username is too short!",
    [AuthResult.PASSWORD_TOO_SHORT]: "Password is too short!",
    [AuthResult.PASSWORD_NO_MATCH]: "Passwords don't match!",
    [AuthResult.USERNAME_EXISTS]: "Username already exists!"
}
export function authResultToDisplayName(result: AuthResult) {
    return authResultMap[result];
}

const animeTypeMap: Record<number, string> = {
    [AnimeType.TV]: "TV",
    [AnimeType.SPECIAL]: "Special",
    [AnimeType.OVA]: "OVA",
    [AnimeType.MOVIE]: "Movie",
    [AnimeType.ONA]: "ONA"
}
export function animeTypeToDisplayName(type: AnimeType) {
    return animeTypeMap[type];
}

const animeStatusMap: Record<number, string> = {
    [AnimeStatus.AIRING]: "Airing",
    [AnimeStatus.FINISHED]: "Finished"
}
export function animeStatusToDisplayName(status: AnimeStatus) {
    return animeStatusMap[status];
}

const animeGenreMap: Record<number, string> = {
    [AnimeGenre.ACTION]: "Action",
    [AnimeGenre.ADVENTURE]: "Adventure",
    [AnimeGenre.COMEDY]: "Comedy",
    [AnimeGenre.DRAMA]: "Drama",
    [AnimeGenre.ECCHI]: "Ecchi",
    [AnimeGenre.FANTASY]: "Fantasy",
    [AnimeGenre.HORROR]: "Horror",
    [AnimeGenre.MAHOU_SHOUJO]: "Mahou Shoujo",
    [AnimeGenre.MECHA]: "Mecha",
    [AnimeGenre.MUSIC]: "Music",
    [AnimeGenre.MYSTERY]: "Mystery",
    [AnimeGenre.PSYCHOLOGICAL]: "Psychological",
    [AnimeGenre.ROMANCE]: "Romance",
    [AnimeGenre.SCIFI]: "Sci-Fi",
    [AnimeGenre.SLICE_OF_LIFE]: "Slice Of Life",
    [AnimeGenre.SPORTS]: "Sports",
    [AnimeGenre.SUPERNATURAL]: "Supernatural",
    [AnimeGenre.THRILLER]: "Thriller"
}
export function animeGenreToDisplayName(genre: AnimeGenre) {
    return animeGenreMap[genre];
}

const animeTagMap: Record<number, string> = {
    [AnimeTag.SUBBED]: "Subbed",
    [AnimeTag.HARD_SUBBED]: "Hard Subbed",
    [AnimeTag.DUBBED]: "Dubbed"
}
export function animeTagToDisplayName(tag: AnimeTag) {
    return animeTagMap[tag];
}

const segmentTypeMap: Record<number, string> = {
    [SegmentType.OP]: "OP",
    [SegmentType.EPISODE]: "EP",
    [SegmentType.ED]: "ED"
}
export function segmentTypeToDisplayName(type: SegmentType) {
    return segmentTypeMap[type];
}

const videoPlayerNotificationTypeMap: Record<number, string> = {
    [VideoPlayerNotificationType.OP]: "Do you want to skip the opening?",
    [VideoPlayerNotificationType.ED]: "Do you want to skip the ending?"
}
export function videoPlayerNotificationTypeToText(type: VideoPlayerNotificationType) {
    return videoPlayerNotificationTypeMap[type];
}

const filterTypeMap: Record<number, string> = {
    [FilterType.GENRES]: "Genres",
    [FilterType.YEAR]: "Year",
    [FilterType.TYPE]: "Type",
    [FilterType.STATUS]: "Status",
    [FilterType.SORT]: "Sort",
    [FilterType.TAGS]: "Tags",
    [FilterType.ITEMS]: "Items",
    [FilterType.GROUP]: "Group"
}
export function filterTypeToDisplayname(type: FilterType) {
    return filterTypeMap[type];
}

const filterSortMap: Record<number, string> = {
    [FilterSort.TITLE]: "Title",
    [FilterSort.RELEASE]: "Release",
    [FilterSort.FAVOURITES]: "Favourites"
}
export function filterSortToDisplayName(sort: FilterSort) {
    return filterSortMap[sort];
}

export function filterTypeToValues(type: FilterType) {
    const map: Record<number, number[]> = {
        [FilterType.GENRES]: Object.keys(AnimeGenre).filter(e => { return !isNaN(parseInt(e, 10)); }).map(e => { return parseInt(e, 10); }, []),
        [FilterType.YEAR]: [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012],
        [FilterType.TYPE]: Object.keys(AnimeType).filter(e => { return !isNaN(parseInt(e, 10)); }).map(e => { return parseInt(e, 10); }, []),
        [FilterType.STATUS]: Object.keys(AnimeStatus).filter(e => { return !isNaN(parseInt(e, 10)); }).map(e => { return parseInt(e, 10); }, []),
        [FilterType.SORT]: Object.keys(FilterSort).filter(e => { return !isNaN(parseInt(e, 10)); }).map(e => { return parseInt(e, 10); }, []),
        [FilterType.TAGS]: Object.keys(AnimeTag).filter(e => { return !isNaN(parseInt(e, 10)); }).map(e => { return parseInt(e, 10); }, []),
        [FilterType.ITEMS]: [50, 100, 150, 200],
        [FilterType.GROUP]: Object.keys(FilterGroup).filter(e => { return !isNaN(parseInt(e, 10)); }).map(e => { return parseInt(e, 10); }, [])
    }
    return map[type];
}

export function filterValueToDisplayName(type: FilterType, value: number | null) {
    if(value === null) {
        if(type === FilterType.SORT) { return "Default"; }
        return "Any";
    }
    const map: Record<number, string> = {
        [FilterType.GENRES]: animeGenreToDisplayName(value),
        [FilterType.YEAR]: value.toString(),
        [FilterType.TYPE]: animeTypeToDisplayName(value),
        [FilterType.STATUS]: animeStatusToDisplayName(value),
        [FilterType.SORT]: filterSortToDisplayName(value),
        [FilterType.TAGS]: animeTagToDisplayName(value),
        [FilterType.ITEMS]: value.toString(),
        [FilterType.GROUP]: value === 0 ? "Yes" : "No"
    }
    return map[type];
}

const episodeLocationMap: Record<number, string> = {
    [EpisodeLocation.AKAGI]: "https://akagi.nyananime.xyz",
    [EpisodeLocation.KAGA]: "https://kaga.nyananime.xyz"
}
export function episodeLocationToURL(location: EpisodeLocation) {
    return episodeLocationMap[location];
}

const episodePresetMap: Record<number, string> = {
    [EpisodePreset.LOW]: "Low [480p]",
    [EpisodePreset.MEDIUM]: "Medium [720p]",
    [EpisodePreset.HIGH]: "High [1080p]",
    [EpisodePreset.VP9]: "VP9 [1080p]"
}
export function episodePresetToDisplayName(preset: EpisodePreset) {
    return episodePresetMap[preset];
}

const episodePresetFileMap: Record<number, string> = {
    [EpisodePreset.LOW]: "ep_low.mp4",
    [EpisodePreset.MEDIUM]: "ep_med.mp4",
    [EpisodePreset.HIGH]: "ep_high.mp4",
    [EpisodePreset.VP9]: "ep_vp9.webm"
}
export function episodePresetToFile(preset: EpisodePreset) {
    return episodePresetFileMap[preset];
}

export function topicExtraToDisplayName(item: Anime, extra?: number) {
    if (extra === undefined || item.timestamp === null) { return undefined; }
    switch(extra) {
        case 0: {
            const t = secondsToStringHuman(Math.floor(Date.now() / 1000) - item.timestamp);
            return `${t} ago`;
        }

        case 1: {
            const t = secondsToStringHuman(item.timestamp + 604800 - Math.floor(Date.now() / 1000));
            const t2 = secondsToStringHuman(Math.floor(Date.now() / 1000) - 604800 - item.timestamp);
            return t === "??" ? `Waiting... (${t2} ago)` : `in ${t}`;
        }
    }
}