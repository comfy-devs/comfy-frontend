/* Base */
import { h, FunctionalComponent } from "preact";
import { NavLink } from "react-router-dom";
import { HeaderConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <div className={style.header}>
            <div className={style["header-section-0"]}>
                <img alt="logo" src={"/assets/icons/icon-32x32.webp"} className={style["header-icon"]} />
                <a href="/" className={style["header-title"]}>
                    Nyan Anime
                </a>
            </div>
            <div className={style["header-section-1"]}>
                <div className={style["header-button"]}>
                    {props.user === undefined ?
                    <NavLink to="/login" className={style["header-button-title"]}>Login</NavLink>
                    : <NavLink to="/account" className={style["header-button-title"]}>{props.user.username}</NavLink>}
                </div>
            </div>
        </div>
    );
};

export default Header;
