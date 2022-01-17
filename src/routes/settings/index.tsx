/* Base */
import { h, FunctionalComponent } from "preact";
import { SettingsConnectedProps } from "../../ts/routes";
import { PreferencesTheme } from "../../ts/base";
import { preferencesThemeToDisplayName } from "../../scripts/nyan/constants";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";

const Settings: FunctionalComponent<SettingsConnectedProps> = (props: SettingsConnectedProps) => {
    return (
        <div className={"route"}>
            <button onClick={() => { props.actions.setPreferencesTheme(props.preferences.theme === PreferencesTheme.DARK ? PreferencesTheme.LIGHT : PreferencesTheme.DARK) }}>Theme: {preferencesThemeToDisplayName(props.preferences.theme)}</button>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Settings);
