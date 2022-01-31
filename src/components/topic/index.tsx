/* Base */
import { h, FunctionalComponent } from "preact";
import { TopicConnectedProps } from "../../ts/components";
import { topicExtraToDisplayName } from "../../scripts/nyan/functions";
/* Styles */
import style from "./style.scss";
/* Components */
import AnimeCard from "../anime-card";

const Topic: FunctionalComponent<TopicConnectedProps> = (props: TopicConnectedProps) => {
    return (
        <div className={style.topic} data={props.small === true ? "small" : undefined}>
            <div className={style["topic-title-wrapper"]}>
                {props.icon === undefined ? null : <div className={style[`icon-${props.icon}`]} />}
                <div className={style["topic-title"]}>{props.title}</div>
            </div>
            <div className={style["topic-previews"]}>
                {props.items.length < 1 ? <AnimeCard /> :
                    props.items.map((e, i) => {
                        return <AnimeCard key={i} item={e} extra={topicExtraToDisplayName(e, props.extra)} />;
                    })
                }
            </div>
        </div>
    );
};

export default Topic;
