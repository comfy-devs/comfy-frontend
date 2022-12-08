/* Types */
import { h } from "preact";
import { Text } from "preact-i18n";
import { secondsToStringHuman } from "./util";

const filterTypeMap: Record<FilterType, (value: number) => h.JSX.Element> = {
    GENRES: (value: number) => <Text id={`enum.animeGenre.${value}`} />,
    YEAR: (value: number) => <Text id="">{value.toString()}</Text>,
    TYPE: (value: number) => <Text id={`enum.animeType.${value}`} />,
    STATUS: (value: number) => <Text id={`enum.animeStatus.${value}`} />,
    SORT: (value: number) => <Text id={`enum.filterSort.${value}`} />,
    TAGS: (value: number) => <Text id={`enum.animeTag.${value}`} />,
    ITEMS: (value: number) => <Text id="">{value.toString()}</Text>,
    GROUP: (value: number) => <Text id={`enum.filterGroup.${value}`} />,
};
export function filterValueToDisplayName(type: FilterType, value: any) {
    if (value === null) {
        if (type === "SORT") {
            return <Text id="filter.default" />;
        }
        return <Text id="filter.any" />;
    }
    return filterTypeMap[type](value);
}

export function topicExtraToDisplayName(item: Anime, extra?: number) {
    if (extra === undefined || item.timestamp === null) {
        return undefined;
    }
    switch (extra) {
        case 0: {
            const t = secondsToStringHuman(Math.floor(Date.now() / 1000) - item.timestamp, 3);
            return <Text id="home.releasedAgo" fields={{ time: t }} />;
        }

        case 1: {
            const t = secondsToStringHuman(item.timestamp + 604800 - Math.floor(Date.now() / 1000), 3);
            const t2 = secondsToStringHuman(Math.floor(Date.now() / 1000) - 604800 - item.timestamp, 3);
            return t === "??" ? <Text id="home.releasedAgoWaiting" fields={{ time: t2 }} /> : <Text id="home.releaseIn" fields={{ time: t }} />;
        }
    }
}

export function findSegmentForTimestamp(segments: Segment[], timestamp: number): SegmentData {
    const segmentData = segments.reduce(
        (acc: any, curr) => {
            if (acc.item !== null) {
                return acc;
            }
            if (timestamp < acc.end + curr.length) {
                acc.item = curr;
            }

            acc.end += curr.length;
            return acc;
        },
        { end: 0, item: null }
    );

    return segmentData;
}
