/* Base */
import { h, FunctionalComponent } from "preact";
import { NavLink } from "react-router-dom";
/* Styles */
import style from "./style.scss";

const SubHeader: FunctionalComponent = () => {
    return (
        <div className={style["sub-header"]}>
            <NavLink to="/" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>Home</div>
            </NavLink>
            <NavLink to="/all" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>All</div>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>Settings</div>
            </NavLink>
            <NavLink to="/download" className={({ isActive }) => (isActive ? [style["sub-header-button"], style["sub-header-button-enabled"]].join(" ") : style["sub-header-button"])}>
                <div className={style["sub-header-button-title"]}>Download</div>
            </NavLink>
        </div>
    );
};

export default SubHeader;
