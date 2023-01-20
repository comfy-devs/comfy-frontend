/* Base */
import { FunctionalComponent } from "preact";
import Hls, { LoaderCallbacks, LoaderConfiguration, LoaderContext, HlsConfig } from "hls.js";
import { episodeLocationToURL } from "../../scripts/comfy/constants";
import { useEffect, useState } from "react";
import { Torrent, TorrentFile } from "webtorrent";

function createLoader(torrent: Torrent | null, root: string) {
    return class TorrentLoader extends Hls.DefaultConfig.loader {
        load(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<LoaderContext>) {
            const { url } = context;
            const path = url.replace(root, "");

            const file = torrent !== null ? torrent.files.find((e: TorrentFile) => path === e.path) : undefined;
            if (file !== undefined) {
                (file as any).getStreamURL((e: Error, url: string) => {
                    if (e) {
                        console.error(e);
                        return;
                    }
                    context.url = url;
                    super.load(context, config, callbacks);
                });
            } else {
                super.load(context, config, callbacks);
            }
        }
    };
}

const VideoPlayerHlsWrapper: FunctionalComponent<VideoPlayerHlsWrapperConnectedProps> = (props: VideoPlayerHlsWrapperConnectedProps) => {
    const [torrentClient, setTorrentClient] = useState<null | any>(null);
    useEffect(() => {
        /*
         * if (props.preferences.torrent && props.parent.magnet !== null) {
         *  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         *  // @ts-ignore
         *  const torrentClient = new window.WebTorrent();
         *  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
         *  // @ts-ignore
         *  torrentClient.loadWorker(navigator.serviceWorker.controller);
         *
         *  setTorrentClient(torrentClient);
         * }
         */
    }, [props.parent.magnet]);
    const [torrentReady, setTorrentReady] = useState<null | boolean>(null);
    const [torrent, setTorrent] = useState<null | Torrent>(null);
    useEffect(() => {
        if (torrentClient !== null) {
            const torrent = torrentClient.add(`${episodeLocationToURL(props.parent.location)}/${props.item.show}/series.torrent`, { announce: ["wss://localhost:9102"] }, () => {
                torrent.files.forEach((file: any) => {
                    file.deselect();
                });
            });
            torrent.on("error", (e: any) => {
                console.log(e);
            });
            torrent.on("warning", (e: any) => {
                console.log(e);
            });
            torrent.on("metadata", () => {
                console.log("metadata");
            });
            torrent.on("ready", () => {
                console.log("ready");
                setTorrentReady(true);
            });
            torrent.on("noPeers", () => {
                console.log("no peers");
            });
            setTorrent(torrent);
        }
    }, [torrentClient]);
    const [loader, setLoader] = useState<null | any>(null);
    useEffect(() => {
        if (torrentReady === true) {
            setLoader(() => createLoader(torrent, `${episodeLocationToURL(props.parent.location)}/`));
        }
    }, [torrentReady]);
    const [client, setClient] = useState<null | Hls>(null);
    useEffect(() => {
        const options: HlsConfig = Hls.DefaultConfig;
        options.startFragPrefetch = true;
        options.backBufferLength = 0;
        options.maxBufferLength = 10;
        options.maxBufferSize = 60 * 1024 * 1024;
        options.maxMaxBufferLength = 20;
        if (loader !== null) {
            options.loader = loader;
        }
        setClient(new Hls(options));
    }, [loader]);

    useEffect(() => {
        if (client === null || props.video === null) {
            return;
        }
        client.attachMedia(props.video);
        client.on(Hls.Events.ERROR, (event, data) => {
            console.log(data);
        });
        client.on(Hls.Events.MEDIA_ATTACHED, (event, data) => {
            client.loadSource(`${episodeLocationToURL(props.parent.location)}/${props.item.show}/${props.item.pos}/hls/${props.playerData.preset.toLowerCase()}/master.m3u8`);
            client.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                props.actions.setPlayerManifestLevels(
                    client.levels.map((e) => {
                        return {
                            codecs: `${e.videoCodec},${e.audioCodec}`,
                            resolution: `${e.width},${e.height}`,
                            bitrate: e.bitrate,
                        };
                    })
                );
            });
        });
        client.on(Hls.Events.AUDIO_TRACKS_UPDATED, () => {
            props.actions.setPlayerManifestAudio(
                client.audioTracks.map((e) => {
                    return {
                        name: e.name,
                        lang: e.lang ?? e.name,
                    };
                })
            );
        });
        client.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => {
            props.actions.setPlayerManifestSubtitles(
                client.subtitleTracks.map((e) => {
                    return {
                        name: e.name,
                        lang: e.lang ?? e.name,
                    };
                })
            );
            client.subtitleTrack = 0;
            client.subtitleDisplay = true;
        });
        client.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            props.actions.setPlayerManifestLevel(data.level);
        });
        client.on(Hls.Events.FRAG_CHANGED, () => {
            props.actions.setPlayerBandwith(client.bandwidthEstimate);
        });

        return () => {
            client.destroy();
        };
    }, [client, props.video]);
    useEffect(() => {
        if (client === null) {
            return;
        }
        const track = client.audioTracks.findIndex((e) => e.lang === props.playerData.audio.lang);
        if (track !== -1) {
            client.audioTrack = track;
            console.log(`new audio: ${props.playerData.audio.lang}`);
        }
    }, [client, client?.audioTracks, props.playerData.audio.lang]);
    useEffect(() => {
        if (client === null) {
            return;
        }
        const track = client.subtitleTracks.findIndex((e) => e.lang === props.playerData.subs.lang);
        if (track !== -1) {
            client.subtitleTrack = track;
            console.log(`new subtitles: ${props.playerData.subs.lang}`);
        }
    }, [client, client?.subtitleTracks, props.playerData.subs.lang]);
    useEffect(() => {
        if (client === null) {
            return;
        }
        client.subtitleDisplay = props.playerData.subs.enabled;
    }, [client, props.playerData.subs.enabled]);

    return null;
};

export default VideoPlayerHlsWrapper;
