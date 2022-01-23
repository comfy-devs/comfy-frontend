/* Base */
import { h, FunctionalComponent } from "preact";
import { SettingsConnectedProps } from "../../ts/routes";
import { PreferencesTheme } from "../../ts/base";
import { notificationPreferencesToDisplayName, preferencesThemeToDisplayName } from "../../scripts/nyan/constants";
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
                <div className={style["settings-button"]} onClick={() => {
                    props.actions.setPreferencesTheme(props.preferences.theme === PreferencesTheme.DARK ? PreferencesTheme.LIGHT : PreferencesTheme.DARK);
                }}>
                    <div className={style["settings-button-title"]}>Theme: {preferencesThemeToDisplayName(props.preferences.theme)}</div></div>
                <div className={style["settings-button"]} onClick={async() => {
                    if(props.user === undefined) { return; }
                    if(Notification.permission === "default" || (Notification.permission === "granted" && !props.user.pushEnabled)) {
                        const res = await Notification.requestPermission();
                        if(res === "granted") {
                            setupNotifications((sub: PushSubscription) => {
                                const keys = sub.toJSON().keys;
                                if(keys === undefined) { return; }
                                
                                props.actions.pushSubscribe(sub.endpoint, keys.p256dh, keys.auth);
                            });
                        }
                    } else if(Notification.permission === "granted") {
                        props.actions.pushUnsubscribe();
                    }
                }}>
                    <div className={style["settings-button-title"]}>Notifications: {notificationPreferencesToDisplayName(Notification.permission, props.user)}</div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Settings);
