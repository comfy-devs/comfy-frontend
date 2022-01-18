/* Base */
import { h, FunctionalComponent } from "preact";
import { NavLink } from "react-router-dom";
/* Styles */
import style from "./style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <header class={style["header"]}>
            <h1 class={style["header-title"]}>Foxxy UI</h1>
            <nav class={style["header-nav"]}>
                <NavLink to="/" className={({ isActive }) => (isActive ? [style["header-nav-link"], style["header-nav-link-active"]].join(" ") : style["header-nav-link"])}>
                    Home
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
