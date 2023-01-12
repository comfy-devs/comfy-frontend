/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { getImageEndpoint } from "../../scripts/api/api";
import { ShowRatingMapping } from "../../ts/common/const";
/* Styles */
import style from "./style.scss";

const ShowCard: FunctionalComponent<ShowCardConnectedProps> = (props: ShowCardConnectedProps) => {
    if (props.item === undefined) {
        return (
            <a
                className={style.show}
                onDragStart={(e) => {
                    e.preventDefault();
                }}>
                <div className={style["show-thumbnail"]} style={{ cursor: "default" }} />
                <div className={style["show-title-wrapper"]}>
                    <div className={style["show-title"]}>
                        <Text id="show.missing" />
                    </div>
                </div>
            </a>
        );
    }
    const title = props.item.title.length <= 18 ? props.item.title : `${props.item.title.substring(0, 15)}...`;

    return (
        <a
            href={`/shows/${props.item.id}`}
            className={style.show}
            data={props.alt === true ? "alt" : undefined}
            onDragStart={(e) => {
                e.preventDefault();
            }}>
            <img alt="show-thumbnail" src={`${getImageEndpoint()}/${props.item.id}/poster.webp`} className={style["show-thumbnail"]} data={props.item.rating !== ShowRatingMapping.R || !props.preferences.blur ? undefined : "blur"} />
            <div className={style["show-title-wrapper"]}>
                <div className={style["show-title"]}>{title}</div>
                <div className={style["show-favourites-wrapper"]}>
                    <div className={style["icon-star"]} />
                    <div className={style["show-favourites"]}>{props.item.favourites}</div>
                </div>
            </div>
            {props.extra === undefined ? null : (
                <div className={style["show-extra-wrapper"]}>
                    <div className={style["show-extra-text"]}>{props.extra}</div>
                </div>
            )}
            <div className={style["show-overlay"]}>
                <div className={style["icon-info"]} />
            </div>
        </a>
    );
};

export default ShowCard;
