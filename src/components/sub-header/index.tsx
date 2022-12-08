/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { Link } from "preact-router/match";
/* Styles */
import style from "./style.scss";

const SubHeader: FunctionalComponent<SubHeaderConnectedProps> = (props: SubHeaderConnectedProps) => {
    return (
        <div className={style["sub-header"]}>
            <Link href="/" className={style["sub-header-button"]} activeClassName={style["sub-header-button-active"]}>
                <div className={style["sub-header-button-title"]}>
                    <Text id="general.home" />
                </div>
            </Link>
            <Link href="/all" className={style["sub-header-button"]} activeClassName={style["sub-header-button-active"]}>
                <div className={style["sub-header-button-title"]}>
                    <Text id="general.all" />
                </div>
            </Link>
            {props.dimensions.w < 500 ? null : (
                <Link href="/settings" className={style["sub-header-button"]} activeClassName={style["sub-header-button-active"]}>
                    <div className={style["sub-header-button-title"]}>
                        <Text id="general.settings" />
                    </div>
                </Link>
            )}
            <Link href="/download" className={style["sub-header-button"]} activeClassName={style["sub-header-button-active"]}>
                <div className={style["sub-header-button-title"]}>
                    <Text id="general.download" />
                </div>
            </Link>
            {props.dimensions.w < 500 ? null : (
                <Link href="/status" className={style["sub-header-button"]} activeClassName={style["sub-header-button-active"]}>
                    <div className={style["sub-header-button-title"]}>
                        <Text id="general.status" />
                    </div>
                </Link>
            )}
        </div>
    );
};

export default SubHeader;
