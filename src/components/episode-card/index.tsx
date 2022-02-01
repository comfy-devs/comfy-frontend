/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { episodeLocationToURL } from "../../scripts/nyan/constants";
import { EpisodeCardConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const EpisodeCard: FunctionalComponent<EpisodeCardConnectedProps> = (props: EpisodeCardConnectedProps) => {
    if (props.item === undefined) {
        return (
            <a className={style.episode}>
                <div className={style["episode-title-wrapper"]}>
                    <div className={style["episode-title"]}>
                        <Text id="anime.episode.missing" />
                    </div>
                </div>
                <div alt="episode-thumbnail" className={style["episode-thumbnail"]} />
            </a>
        );
    }

    return (
        <div className={style.episode}>
            <div className={style["episode-thumbnail-wrapper"]}>
                <img alt="episode-thumbnail" src={`https://image.nyananime.xyz/${props.item.anime}/${props.item.pos}/thumbnail.webp`} className={style["episode-thumbnail"]} />
                {props.disabled === false ? (
                    <a href={`/episodes/${props.item.id}`} className={style["episode-overlay"]}>
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
                    <div
                        onClick={() => {
                            if (props.item === undefined) {
                                return;
                            }
                            
                            const e = document.createElement("a");
                            e.setAttribute("href", `${episodeLocationToURL(props.parent.location)}/${props.item.anime}/${props.item.pos}/ep_low.mp4`);
                            e.setAttribute("download", `${props.parent.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(" ", "_")}_${String(props.item.pos).padStart(3, "0")}_1080p`);
                            e.setAttribute("target", "_blank");
                            e.click();
                            e.remove();
                        }}
                        className={style["episode-button"]}>
                        <Text id="anime.episode.download" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodeCard;
