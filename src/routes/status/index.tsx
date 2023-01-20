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

const Status: FunctionalComponent<StatusConnectedProps> = (props: StatusConnectedProps) => {
    const jobs = Array.from(props.jobs.values()).filter(e => e.server === "cute-tomboys");
    jobs.sort((a, b) => parseFloat(b.progress) - parseFloat(a.progress));

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style.status}>
                <div className={style["status-title"]}>
                    <Text id="status.title" />
                </div>
                <div className={style["status-item"]}>
                    <div className={style["status-item-row"]}>
                        <div className={style["icon-general"]} />
                        <span className={style["status-item-row-title"]}>General</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Users:</span>
                        <span className={style["status-item-row-value"]}>{props.stats.users}</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Shows:</span>
                        <span className={style["status-item-row-value"]}>{props.stats.shows}</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Episodes:</span>
                        <span className={style["status-item-row-value"]}>{props.stats.episodes}</span>
                    </div>
                </div>
                <div className={style["status-item"]}>
                    <div className={style["status-item-row"]}>
                        <div className={style["icon-file"]} />
                        <span className={style["status-item-row-title"]}>File server - Vaporeon</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Capacity:</span>
                        <span className={style["status-item-row-value"]}>??/??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Bandwith used (last hour): </span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Transfer rate (last hour): </span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                </div>
                <div className={style["status-item"]}>
                    <div className={style["status-item-row"]}>
                        <div className={style["icon-tracker"]} />
                        <span className={style["status-item-row-title"]}>Tracker</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Peers:</span>
                        <span className={style["status-item-row-value"]}>?? (?? seeding/?? leeching)</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Bandwith used (last hour):</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Transfer rate (last hour):</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Availability:</span>
                        <span className={style["status-item-row-value"]}>?? (??-??)</span>
                    </div>
                </div>
                <div className={style["status-item"]}>
                    <div className={style["status-item-row"]}>
                        <div className={style["icon-encoding"]} />
                        <span className={style["status-item-row-title"]}>Encoding (cute-tomboys)</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Hardware:</span>
                        <span className={style["status-item-row-value"]}>AMD Ryzen 5 3600 (6-cores)</span>
                    </div>
                    {jobs.map((e, i) => <div key={i} className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]} data={e.status === "in progress" ? "blue" : undefined}>{e.status} | {e.type} | {e.name} | {e.progress}% | {e.details}</span>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Status);
