/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
/* Styles */
import style from "./style.scss";
import switchStyle from "../switch.scss";

const VideoPlayerSettings: FunctionalComponent<VideoPlayerSettingsConnectedProps> = (props: VideoPlayerSettingsConnectedProps) => {
    // TODO: add tooltips to flags
    return (
        <div className={style["episode-video-settings"]}>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-quality"]} />
                Quality
                <div className={style["episode-video-settings-item-option"]} data="margin">
                    good
                </div>
            </div>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-audio"]} />
                Audio
                <div className={style["episode-video-settings-item-option"]} data="margin">
                    {props.item.audio.map((e, i) => <img key={i} className={style["option-flag"]} data={e === props.playerData.audio.lang ? "selected" : undefined}
                        src={`/assets/icons/flags/${e}.svg`} width={20} height={20}
                        onClick={() => { props.actions.setPlayerAudio({ lang: e }) }} />
                    )}
                </div>
            </div>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-subs"]} />
                Subtitles
                <div className={style["episode-video-settings-item-option"]} data="margin">
                    {props.item.subtitles.map((e, i) => <img key={i} className={style["option-flag"]} data={e === props.playerData.subs.lang ? "selected" : undefined}
                        src={`/assets/icons/flags/${e}.svg`} width={20} height={20}
                        onClick={() => { props.actions.setPlayerSubs({ enabled: true, lang: e }) }} />
                    )}
                </div>
            </div>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-debug"]} />
                Debug
                <div className={style["episode-video-settings-item-option"]}>
                    <div className={switchStyle.switch} style={{ transform: "scale(0.65)" }} onClick={() => { props.actions.setPlayerOverlay(!props.playerData.overlay); }}>
                        <input type="checkbox" checked={props.playerData.overlay} />
                        <div className={switchStyle["switch-slider"]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerSettings;
