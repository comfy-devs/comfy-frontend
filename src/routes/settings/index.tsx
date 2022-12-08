/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { setupNotifications } from "../../scripts/nyan/notifications";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Settings: FunctionalComponent<SettingsConnectedProps> = (props: SettingsConnectedProps) => {
    return (
        <div className={baseStyle["page-content"]}>
            <div className={style.settings}>
                <div
                    className={style["settings-button"]}
                    onClick={() => {
                        props.actions.setPreferencesTheme(props.preferences.theme === "dark" ? "light" : "dark");
                    }}>
                    <div className={style["settings-button-title"]}>
                        <Text id="settings.theme" />: <span className={style["settings-button-highlight"]}>
                            <Text id={`enum.preferencesTheme.${props.preferences.theme}`} />
                        </span>
                    </div>
                </div>
                <div
                    className={style["settings-button"]}
                    onClick={async () => {
                        if (props.user === null) {
                            return;
                        }
                        if (Notification.permission === "default" || (Notification.permission === "granted" && !props.user.pushEnabled)) {
                            const res = await Notification.requestPermission();
                            if (res === "granted") {
                                setupNotifications((sub: PushSubscription) => {
                                    const keys = sub.toJSON().keys;
                                    if (keys === undefined) {
                                        return;
                                    }

                                    props.actions.pushSubscribe(sub.endpoint, keys.p256dh, keys.auth);
                                });
                            }
                        } else if (Notification.permission === "granted") {
                            props.actions.pushUnsubscribe();
                        }
                    }}>
                    <div className={style["settings-button-title"]}>
                        <Text id="settings.torrent" />: <span className={style["settings-button-highlight"]}>
                            {
                                props.user === null ? (
                                    <Text id="enum.notificationPreference.notLoggedIn" />
                                ) : !props.user.pushEnabled ? (
                                    <Text id="enum.notificationPreference.off" />
                                ) : (
                                    <Text id={`enum.notificationPreference.${Notification.permission}`} />
                                )
                            }
                        </span>
                    </div>
                </div>
                <div className={style["settings-button"]}
                    onClick={() => {
                        props.actions.setPreferencesTorrent(props.preferences.torrent === false);
                    }}>
                    <div className={style["settings-button-title"]}>
                        <Text id="settings.torrent" />: <span className={style["settings-button-highlight"]}>
                            <Text id={`enum.preferencesTorrent.${props.preferences.torrent}`} />
                        </span>
                    </div>
                </div>
                <div className={style["settings-button"]}
                    onClick={() => {
                        props.actions.setPreferencesBlur(!props.preferences.blur);
                    }}>
                    <div className={style["settings-button-title"]}>
                        <Text id="settings.blur" />: <span className={style["settings-button-highlight"]}>
                            <Text id={`enum.preferencesBlur.${props.preferences.blur}`} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Settings);
