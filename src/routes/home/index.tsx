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

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
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
    const airingSet = shows.filter((e) => {
        return e.status === ShowStatusMapping.AIRING;
    });
    const soonSet = airingSet.sort((a, b) => {
        if (a.timestamp === null || b.timestamp === null) {
            return 0;
        }
        return a.timestamp - b.timestamp;
    });
    const latestSet = shows
        .filter((e) => {
            return e.timestamp !== null;
        })
        .sort((a, b) => {
            if (a.timestamp === null || b.timestamp === null) {
                return 0;
            }
            return b.timestamp - a.timestamp;
        });
    const randomSet = shows.length < 1 ? [] : [shows[props.random % shows.length]];

    return (
        <div className={baseStyle["page-content"]}>
            {props.user !== undefined ? (
                <div className={style["topic-group"]}>
                    <Topic dimensions={props.dimensions} title={props.dictionary.home?.favourites} icon="favourites" small={false} items={favouritesSet} preferences={props.preferences} />
                </div>
            ) : undefined}
            <div className={style["topic-group"]}>
                <Topic dimensions={props.dimensions} title={props.dictionary.home?.airing} icon="airing" small={false} items={airingSet} preferences={props.preferences} />
            </div>
            <div className={style["topics-separator"]} />
            <div className={style["topic-group"]}>
                <Topic dimensions={props.dimensions} title={props.dictionary.home?.soon} icon="soon" small={true} extra={1} items={soonSet} preferences={props.preferences} />
                <Topic dimensions={props.dimensions} title={props.dictionary.home?.latest} icon="latest" small={true} extra={0} items={latestSet} preferences={props.preferences} />
            </div>
            <div className={style["topics-separator"]} />
            <div className={style["topic-group"]}>
                <Topic dimensions={props.dimensions} title={props.dictionary.home?.random} icon="random" small={false} items={randomSet} preferences={props.preferences} />
            </div>
            <div className={style["topics-separator"]} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
