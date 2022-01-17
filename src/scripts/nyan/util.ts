/* Types */
import { Segment } from "../../ts/api";

export function secondsToString(time: number) {
    if(time < 0) { return "??"; }
    let timeString = "";

    const hrs = Math.floor(time / 3600);
    time %= 3600;
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    if (hrs >= 1) timeString += `${hrs}:`;
    timeString += `${mins >= 10 ? mins : (hrs >= 1 ? "0" : "") + mins.toString()}:`;
    timeString += `${secs >= 10 ? secs : `0${secs.toString()}`}`;
    return timeString;
}
export function secondsToStringHuman(time: number) {
    if(time < 0) { return "??"; }
    let timeString = "";

    const years = Math.floor(time / 31557600);
    time %= 31557600;
    const months = Math.floor(time / 2629800);
    time %= 2629800;
    const days = Math.floor(time / 86400);
    time %= 86400;
    const hrs = Math.floor(time / 3600);
    time %= 3600;
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    timeString += years > 0 ? `${years}y ` : "";
    timeString += months > 0 ? `${months}mo  ` : "";
    timeString += days > 0 ? `${days}d  ` : "";
    timeString += hrs > 0 ? `${hrs}h ` : "";
    timeString += mins > 0 ? `${mins}m ` : "";
    timeString += secs > 0 ? `${secs}s ` : "";
    timeString = timeString.substring(0, timeString.length - 1);
    return timeString;
}

export function splitArray (array: any[], chunk_size: number) {
    return array.reduce((acc, curr, i) => {
        const ch = Math.floor(i / chunk_size); 
        acc[ch] = [].concat((acc[ch] || []), curr); 
        return acc;
    }, []);
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
