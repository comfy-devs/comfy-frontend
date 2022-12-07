/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { useState } from "react";
import { secondsToString } from "../../scripts/nyan/util";
import { findSegmentForTimestamp } from "../../scripts/nyan/functions";
/* Styles */
import style from "./style.scss";
/* Components */
import VideoPlayerControlsOverlay from "../video-player-controls-overlay";
import VideoPlayerControlsDev from "../video-player-controls-dev";
import { AnimeTagMapping, SegmentTypeMapping } from "../../ts/common/const";

const VideoPlayerControls: FunctionalComponent<VideoPlayerControlsConnectedProps> = (props: VideoPlayerControlsConnectedProps) => {
    const [segments, setSegments] = useState(props.segments);
    if (props.video === null) {
        return null;
    }

    return (
        <div className={style["video-controls-wrapper"]}>
            {props.playerData.overlay ? <VideoPlayerControlsOverlay item={props.item} encode={props.encode} preferences={props.preferences} video={props.video} playerData={props.playerData} /> : null}
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
                        <div className={style.tooltip} data={"left"}>
                            {props.video.paused ? <Text id="video.play.tooltip" /> : <Text id="video.pause.tooltip" />}
                        </div>
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
                            const value = (rect.width - (rect.left + rect.width - e.pageX)) / 120;
                            props.video.volume = value;
                        }}
                        disabled={props.video.muted}>
                        <div className={style["video-controls-volume-bg"]} />
                        <div className={style["video-controls-volume-value"]} style={{ width: `${props.video.volume * 100}%` }} />
                        <div className={[style.tooltip, style["tooltip-volume"]].join(" ")}>
                            <Text id="video.volume" fields={{ volume: Math.round(props.video.volume * 100) }} />
                        </div>
                    </div>
                    {props.preferences.developer === false ? null : <VideoPlayerControlsDev item={props.item} segments={segments} setSegments={setSegments} video={props.video} />}
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
                            props.timelineTooltip.style.left = `calc(${value * 100}% - ${Math.round(props.timelineTooltip.getBoundingClientRect().width / 2)}px)`;

                            const segment = findSegmentForTimestamp(segments, value * props.video.duration);
                            props.timelineTooltip.innerText = `${secondsToString(Math.round(props.video.duration * value))} ${
                                segment.item === null || segment.item.type === SegmentTypeMapping.EPISODE ? "" : `(${segment.item.type === SegmentTypeMapping.OP ? "OP" : "ED"})`
                            }`;
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
                                if (props.video === null) {
                                    return;
                                }
                                return <div key={i} className={style[`video-controls-timeline-segment-${e.type}`]} style={{ width: `${(e.length / props.video.duration) * 100}%` }} />;
                            })}
                        </div>
                    </div>
                </div>
                <div className={style["video-controls-section-1"]}>
                    <div
                        className={style["video-controls-button"]}
                        disabled={!((props.parent.tags & AnimeTagMapping.SUBBED) === AnimeTagMapping.SUBBED)}
                        onClick={() => {
                            if (!((props.parent.tags & AnimeTagMapping.SUBBED) === AnimeTagMapping.SUBBED)) {
                                return;
                            }
                            props.actions.setPlayerSubs(!props.playerData.subs);
                        }}>
                        <div className={style["icon-subs"]} data={props.playerData.subs ? "true" : "false"} />
                        <div className={style.tooltip}>{props.playerData.subs ? <Text id="video.showSubtitles.tooltip" /> : <Text id="video.hideSubtitles.tooltip" />}</div>
                    </div>
                    <div className={style["video-controls-button"]} disabled>
                        <div className={style["icon-audio"]} data={"false"} />
                        <div className={style.tooltip}>
                            <Text id="video.noDub" />
                        </div>
                    </div>
                    {props.dimensions.w < 500 ? null : (
                        <div
                            className={style["video-controls-button"]}
                            onClick={() => {
                                props.actions.setPlayerTheater(!props.playerData.theater);
                            }}>
                            <div className={style["icon-theater"]} data={props.playerData.theater ? "true" : "false"} />
                            <div className={style.tooltip}>{props.playerData.theater ? <Text id="video.hideTheater.tooltip" /> : <Text id="video.showTheater.tooltip" />}</div>
                        </div>
                    )}
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
                        <div className={style.tooltip} data={"right"}>
                            <Text id="video.fullscreen.tooltip" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerControls;
