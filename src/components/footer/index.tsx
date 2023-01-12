/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { humanFileSize } from "../../scripts/comfy/util";
/* Styles */
import style from "./style.scss";

const Footer: FunctionalComponent<FooterConnectedProps> = (props: FooterConnectedProps) => {
    return (
        <div className={style.footer}>
            <div className={style["footer-text"]}>
                <Text id="footer.hosting" fields={{ files: props.stats.files, size: humanFileSize(props.stats.size) }} />
            </div>
            <div className={style["footer-text"]}>
                Discord: <span className={style["footer-text-highlight"]}>LamkasDev#4235</span> - Email: <span className={style["footer-text-highlight"]}>me@lamkas.dev</span>
            </div>
        </div>
    );
};

export default Footer;
