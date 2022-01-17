/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";

const Download: FunctionalComponent = () => {
    const versions = [
        {
            name: "Android",
            type: "android",
            details: `> Catching up to web version
                - Home screen previews
                - Segments in video player
                > Made compatible with API changes
                > Minor bug fixes`,
            version: "beta-2",
            link: "https://files.catbox.moe/nyj82y.apk"
        },
        {
            name: "Android",
            type: "android",
            details: `> First release of the app`,
            version: "beta-1",
            link: "https://files.catbox.moe/93qsr2.apk"
        }
    ]

    return (
        <div className={"route"}>
            <div className={style.download}>
                <div className={style["download-title"]}>Downloads</div>
                {versions.map((e, i) => {
                    return <div key={i} className={style["download-item"]}>
                        <div className={style["download-item-row"]}>
                            <div className={style[`icon-${e.type}`]} />
                            {e.name} <span className={style["download-item-row-version"]}>[{e.version}]</span>
                            <a href={e.link} download={`nyananime-${e.version}`} className={style["download-item-row-link"]}>(Download)</a>
                        </div>
                        <div className={style["download-item-row"]}>
                            <div className={style["download-item-row-details"]}>
                                {e.details.split("\n").map((e, i) => { return <div key={i}>{e}<br /></div> })}
                            </div>
                        </div>
                    </div>;
                })}
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Download);
