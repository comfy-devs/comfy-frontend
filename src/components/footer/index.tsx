/* Base */
import { h, FunctionalComponent } from "preact";
import { FooterConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const Footer: FunctionalComponent<FooterConnectedProps> = (props: FooterConnectedProps) => {
    return (
        <div className={style.footer}>
            <div className={style["footer-text"]}>
                Hosting <span className={style["footer-text-highlight"]}>{"a"}</span> files with size of <span className={style["footer-text-highlight"]}>{"a"}</span>
            </div>
            <div className={style["footer-text"]}>
                Discord: <span className={style["footer-text-highlight"]}>LamkasDev#4235</span> - Email: <span className={style["footer-text-highlight"]}>me@lamkas.dev</span>
            </div>
        </div>
    );
};

export default Footer;
