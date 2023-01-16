/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
import { humanFileSize, secondsToStringHuman } from "../../scripts/comfy/util";
/* Styles */
import style from "./style.scss";

const VideoPlayerControlsOverlay: FunctionalComponent<VideoPlayerControlsOverlayConnectedProps> = (props: VideoPlayerControlsOverlayConnectedProps) => {
    const [quality, setQuality] = useState(props.video?.getVideoPlaybackQuality());
    const [buffer, setBuffer] = useState(props.video ? props.video.buffered.length : 0);
    useEffect(() => {
        if (props.video !== null) {
            setQuality(props.video.getVideoPlaybackQuality());
            setBuffer(props.video.buffered.length);
        }
    }, [props.video, props.video?.currentTime]);
    const level = props.playerData.preset === "X264" && props.playerData.manifest.levels.length > 0 ? props.playerData.manifest.levels[props.playerData.manifestLevel] : null;

    return (
        <div class={style["video-controls-overlay"]}>
            <div class={style["video-controls-overlay-text"]}>
                ID: <span class={style["video-controls-overlay-text-highlight"]}>{props.encode?.id}</span>
            </div>
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    Video:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {props.playerData.preset === "X264" ? "mp4" : "webm"}@{props.playerData.preset.toLowerCase()} ({Math.round(props.encode.videoBitrate / 1000)}kbits/s)
                    </span>
                </div>
            ) : null}
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    Audio:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {props.playerData.preset === "X264" ? "aac" : "opus"} ({Math.round(props.encode.audioBitrate / 1000)}kbits/s)
                    </span>
                </div>
            ) : null}
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    Duration:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {secondsToStringHuman(Math.round(props.item.duration))} ({humanFileSize(props.encode.size)})
                    </span>
                </div>
            ) : null}
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    VMAF: <span class={style["video-controls-overlay-text-highlight"]}>{props.encode.vmaf?.toFixed(2)} (Youtube: 84/Netflix: 93)</span>
                </div>
            ) : null}
            <div class={style["video-controls-overlay-space"]} />
            {level ? (
                <div class={style["video-controls-overlay-text"]}>
                    HLS:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {level.codecs} ({Math.round((level.bitrate / 1000) * 8)}kbits/s)
                    </span>
                </div>
            ) : null}
            {level ? (
                <div class={style["video-controls-overlay-text"]}>
                    Bandwith: <span class={style["video-controls-overlay-text-highlight"]}>{Math.round(props.playerData.bandwith / 1000000)}Mb/s</span>
                </div>
            ) : null}
            <div class={style["video-controls-overlay-space"]} />
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    Viewport:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {props.video?.offsetWidth}x{props.video?.offsetHeight} ({quality?.droppedVideoFrames} dropped out of {quality?.totalVideoFrames})
                    </span>
                </div>
            ) : null}
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    Resolution:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {props.video?.videoWidth}x{props.video?.videoHeight}@24 (optimal)
                    </span>
                </div>
            ) : null}
            {props.encode ? (
                <div class={style["video-controls-overlay-text"]}>
                    Buffer:{" "}
                    <span class={style["video-controls-overlay-text-highlight"]}>
                        {secondsToStringHuman(buffer)} ({((buffer / props.item.duration) * 100).toFixed(2)}%)
                    </span>
                </div>
            ) : null}
        </div>
    );
};

export default VideoPlayerControlsOverlay;
