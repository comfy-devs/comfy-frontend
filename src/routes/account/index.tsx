/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { ShowStatusMapping } from "../../ts/common/const";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";
/* Components */
import Topic from "../../components/topic";

const Account: FunctionalComponent<AccountConnectedProps> = (props: AccountConnectedProps) => {
    /* API calls */
    useEffect(() => {
        props.actions.fetchAllShows();
    }, [props.actions]);

    /* Get sets to preview */
    const shows = Array.from(props.shows.values());
    const favouritesSet =
        props.user === undefined
            ? []
            : shows.filter((e) => {
                  return props.user?.favourites.includes(e.id);
              });

    return (
        <div className={baseStyle["page-content"]}>
            {props.user !== undefined ? (
                <div className={style["topic-group"]}>
                    <Topic dimensions={props.dimensions} title={props.dictionary.home?.favourites} icon="favourites" small={false} items={favouritesSet} preferences={props.preferences} />
                </div>
            ) : undefined}
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Account);
