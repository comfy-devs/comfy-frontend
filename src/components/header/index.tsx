/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import { Text } from "preact-i18n";
/* Styles */
import style from "./style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <div className={style.header}>
            <a href="/" className={style["header-section-0"]}>
                <img alt="logo" src={"/assets/icons/icon-32x32.webp"} className={style["header-icon"]} />
                <div className={style["header-title"]}>
                    <Text id="general.name" />
                </div>
            </a>
            <div className={style["header-section-1"]}>
                <a href="https://discord.gg/MfdxkEAJE3" className={style["icon-discord"]} target="_blank" rel="noreferrer" />
                <a href="https://github.com/comfy-devs" className={style["icon-github"]} target="_blank" rel="noreferrer" />
                {props.user === null ? (
                    <Link className={style["header-button"]} href="/login">
                        <div className={style["header-button-title"]}>
                            <Text id="general.login" />
                        </div>
                    </Link>
                ) : (
                    <Link className={style["header-button"]} href="/account">
                        <div className={style["header-button-title"]}>{props.user.username}</div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
