/* Types */
import { h } from "preact";
import { Text } from "preact-i18n";
import { secondsToStringHuman } from "./util";

export function topicExtraToDisplayName(item: Show, extra?: number) {
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