/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { SettingsConnectedProps } from "../../ts/routes";
import { PreferencesTheme, PreferencesTorrent } from "../../ts/base";
import { setupNotifications } from "../../scripts/nyan/notifications";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";

const Settings: FunctionalComponent<SettingsConnectedProps> = (props: SettingsConnectedProps) => {
    return (
        <div className={"route"}>
            <div className={style.settings}>
                <div
                    className={style["settings-button"]}
                    onClick={() => {
                        props.actions.setPreferencesTheme(props.preferences.theme === PreferencesTheme.DARK ? PreferencesTheme.LIGHT : PreferencesTheme.DARK);
                    }}>
                    <div className={style["settings-button-title"]}>
                        <Text id="settings.theme" fields={{ theme: <Text id={`enum.preferencesTheme.${props.preferences.theme}`} /> }} />
                    </div>
                </div>
                <div
                    className={style["settings-button"]}
                    onClick={async () => {
                        if (props.user === undefined) {
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
                        <Text
                            id="settings.notifications"
                            fields={{
                                status:
                                    props.user === undefined ? (
                                        <Text id="enum.notificationPreference.notLoggedIn" />
                                    ) : !props.user.pushEnabled ? (
                                        <Text id="enum.notificationPreference.off" />
                                    ) : (
                                        <Text id={`enum.notificationPreference.${Notification.permission}`} />
                                    ),
                            }}
                        />
                    </div>
                </div>
                <div
                    className={style["settings-button"]}
                    onClick={() => {
                        props.actions.setPreferencesTorrent(props.preferences.torrent === PreferencesTorrent.OFF ? PreferencesTorrent.ON : PreferencesTorrent.OFF);
                    }}>
                    <div className={style["settings-button-title"]}>
                        <Text id="settings.torrent" fields={{ torrent: <Text id={`enum.preferencesTorrent.${props.preferences.torrent}`} /> }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Settings);
