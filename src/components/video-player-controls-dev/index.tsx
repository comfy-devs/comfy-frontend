/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { useState } from "react";
import { SegmentTypeMapping } from "../../ts/common/const";
/* Styles */
import tooltipStyle from "../tooltip.scss";
import style from "./style.scss";

const VideoPlayerControlsDev: FunctionalComponent<VideoPlayerControlsDevConnectedProps> = (props: VideoPlayerControlsDevConnectedProps) => {
    const [segmentType, setSegmentType] = useState<SegmentType>("EPISODE");

    return (
        <div className={style["video-controls-dev"]}>
            <div
                className={[tooltipStyle["tooltip-wrapper"], style["video-controls-button"]].join(" ")}
                onClick={() => {
                    if (props.video === null) {
                        return;
                    }

                    const segment: Segment = {
                        id: `${props.item.id}-${props.segments.length}`,
                        pos: props.segments.length,
                        episode: props.item.id,
                        type: SegmentTypeMapping[segmentType],
                        length:
                            Math.round(props.video.currentTime) -
                            props.segments.reduce((acc, curr) => {
                                return acc + curr.length;
                            }, 0),
                    };
                    props.setSegments([...props.segments, segment]);
                }}
                onContextMenu={(e) => {
                    switch (segmentType) {
                        case "OP":
                            setSegmentType("EPISODE");
                            break;

                        case "EPISODE":
                            setSegmentType("ED");
                            break;

                        case "ED":
                            setSegmentType("OP");
                            break;
                    }

                    e.preventDefault();
                }}>
                <div className={style["icon-segment"]} data={segmentType} />
                <div className={tooltipStyle.tooltip}>Mark segment end ({<Text id={`enum.segmentType.${SegmentTypeMapping[segmentType]}`} />})</div>
            </div>
            <div
                className={[tooltipStyle["tooltip-wrapper"], style["video-controls-button"]].join(" ")}
                onClick={() => {
                    const queries = props.segments.map((e) => {
                        return `INSERT INTO segments (id, pos, episode, type, length) VALUES ("${e.id}", ${e.pos}, "${e.episode}", ${e.type}, ${e.length});`;
                    });
                    navigator.clipboard.writeText(queries.join("\n"));
                }}>
                <div className={style["icon-copy"]} />
                <div className={tooltipStyle.tooltip}>Copy segments query</div>
            </div>
        </div>
    );
};

export default VideoPlayerControlsDev;
