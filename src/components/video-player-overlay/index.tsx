/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
/* Styles */
import style from "./style.scss";

const VideoPlayerOverlay: FunctionalComponent<VideoPlayerOverlayConnectedProps> = (props: VideoPlayerOverlayConnectedProps) => {
    if (props.state === "DONE") {
        return null;
    }

    return (
        <div className={style["episode-video-loading"]}>
            <div className={style["episode-video-loading-text"]}>
                <Text id={`enum.playerState.${props.state}`} />
            </div>
        </div>
    );
};

export default VideoPlayerOverlay;
