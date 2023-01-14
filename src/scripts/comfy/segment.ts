export function findSegmentForTimestamp(segments: Segment[], timestamp: number): SegmentData {
    const segmentData = segments.reduce(
        (acc: SegmentData, curr) => {
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
