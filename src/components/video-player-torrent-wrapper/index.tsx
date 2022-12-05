/* Base */
import { Component } from "preact";
import WebTorrent from "webtorrent";

class VideoPlayerTorrentWrapper extends Component<VideoPlayerTorrentWrapperConnectedProps> {
    client: WebTorrent.Instance;

    constructor(props: VideoPlayerTorrentWrapperConnectedProps) {
        super(props);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.client = new window.WebTorrent();
        this.client.on("error", (e) => {
            console.log(e);
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.client.loadWorker(navigator.serviceWorker.controller);

        if (props.parent.magnet === null) {
            this.props.actions.setPlayerState("DONE");
            return;
        }

        const torrent = this.client.add(`${props.parent.magnet}&tr=wss://tracker.nyananime.xyz`, () => {
            torrent.files
                .filter((e) => {
                    return e.path !== `${props.parent.id}/${props.item.pos}/episode_x264.mp4`;
                })
                .forEach((file) => {
                    file.deselect();
                });
        });
        torrent.on("error", (e) => {
            console.log(e);
        });
        torrent.on("warning", (e) => {
            console.log(e);
        });
        torrent.on("metadata", () => {
            this.props.actions.setPlayerState("TORRENT_LOADING");
        });
        torrent.on("ready", () => {
            torrent.files
                .filter((e) => {
                    return e.path === `${props.parent.id}/${props.item.pos}/episode_x264.mp4`;
                })
                .forEach((file) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    file.getStreamURL((e, url) => {
                        if (this.props.video === null) {
                            return;
                        }
                        if (e) {
                            console.error(e);
                            return;
                        }
                        this.props.actions.setPlayerOverrideUrl(url);
                        this.props.actions.setPlayerState("DONE");
                    });
                });
        });
        torrent.on("noPeers", () => {
            this.props.actions.setPlayerState("TORRENT_NO_PEERS");
        });
    }

    render() {
        return null;
    }
}

export default VideoPlayerTorrentWrapper;
