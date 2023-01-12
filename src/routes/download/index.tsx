/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Download: FunctionalComponent<DownloadConnectedProps> = (props: DownloadConnectedProps) => {
    const versions = [
        {
            name: "Android",
            type: "android",
            details: `> Video player improvements
                - Seekbar now works
                > Added settings screen
                > Added support for new HLS releases`,
            version: "beta-4",
            link: "https://files.catbox.moe/ju93k5.apk",
        },
        {
            name: "Android",
            type: "android",
            details: `> Video player improvements
                - Improved UI with rewinding/seeking buttons
                - Better and animated fading
                > Minor bug fixes`,
            version: "beta-3",
            link: "https://files.catbox.moe/u7c0m7.apk",
        },
        {
            name: "Android",
            type: "android",
            details: `> Catching up to web version
                - Home screen previews
                - Segments in video player
                > Made compatible with API changes
                > Minor bug fixes`,
            version: "beta-2",
            link: "https://files.catbox.moe/c8erwb.apk",
        },
        {
            name: "Android",
            type: "android",
            details: "> First release of the app",
            version: "beta-1",
            link: "https://files.catbox.moe/93qsr2.apk",
        },
    ];
    const androidVersions = versions.filter((e) => {
        return e.type === "android";
    });
    const latestAndroid = androidVersions.sort()[0];

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style.download}>
                <div className={style["download-title"]}>
                    <Text id="download.title" />
                </div>
                <div className={style["download-item"]}>
                    <div className={style["download-item-row"]}>
                        <div className={style["icon-android"]} />
                        Android <span className={style["download-item-row-version"]}>[{latestAndroid.version}]</span>
                        <a href={latestAndroid.link} download={`comfy-${latestAndroid.version}`} className={style["download-item-row-link"]}>
                            (<Text id="download.link" />)
                        </a>
                    </div>
                    <div className={style["download-item-row"]}>
                        <div className={style["download-item-row-details"]}>Latest Android version</div>
                    </div>
                </div>
                <div className={style["download-title"]}>
                    <Text id="download.versions" />
                </div>
                {versions.map((e, i) => {
                    return (
                        <div key={i} className={style["download-item"]}>
                            <div className={style["download-item-row"]}>
                                <div className={style[`icon-${e.type}`]} />
                                {e.name} <span className={style["download-item-row-version"]}>[{e.version}]</span>
                                <a href={e.link} download={`comfy-${e.version}`} className={style["download-item-row-link"]}>
                                    (<Text id="download.link" />)
                                </a>
                            </div>
                            <div className={style["download-item-row"]}>
                                <div className={style["download-item-row-details"]}>
                                    {e.details.split("\n").map((e, i) => {
                                        return (
                                            <div key={i}>
                                                {e}
                                                <br />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Download);
