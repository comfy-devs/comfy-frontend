/* Types */
import { h } from "preact";
import { Text } from "preact-i18n";
import { FilterType } from "../../ts/base";
import { Anime, Segment } from "../../ts/api";
import { secondsToStringHuman } from "./util";

export function filterValueToDisplayName(type: FilterType, value: number | null) {
    if(value === null) {
        if(type === FilterType.SORT) { return <Text id="filter.default" />; }
        return <Text id="filter.any" />;
    }
    const map: Record<number, h.JSX.Element> = {
        [FilterType.GENRES]: <Text id={`enum.animeGenre.${value}`} />,
        [FilterType.YEAR]: <Text id="">{value.toString()}</Text>,
        [FilterType.TYPE]: <Text id={`enum.animeType.${value}`} />,
        [FilterType.STATUS]: <Text id={`enum.animeStatus.${value}`} />,
        [FilterType.SORT]: <Text id={`enum.filterSort.${value}`} />,
        [FilterType.TAGS]: <Text id={`enum.animeTag.${value}`} />,
        [FilterType.ITEMS]: <Text id="">{value.toString()}</Text>,
        [FilterType.GROUP]: <Text id={`enum.filterGroup.${value}`} />
    }
    return map[type];
}

export function topicExtraToDisplayName(item: Anime, extra?: number) {
    if (extra === undefined || item.timestamp === null) { return undefined; }
    switch(extra) {
        case 0: {
            const t = secondsToStringHuman(Math.floor(Date.now() / 1000) - item.timestamp);
            return <Text id="home.releasedAgo" fields={{ time: t }} />;
        }

        case 1: {
            const t = secondsToStringHuman(item.timestamp + 604800 - Math.floor(Date.now() / 1000));
            const t2 = secondsToStringHuman(Math.floor(Date.now() / 1000) - 604800 - item.timestamp);
            return t === "??" ? <Text id="home.releasedAgoWaiting" fields={{ time: t2 }} /> : <Text id="home.releaseIn" fields={{ time: t }} />;
        }
    }
}

export type SegmentData = {
    end: number;
    item: Segment | null;
};
export function findSegmentForTimestamp(segments: Segment[], timestamp: number): SegmentData {
    const segmentData = segments.reduce((acc: any, curr) => {
        if(acc.item !== null) { return acc; }
        if(timestamp < acc.end + curr.length) {
            acc.item = curr;
        }

        acc.end += curr.length;
        return acc;
    }, { end: 0, item: null });

    return segmentData;
}
