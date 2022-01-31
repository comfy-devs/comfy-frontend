/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { VideoPlayerControlsConnectedProps } from "../../ts/components";
import { AnimeTag, EpisodePreset, SegmentType } from "../../ts/base";
import { Segment } from "../../ts/api";
import { secondsToString } from "../../scripts/nyan/util";
import { findSegmentForTimestamp } from "../../scripts/nyan/functions";
/* Styles */
import style from "./style.scss";
import { useState } from "react";

const VideoPlayerControls: FunctionalComponent<VideoPlayerControlsConnectedProps> = (props: VideoPlayerControlsConnectedProps) => {
    const _devSegments: Segment[] = [];
    const [devSegments, setDevSegments] = useState(_devSegments);
    const [devSegmentType, setDevSegmentType] = useState(SegmentType.EPISODE);
    if (props.video === null) {
        return null;
    }
    const segments = props.segments.concat(devSegments);
    let presets = Object.keys(EpisodePreset).filter(e => { return (props.parent.presets & parseInt(e, 10)) === parseInt(e, 10) }).map(e => { return parseInt(e, 10); });
    presets = presets.filter(e => { return props.video === null || e !== EpisodePreset.VP9 || props.video.canPlayType('video/webm; codecs="vp9, vorbis"') === "probably"; });
    const presetIndex = presets.indexOf(props.playerData.preset);

    return (
        <div className={style["video-controls-wrapper"]}>
            <div className={style["video-controls"]}>
                <div className={style["video-controls-bg"]} />
                <div className={style["video-controls-section-0"]}>
                    <div
                        className={style["video-controls-button"]}
                        onClick={() => {
                            if (props.video === null) {
                                return;
                            }
                            if (props.video.paused) {
                                props.video.play();
                            } else {
                                props.video.pause();
                            }
                        }}>
                        <div className={style["icon-play"]} data={props.video.paused ? "false" : "true"} />
                        <div className={style.tooltip} data={"left"}>{props.video.paused ? <Text id="video.play.tooltip" /> : <Text id="video.pause.tooltip" />}</div>
                    </div>
                    <div className={style["video-controls-time"]}>
                        {secondsToString(Math.round(props.video.currentTime))}/{isNaN(props.video.duration) ? "??" : secondsToString(Math.round(props.video.duration))}
                    </div>
                    <div
                        className={style["video-controls-button"]}
                        onClick={() => {
                            if (props.video === null) {
                                return;
                            }
                            props.video.muted = !props.video.muted;
                        }}>
                        <div className={style["icon-volume"]} data={props.video.muted ? "false" : "true"} />
                        <div className={style.tooltip}>{props.video.muted ? <Text id="video.unmute.tooltip" /> : <Text id="video.mute.tooltip" />}</div>
                    </div>
                    <div
                        className={style["video-controls-volume"]}
                        onClick={(e) => {
                            if (props.video === null || props.video.muted) {
                                return;
                            }
                            const rect = e.currentTarget.getBoundingClientRect();
                            const value = (rect.width - ((rect.left + rect.width) - e.pageX)) / 120;
                            props.video.volume = value;
                        }}
                        disabled={props.video.muted}>
                        <div className={style["video-controls-volume-bg"]} />
                        <div className={style["video-controls-volume-value"]} style={{ width: `${props.video.volume * 100}%` }} />
                        <div className={[style.tooltip, style["tooltip-volume"]].join(" ")}><Text id="video.volume" fields={{ volume: Math.round(props.video.volume * 100) }} /></div>
                    </div>
                    {props.preferences.developer === false ? null : <div
                        className={style["video-controls-button"]}
                        onClick={() => {
                            if (props.video === null) {
                                return;
                            }

                            const devSegment = {
                                id: `${props.item.id}-${devSegments.length}`,
                                pos: devSegments.length,
                                episode: props.item.id,
                                type: devSegmentType,
                                length: Math.round(props.video.currentTime) - devSegments.reduce((acc, curr) => { return acc + curr.length; }, 0)
                            };
                            setDevSegments([...devSegments, devSegment]);
                        }}
                        onContextMenu={(e) => {
                            switch(devSegmentType) {
                                case SegmentType.OP:
                                    setDevSegmentType(SegmentType.EPISODE);
                                    break;

                                case SegmentType.EPISODE:
                                    setDevSegmentType(SegmentType.ED);
                                    break;

                                case SegmentType.ED:
                                    setDevSegmentType(SegmentType.OP);
                                    break;
                            }

                            e.preventDefault();
                        }}>
                            <div className={style[`icon-segment-${devSegmentType}`]} />
                            <div className={style.tooltip}>Mark segment end ({<Text id={`enum.segmentType.${devSegmentType}`} />})</div>
                    </div>}
                    {props.preferences.developer === false ? null : <div
                        className={style["video-controls-button"]}
                        onClick={() => {
                            const queries = devSegments.map(e => { return `INSERT INTO segments (id, pos, episode, type, length) VALUES ("${e.id}", ${e.pos}, "${e.episode}", ${e.type}, ${e.length});`; });
                            navigator.clipboard.writeText(queries.join("\n"));
                        }}>
                        <div className={style[`icon-copy`]} />
                        <div className={style.tooltip}>Copy segments query</div>
                    </div>}
                    <div
                        className={style["video-controls-timeline"]}
                        onClick={(e) => {
                            if (props.video === null) {
                                return;
                            }
                            const rect = e.currentTarget.getBoundingClientRect();
                            const value = (e.pageX - rect.left) / rect.width;
                            props.video.currentTime = value * (isNaN(props.video.duration) ? 0 : props.video.duration);
                        }}
                        onMouseEnter={() => {
                            if (props.timelineTooltip === null) {
                                return;
                            }
                            props.timelineTooltip.style.visibility = "visible";
                        }}
                        onMouseMove={(e) => {
                            if (props.video === null || isNaN(props.video.duration) || props.timelineTooltip === null) {
                                return;
                            }
                            const rect = e.currentTarget.getBoundingClientRect();
                            const value = (e.pageX - rect.left) / rect.width;
                            props.timelineTooltip.style.left = `calc(${(value * 100)}% - ${Math.round(props.timelineTooltip.getBoundingClientRect().width / 2)}px)`;

                            const segment = findSegmentForTimestamp(segments, value * props.video.duration);
                            props.timelineTooltip.innerText = `${secondsToString(Math.round(props.video.duration * value))} ${segment.item === null || segment.item.type === SegmentType.EPISODE ? "" : `(${<Text id={`enum.segmentType.${segment.item.type}`} />})`}`;
                        }}
                        onMouseLeave={() => {
                            if (props.timelineTooltip === null) {
                                return;
                            }
                            props.timelineTooltip.style.visibility = "hidden";
                        }}>
                        <div className={style["video-controls-timeline-bg"]} />
                        <div className={style["video-controls-timeline-progress"]} style={{ width: `${(props.video.currentTime / props.video.duration) * 100}%` }} />
                        <div className={style["video-controls-timeline-segments"]}>
                            {segments.map((e, i) => {
                                if (props.video === null) { return; }
                                return <div key={i} className={style[`video-controls-timeline-segment-${e.type}`]} style={{ width: `${(e.length / props.video.duration) * 100}%` }} />
                            })}
                        </div>
                    </div>
                </div>
                <div className={style["video-controls-section-1"]}>
                    <div
                        className={style["video-controls-button"]}
                        disabled={!((props.parent.tags & AnimeTag.SUBBED) === AnimeTag.SUBBED)}
                        onClick={() => {
                            if (!((props.parent.tags & AnimeTag.SUBBED) === AnimeTag.SUBBED)) {
                                return;
                            }
                            props.actions.setPlayerSubs(!props.playerData.subs);
                        }}>
                        <div className={style["icon-subs"]} data={props.playerData.subs ? "true" : "false"} />
                        <div className={style.tooltip}>{props.playerData.subs ? <Text id="video.showSubtitles.tooltip" /> : <Text id="video.hideSubtitles.tooltip" />}</div>
                    </div>
                    <div className={style["video-controls-button"]} disabled>
                        <div className={style["icon-audio"]} data={"false"} />
                        <div className={style.tooltip}><Text id="video.noDub" /></div>
                    </div>
                    <div className={style["video-controls-button"]}
                        onClick={() => {
                            if(presets.length > presetIndex + 1) {
                                props.actions.setPlayerPreset(presets[presetIndex + 1]);
                            } else {
                                props.actions.setPlayerPreset(presets[0]);
                            }
                        }}>
                        <div className={style["icon-quality"]} data={"false"} />
                        <div className={style.tooltip}><Text id="video.quality" fields={{ quality: <Text id={`enum.episodePreset.${props.playerData.preset}`} />, number: presetIndex + 1, count: presets.length }} /></div>
                    </div>
                    <div
                        className={style["video-controls-button"]}
                        onClick={() => {
                            props.actions.setPlayerTheater(!props.playerData.theater);
                        }}>
                        <div className={style["icon-theater"]} data={props.playerData.theater ? "true" : "false"} />
                        <div className={style.tooltip}>{props.playerData.theater ? <Text id="video.hideTheater.tooltip" /> : <Text id="video.showTheater.tooltip" />}</div>
                    </div>
                    <div
                        className={style["video-controls-button"]}
                        onClick={() => {
                            if (props.video === null) {
                                return;
                            }
                            if (document.fullscreenElement !== null) {
                                document.exitFullscreen();
                            } else {
                                props.video.requestFullscreen();
                            }
                        }}>
                        <div className={style["icon-fullscreen"]} />
                        <div className={style.tooltip} data={"right"}><Text id="video.fullscreen.tooltip" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerControls;
