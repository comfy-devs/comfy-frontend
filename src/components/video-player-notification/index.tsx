/* Base */
import { h, FunctionalComponent } from "preact";
import { VideoPlayerNotificationConnectedProps } from "../../ts/components";
import { VideoPlayerNotificationType } from "../../ts/base";
import { videoPlayerNotificationTypeToText } from "../../scripts/nyan/constants";
/* Styles */
import style from "./style.scss";

const VideoPlayerNotification: FunctionalComponent<VideoPlayerNotificationConnectedProps> = (props: VideoPlayerNotificationConnectedProps) => {
    return <div className={style.notification}>
        <div className={style["notification-text"]}>{videoPlayerNotificationTypeToText(props.type)}</div>
        {props.type === VideoPlayerNotificationType.OP || props.type === VideoPlayerNotificationType.ED ?
            <div className={style["notification-links"]}>
                <div onClick={() => {
                    if(props.video === null) { return; }
                    props.video.currentTime = props.segment.end;

                    switch(props.type) {
                        case VideoPlayerNotificationType.OP:
                            props.actions.setPlayerOpNotification(false);
                            break;

                        case VideoPlayerNotificationType.ED:
                            props.actions.setPlayerEdNotification(false);
                            break;
                    }
                }} className={style["notification-link"]}>(Skip)</div>
                <div onClick={() => {
                    if(props.video === null) { return; }
                    switch(props.type) {
                        case VideoPlayerNotificationType.OP:
                            props.actions.setPlayerOpNotification(false);
                            break;

                        case VideoPlayerNotificationType.ED:
                            props.actions.setPlayerEdNotification(false);
                            break;
                    }
                }} className={style["notification-link"]}>(Hide)</div>
            </div> : null
        }
    </div>
};

export default VideoPlayerNotification;
