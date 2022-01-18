/* Base */
import { h, FunctionalComponent } from "preact";
import { GroupCardConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const GroupCard: FunctionalComponent<GroupCardConnectedProps> = (props: GroupCardConnectedProps) => {
    const title = props.item.title.length <= 24 ? props.item.title : `${props.item.title.substring(0, 21)}...`;

    return (
        <a href={`/groups/${props.item.id}`} className={style.group}>
            <img alt="group-thumbnail" src={`https://image.nyananime.xyz/${props.item.id}/poster.webp`} className={style["group-thumbnail"]} />
            <div className={style["group-title-wrapper"]}>
                <div className={style["group-title"]}>{title}</div>
            </div>
            <div className={style["group-extra-wrapper"]}>
                <div className={style["group-extra-text"]}>{props.children.length} seasons</div>
            </div>
            <div className={style["group-overlay"]}>
                <div className={style["icon-info"]} />
            </div>
        </a>
    );
};

export default GroupCard;
