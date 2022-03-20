/* Base */
import { h, FunctionalComponent } from "preact";
import { NavLink } from "react-router-dom";
import { Text } from "preact-i18n";
import { SubHeaderConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const SubHeader: FunctionalComponent<SubHeaderConnectedProps> = (props: SubHeaderConnectedProps) => {
    return (
        <div className={style["sub-header"]}>
            <NavLink to="/" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>
                    <Text id="general.home" />
                </div>
            </NavLink>
            <NavLink to="/all" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>
                    <Text id="general.all" />
                </div>
            </NavLink>
            {props.dimensions.w < 500 ? null : (
                <NavLink to="/settings" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                    <div className={style["sub-header-button-title"]}>
                        <Text id="general.settings" />
                    </div>
                </NavLink>
            )}
            <NavLink to="/download" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>
                    <Text id="general.download" />
                </div>
            </NavLink>
            {props.dimensions.w < 500 ? null : (
                <NavLink to="/status" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                    <div className={style["sub-header-button-title"]}>
                        <Text id="general.status" />
                    </div>
                </NavLink>
            )}
        </div>
    );
};

export default SubHeader;
