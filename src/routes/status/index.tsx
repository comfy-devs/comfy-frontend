/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { StatusConnectedProps } from "../../ts/routes";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";

const Status: FunctionalComponent<StatusConnectedProps> = (props: StatusConnectedProps) => {
    return (
        <div className="route">
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
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Anime:</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Episodes:</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                </div>
                <div className={style["status-item"]}>
                    <div className={style["status-item-row"]}>
                        <div className={style["icon-api"]} />
                        <span className={style["status-item-row-title"]}>API</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Online:</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                </div>
                <div className={style["status-item"]}>
                    <div className={style["status-item-row"]}>
                        <div className={style["icon-file"]} />
                        <span className={style["status-item-row-title"]}>File server - Akagi</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Online:</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Capacity:</span>
                        <span className={style["status-item-row-value"]}>
                            ??/??
                        </span>
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
                        <div className={style["icon-file"]} />
                        <span className={style["status-item-row-title"]}>File server - Kaga</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Online:</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Capacity:</span>
                        <span className={style["status-item-row-value"]}>
                            ??/??
                        </span>
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
                        <span className={style["status-item-row-key"]}>Online:</span>
                        <span className={style["status-item-row-value"]}>??</span>
                    </div>
                    <div className={style["status-item-row"]}>
                        <span className={style["status-item-row-key"]}>Peers:</span>
                        <span className={style["status-item-row-value"]}>
                        ?? (?? seeding/?? leeching)
                        </span>
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
                        <span className={style["status-item-row-value"]}>
                            ?? (??-??)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Status);
