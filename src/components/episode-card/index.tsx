/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { getImageEndpoint } from "../../scripts/api/api";
import { secondsToString } from "../../scripts/nyan/util";
import { AnimeRatingMapping } from "../../ts/common/const";
/* Styles */
import style from "./style.scss";

const EpisodeCard: FunctionalComponent<EpisodeCardConnectedProps> = (props: EpisodeCardConnectedProps) => {
    if (props.item === undefined) {
        return (
            <a className={style.episode}>
                <div className={style["episode-data-wrapper"]}>
                    <div className={style["episode-title-wrapper"]}>
                        <div className={style["episode-title"]}>
                            <Text id="anime.episode.missing" />
                        </div>
                    </div>
                </div>
            </a>
        );
    }

    return (
        <div className={style.episode}>
            <div className={style["episode-thumbnail-wrapper"]}>
                <img
                    alt="episode-thumbnail"
                    src={`${getImageEndpoint()}/${props.item.anime}/${props.item.pos}/thumbnail.webp`}
                    className={style["episode-thumbnail"]}
                    data={props.parent.rating !== AnimeRatingMapping.R || !props.preferences.blur ? undefined : "blur"}
                />
                <div className={style["episode-extra-wrapper"]}>
                    <div className={style["episode-extra-wrapper-text"]} data="episode">
                        {props.item.title}
                    </div>
                    <div className={style["episode-extra-wrapper-text"]}>
                        {secondsToString(props.item.duration)}
                    </div>
                    <div className={style["episode-extra-wrapper-text"]} data="details">
                        <div className={style["icon-eye"]} /> {props.item.views}
                    </div>
                    <div className={style["episode-extra-wrapper-text"]} data="details">
                        <div className={style["icon-comment"]} /> 0
                    </div>
                </div>
                {props.disabled === false ? (
                    <a href={`/episodes/${props.item.id}`} className={style["episode-overlay"]} data="hover">
                        <div className={style["icon-play"]} />
                    </a>
                ) : null}
            </div>
            <div className={style["episode-data-wrapper"]}>
                <div className={style["episode-title"]}>
                    <span className={style["episode-title-highlight"]}>
                        <Text id="anime.episode.number" fields={{ num: props.i + 1, episodes: props.parent.episodes }} />
                    </span>
                </div>
                <div className={style["episode-title"]}>{props.item.title}</div>
                <div className={style["episode-stat-wrapper"]}>
                    <div className={style["episode-stat"]}>
                        <div className={style["icon-eye"]} /> {props.item.views}
                    </div>
                    <div className={style["episode-stat"]}>
                        <div className={style["icon-comment"]} /> 0
                    </div>
                </div>
                <div className={style["episode-buttons"]}>
                    <a href={`/episodes/${props.item.id}`} className={style["episode-button"]}>
                        <Text id="anime.episode.play" />
                    </a>
                    <a className={style["episode-button"]}>
                        <Text id="anime.episode.watchLater" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;
