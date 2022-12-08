type AnimeType = "TV" | "SPECIAL" | "OVA" | "MOVIE" | "ONA";
type AnimeStatus = "AIRING" | "FINISHED";
type AnimeGenre = "ACTION" | "ADVENTURE" | "COMEDY" | "DRAMA" | "ECCHI" | "FANTASY" | "HORROR" |
    "MAHOU_SHOUJO" | "MECHA" | "MUSIC" | "MYSTERY" | "PSYCHOLOGICAL" | "ROMANCE" | "SCIFI" |
    "SLICE_OF_LIFE" | "SPORTS" | "SUPERNATURAL" | "THRILLER";
type AnimeTag = "SUBBED" | "HARD_SUBBED" | "DUBBED";
type AnimeRating = "PG" | "R";
type Anime = {
    id: string;
    type: number;
    group: string | null;
    season: number | null;

    title: string;
    synopsis: string | null;
    episodes: number;
    favourites: number;

    status: number;
    genres: number;
    tags: number;
    rating: number;
    location: number;
    timestamp: number | null;
    magnet: string | null;
    version: number;
};

type Group = {
    id: string;
    title: string;
};

type EpisodeLocation = "AKAGI" | "KAGA";
type Episode = {
    id: string;
    pos: number;
    anime: string;
    title: string;
    duration: number;
    views: number;
};

type EncodePreset = "X264" | "VP9";
type Encode = {
    id: string;
    episode: string;
    preset: number;
    videoBitrate: number;
    audioBitrate: number;
    size: number;
    vmaf: number | null;
};

type SegmentType = "OP" | "EPISODE" | "ED";
type Segment = {
    id: string;
    pos: number;
    episode: string;

    type: number;
    length: number;
};

type Stats = {
    id: string;
    files: number;
    size: number;
};
