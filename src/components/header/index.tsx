/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router/match";
/* Styles */
import style from "./style.scss";

const Header: FunctionalComponent<HeaderConnectedProps> = (props: HeaderConnectedProps) => {
    return (
        <header class={style["header"]}>
            <h1 class={style["header-title"]}>Foxxy UI</h1>
            <nav class={style["header-nav"]}>
                <Link class={style["header-nav-link"]} activeClassName={style["header-nav-link-active"]} href="/">
                    Home
                </Link>
            </nav>
        </header>
    );
};

export default Header;
