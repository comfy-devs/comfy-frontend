/* Base */
import { h, Component } from "preact";
import { episodeLocationToURL, presetToFilename } from "../../scripts/comfy/constants";
import { findSegmentForTimestamp } from "../../scripts/comfy/segment";
/* Styles */
import style from "./style.scss";
/* Components */
import VideoPlayerControls from "../video-player-controls";
import VideoPlayerOverlay from "../video-player-overlay";
import VideoPlayerNotification from "../video-player-notification";
import VideoPlayerHlsWrapper from "../video-player-hls-wrapper";
import { SegmentTypeMapping } from "../../ts/common/const";
import VideoPlayerSettings from "../video-player-settings";

class VideoPlayer extends Component<VideoPlayerConnectedProps> {
    video: HTMLVideoElement | null = null;
    timelineTooltip: HTMLElement | null = null;
    timelineText: HTMLElement | null = null;
    timelineCanvas: HTMLCanvasElement | null = null;
    setVideoRef: any;
    setTimelineTooltipRef: any;
    setTimelineTextRef: any;
    setTimelineCanvasRef: any;
    keyCallbackBinded: any;

    constructor(props: VideoPlayerConnectedProps) {
        super(props);

        this.setVideoRef = (e: HTMLVideoElement | null) => {
            this.video = e;
            this.forceUpdate();
        };
        this.setTimelineTooltipRef = (e: HTMLElement | null) => {
            this.timelineTooltip = e;
            this.forceUpdate();
        };
        this.setTimelineTextRef = (e: HTMLElement | null) => {
            this.timelineText = e;
            this.forceUpdate();
        };
        this.setTimelineCanvasRef = (e: HTMLCanvasElement | null) => {
            this.timelineCanvas = e;
            this.forceUpdate();
        };
        this.keyCallbackBinded = this.keyCallback.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyCallbackBinded);
        if (this.video !== null) {
            this.video.load();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyCallbackBinded);
    }

    componentWillUpdate(nextProps: Readonly<VideoPlayerConnectedProps>): void {
        if (this.props.item.id !== nextProps.item.id) {
            this.video?.pause();
            this.video?.load();
        }
    }

    keyCallback(e: KeyboardEvent) {
        if (this.video !== null) {
            switch (e.key) {
                case "k":
                case " ":
                    if (this.video.paused) {
                        this.video.play();
                    } else {
                        this.video.pause();
                    }
                    e.preventDefault();
                    break;

                case "ArrowLeft":
                    this.video.currentTime = Math.min(Math.max(this.video.currentTime - 5, 0), this.video.duration);
                    e.preventDefault();
                    break;

                case "ArrowRight":
                    this.video.currentTime = Math.min(Math.max(this.video.currentTime + 5, 0), this.video.duration);
                    e.preventDefault();
                    break;

                case "ArrowDown":
                    this.video.volume = Math.min(Math.max(this.video.volume + 0.05, 0), this.video.volume);
                    e.preventDefault();
                    break;

                case "ArrowUp":
                    this.video.volume = Math.min(Math.max(this.video.volume - 0.05, 0), this.video.volume);
                    e.preventDefault();
                    break;

                case "m":
                    this.video.muted = !this.video.muted;
                    e.preventDefault();
                    break;

                case "c":
                    this.props.actions.setPlayerSubs({ enabled: !this.props.playerData.subs.enabled, lang: this.props.playerData.subs.lang });
                    e.preventDefault();
                    break;

                case "t":
                    this.props.actions.setPlayerTheater(!this.props.playerData.theater);
                    e.preventDefault();
                    break;

                case "s":
                    this.props.actions.setPlayerSettings(!this.props.playerData.settings);
                    e.preventDefault();
                    break;

                case "f":
                    if (document.fullscreenElement === null) {
                        this.video.requestFullscreen();
                    } else {
                        document.exitFullscreen();
                    }
                    e.preventDefault();
                    break;

                case "i":
                    this.props.actions.setPlayerOverlay(!this.props.playerData.overlay);
                    e.preventDefault();
                    break;

                default:
                    break;
            }
        }
    }

    render() {
        const currentSegment = this.video === null ? { end: 0, item: null } : findSegmentForTimestamp(this.props.segments, this.video.currentTime);
        let videoUrl = `${episodeLocationToURL(this.props.parent.location)}/${this.props.item.show}/${this.props.item.pos}/${presetToFilename(this.props.playerData.preset)}`;
        if (this.props.playerData.overrideUrl !== null) {
            videoUrl = this.props.playerData.overrideUrl;
        }

        return (
            <div className={style["episode-video-wrapper"]} data={this.props.playerData.theater ? "true" : "false"}>
                <video
                    ref={this.setVideoRef}
                    crossOrigin="cross-origin"
                    preload="metadata"
                    className={style["episode-video"]}
                    controls={document.fullscreenElement !== null}
                    onPlay={() => {
                        this.forceUpdate();
                    }}
                    onPause={() => {
                        this.forceUpdate();
                    }}
                    onTimeUpdate={() => {
                        this.forceUpdate();
                    }}
                    onVolumeChange={() => {
                        this.forceUpdate();
                    }}
                    onLoadedMetadata={() => {
                        this.forceUpdate();
                    }}
                    onLoadedData={() => {
                        this.props.actions.setPlayerState("DONE");
                    }}
                    volume={this.props.preferences.volume}>
                    {this.props.playerData.preset === "VP9" ? <source src={videoUrl} /> : null}
                    {!this.props.playerData.subs || this.props.playerData.preset === "X264" ? null : (
                        <track label="English" kind="subtitles" srcLang="en" src={`${episodeLocationToURL(this.props.parent.location)}/${this.props.item.show}/${this.props.item.pos}/subs/eng.vtt`} default />
                    )}
                </video>
                <VideoPlayerControls
                    dimensions={this.props.dimensions}
                    playerData={this.props.playerData}
                    video={this.video}
                    timelineTooltip={this.timelineTooltip}
                    timelineText={this.timelineText}
                    timelineCanvas={this.timelineCanvas}
                    item={this.props.item}
                    encode={this.props.encode}
                    parent={this.props.parent}
                    segments={this.props.segments}
                    preferences={this.props.preferences}
                    actions={this.props.actions}
                />
                <div ref={this.setTimelineTooltipRef} className={style["episode-timeline-tooltip"]}>
                    <canvas className={style["episode-timeline-tooltip-canvas"]} ref={this.setTimelineCanvasRef} id="canvas" width={192} height={108} />
                    <div className={style["episode-timeline-tooltip-text"]} ref={this.setTimelineTextRef} />
                </div>
                {!this.props.playerData.opNotification || currentSegment.item === null || currentSegment.item.type !== SegmentTypeMapping.OP ? null : (
                    <VideoPlayerNotification type={"OP"} segment={currentSegment} video={this.video} actions={this.props.actions} />
                )}
                {!this.props.playerData.edNotification || currentSegment.item === null || currentSegment.item.type !== SegmentTypeMapping.ED ? null : (
                    <VideoPlayerNotification type={"ED"} segment={currentSegment} video={this.video} actions={this.props.actions} />
                )}
                <VideoPlayerOverlay state={this.props.playerData.state} />
                {!this.props.playerData.settings ? null : <VideoPlayerSettings item={this.props.item} encode={this.props.encode} actions={this.props.actions} playerData={this.props.playerData} />}
                {this.props.playerData.preset === "VP9" || this.props.playerData.overrideUrl !== null ? null : (
                    <VideoPlayerHlsWrapper item={this.props.item} parent={this.props.parent} video={this.video} preferences={this.props.preferences} actions={this.props.actions} playerData={this.props.playerData} />
                )}
            </div>
        );
    }
}

export default VideoPlayer;
