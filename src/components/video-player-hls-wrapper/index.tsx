/* Base */
import { Component } from "preact";
import Hls from "hls.js";
import { episodeLocationToURL } from "../../scripts/nyan/constants";

class VideoPlayerHlsWrapper extends Component<VideoPlayerHlsWrapperConnectedProps> {
    client: Hls;

    constructor(props: VideoPlayerHlsWrapperConnectedProps) {
        super(props);
        
        this.client = new Hls({
            maxBufferHole: 3,
            maxFragLookUpTolerance: 5
        });
        if (props.video === null) {
            return;
        }
        this.client.attachMedia(props.video);
        this.client.on(Hls.Events.ERROR, (event, data) => {
            console.log(data);
        });
        this.client.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
            this.client.loadSource(`${episodeLocationToURL(this.props.parent.location)}/${this.props.item.anime}/${this.props.item.pos}/hls/${this.props.playerData.preset.toLowerCase()}/master.m3u8`);
            this.client.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                this.props.actions.setPlayerManifestLevels(this.client.levels.map(e => {
                    return {
                        codecs: `${e.videoCodec},${e.audioCodec}`,
                        resolution: `${e.width},${e.height}`,
                        bitrate: e.bitrate
                    };
                }));
                console.log(this.client.levels);
            });
        });
        this.client.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => {
            this.props.actions.setPlayerManifestSubtitles(this.client.subtitleTracks.map(e => {
                return {
                    name: e.lang ?? e.name
                };
            }));
            this.client.subtitleTrack = 0;
            this.client.subtitleDisplay = true;
            console.log(this.client.subtitleTracks);
        });
        this.client.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            this.props.actions.setPlayerManifestLevel(data.level);
        });
        this.client.on(Hls.Events.FRAG_CHANGED, () => {
            this.props.actions.setPlayerBandwith(this.client.bandwidthEstimate);
        });
    }

    render() {
        return null;
    }
}

export default VideoPlayerHlsWrapper;
