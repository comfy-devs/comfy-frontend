/* Base */
import { Component } from "preact";
import Hls from "hls.js";
import { VideoPlayerHlsWrapperConnectedProps } from "../../ts/components";
import { episodeLocationToURL } from "../../scripts/nyan/constants";

class VideoPlayerHlsWrapper extends Component<VideoPlayerHlsWrapperConnectedProps> {
    client: Hls;

    constructor(props: VideoPlayerHlsWrapperConnectedProps) {
        super(props);

        this.client = new Hls({
            maxMaxBufferLength: 30
        });
        if (props.video === null) {
            return;
        }
        this.client.attachMedia(props.video);
        this.client.on(Hls.Events.ERROR, (event, data) => {
            console.log(data);
        });
        this.client.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
            this.client.loadSource(`${episodeLocationToURL(this.props.parent.location)}/${this.props.item.anime}/${this.props.item.pos}/hls/x264/master.m3u8`);
            this.client.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                this.client.subtitleTrack = 0;
            });
        });
    }

    render() {
        return null;
    }
}

export default VideoPlayerHlsWrapper;
