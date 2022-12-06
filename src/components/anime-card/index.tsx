/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { getImageEndpoint } from "../../scripts/api/api";
import { AnimeRatingMapping } from "../../ts/common/const";
/* Styles */
import style from "./style.scss";

const AnimeCard: FunctionalComponent<AnimeCardConnectedProps> = (props: AnimeCardConnectedProps) => {
    if (props.item === undefined) {
        return (
            <a
                className={style.anime}
                onDragStart={(e) => {
                    e.preventDefault();
                }}>
                <div className={style["anime-thumbnail"]} style={{ cursor: "default" }} />
                <div className={style["anime-title-wrapper"]}>
                    <div className={style["anime-title"]}>
                        <Text id="anime.missing" />
                    </div>
                </div>
            </a>
        );
    }
    const title = props.item.title.length <= 18 ? props.item.title : `${props.item.title.substring(0, 15)}...`;

    return (
        <a
            href={`/animes/${props.item.id}`}
            className={style.anime}
            data={props.alt ? "alt" : undefined}
            onDragStart={(e) => {
                e.preventDefault();
            }}>
            <img alt="anime-thumbnail" src={`${getImageEndpoint()}/${props.item.id}/poster.webp`} className={style["anime-thumbnail"]} data={props.item.rating !== AnimeRatingMapping.R || !props.preferences.blur ? undefined : "blur"} />
            <div className={style["anime-title-wrapper"]}>
                <div className={style["anime-title"]}>{title}</div>
                <div className={style["anime-favourites-wrapper"]}>
                    <div className={style["icon-star"]} />
                    <div className={style["anime-favourites"]}>{props.item.favourites}</div>
                </div>
            </div>
            {props.extra === undefined ? null : (
                <div className={style["anime-extra-wrapper"]}>
                    <div className={style["anime-extra-text"]}>{props.extra}</div>
                </div>
            )}
            <div className={style["anime-overlay"]}>
                <div className={style["icon-info"]} />
            </div>
        </a>
    );
};

export default AnimeCard;
