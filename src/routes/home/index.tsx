/* Base */
import { h, FunctionalComponent } from "preact";
import { HomeConnectedProps } from "../../ts/routes";
import { AnimeStatus } from "../../ts/base";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
/* Components */
import Topic from "../../components/topic";

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    /* Get sets to preview */
    const animes = Array.from(props.animes.values());
    const randomSet = animes.length < 1 ? [] : [animes[props.random % animes.length]];
    const airingSet = animes.filter((e) => { return e.status === AnimeStatus.AIRING; });
    const soonSet = airingSet.sort((a, b) => {
        if(a.timestamp === null || b.timestamp === null) { return 0; }
        return b.timestamp - a.timestamp;
    });
    const latestSet = animes.filter(e => { return e.timestamp !== null; }).sort((a, b) => {
        if(a.timestamp === null || b.timestamp === null) { return 0; }
        return b.timestamp - a.timestamp;
    });
    
    return (
        <div className="route">
            <div className={style["topic-group"]}>
                <Topic title={props.dictionary.home === undefined ? "" : props.dictionary.home.airing} icon="airing" small={false} items={airingSet} />
            </div>
            <div className={style["topics-separator"]} />
            <div className={style["topic-group"]}>
                <Topic title={props.dictionary.home === undefined ? "" : props.dictionary.home.soon} icon="soon" small={true} extra={1} items={soonSet} />
                <Topic title={props.dictionary.home === undefined ? "" : props.dictionary.home.latest} icon="latest" small={true} extra={0} items={latestSet} />
            </div>
            <div className={style["topics-separator"]} />
            <div className={style["topic-group"]}>
                <Topic title={props.dictionary.home === undefined ? "" : props.dictionary.home.random} icon="random" small={false} items={randomSet} />
            </div>
            <div className={style["topics-separator"]} />
        </div>
    );
};

export default (connect(mapState, mapDispatch(actions))(Home));
