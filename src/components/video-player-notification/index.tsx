/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
/* Styles */
import style from "./style.scss";

const VideoPlayerNotification: FunctionalComponent<VideoPlayerNotificationConnectedProps> = (props: VideoPlayerNotificationConnectedProps) => {
    return (
        <div className={style.notification}>
            <div className={style["notification-text"]}>
                <Text id={`enum.videoPlayerNotification.${props.type}`} />
            </div>
            <div className={style["notification-links"]}>
                <div
                    onClick={() => {
                        if (props.video === null) {
                            return;
                        }
                        props.video.currentTime = props.time;
                        switch (props.type) {
                            case "OP":
                                props.actions.setPlayerOpNotification(false);
                                break;

                            case "ED":
                                props.actions.setPlayerEdNotification(false);
                                break;

                            case "RESUME":
                                props.actions.setPlayerResumeNotification(false);
                                break;
                        }
                    }}
                    className={style["notification-link"]}
                    data="skip">
                    ({<Text id="video.notification.skip" />})
                </div>
                <div
                    onClick={() => {
                        if (props.video === null) {
                            return;
                        }
                        switch (props.type) {
                            case "OP":
                                props.actions.setPlayerOpNotification(false);
                                break;

                            case "ED":
                                props.actions.setPlayerEdNotification(false);
                                break;

                            case "RESUME":
                                props.actions.setPlayerResumeNotification(false);
                                break;
                        }
                    }}
                    className={style["notification-link"]}
                    data="hide">
                    ({<Text id="video.notification.hide" />})
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerNotification;
