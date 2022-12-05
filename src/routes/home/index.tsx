/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect } from "react";
import { AnimeStatusMapping } from "../../ts/common/const";
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
        props.actions.fetchAllAnimes();
    }, [true]);

    /* Get sets to preview */
    const animes = Array.from(props.animes.values());
    const favouritesSet = props.user === undefined ? [] : animes.filter((e) => {
        return props.user?.favourites.includes(e.id);
    });
    const airingSet = animes.filter((e) => {
        return e.status === AnimeStatusMapping.AIRING;
    });
    const soonSet = airingSet.sort((a, b) => {
        if (a.timestamp === null || b.timestamp === null) {
            return 0;
        }
        return a.timestamp - b.timestamp;
    });
    const latestSet = animes
        .filter((e) => {
            return e.timestamp !== null;
        })
        .sort((a, b) => {
            if (a.timestamp === null || b.timestamp === null) {
                return 0;
            }
            return b.timestamp - a.timestamp;
        });
    const randomSet = animes.length < 1 ? [] : [animes[props.random % animes.length]];

    return (
        <div className={baseStyle["page-content"]}>
            {props.user !== undefined ?
                <div className={style["topic-group"]}>
                    <Topic dimensions={props.dimensions} title={props.dictionary.home === undefined ? "" : props.dictionary.home.favourites} icon="favourites" small={false} items={favouritesSet} preferences={props.preferences} />
                </div> : undefined
            }
            <div className={style["topic-group"]}>
                <Topic dimensions={props.dimensions} title={props.dictionary.home === undefined ? "" : props.dictionary.home.airing} icon="airing" small={false} items={airingSet} preferences={props.preferences} />
            </div>
            <div className={style["topics-separator"]} />
            <div className={style["topic-group"]}>
                <Topic dimensions={props.dimensions} title={props.dictionary.home === undefined ? "" : props.dictionary.home.soon} icon="soon" small={true} extra={1} items={soonSet} preferences={props.preferences} />
                <Topic dimensions={props.dimensions} title={props.dictionary.home === undefined ? "" : props.dictionary.home.latest} icon="latest" small={true} extra={0} items={latestSet} preferences={props.preferences} />
            </div>
            <div className={style["topics-separator"]} />
            <div className={style["topic-group"]}>
                <Topic dimensions={props.dimensions} title={props.dictionary.home === undefined ? "" : props.dictionary.home.random} icon="random" small={false} items={randomSet} preferences={props.preferences} />
            </div>
            <div className={style["topics-separator"]} />
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
