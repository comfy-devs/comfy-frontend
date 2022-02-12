/* Base */
import { Component } from "preact";
import Hls from "hls.js";
import { VideoPlayerHlsWrapperConnectedProps } from "../../ts/components";
import { episodeLocationToURL } from "../../scripts/nyan/constants";

class VideoPlayerHlsWrapper extends Component<VideoPlayerHlsWrapperConnectedProps> {
    client: Hls;

    constructor(props: VideoPlayerHlsWrapperConnectedProps) {
        super(props);

        this.client = new Hls();
        if (props.video === null) {
            return;
        }

        this.client.loadSource(`${episodeLocationToURL(this.props.parent.location)}/${this.props.item.anime}/${this.props.item.pos}/hls/x264/master.m3u8`);
        this.client.attachMedia(props.video);
    }

    render() {
        return null;
    }
}

export default VideoPlayerHlsWrapper;
