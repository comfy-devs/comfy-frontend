/* Base */
import { h, FunctionalComponent } from "preact";
import { Text } from "preact-i18n";
import { getImageEndpoint } from "../../scripts/api/api";
/* Styles */
import baseStyle from "../show-card/style.scss";

const GroupCard: FunctionalComponent<GroupCardConnectedProps> = (props: GroupCardConnectedProps) => {
    const title = props.item.title.length <= 24 ? props.item.title : `${props.item.title.substring(0, 21)}...`;

    return (
        <a href={`/groups/${props.item.id}`} className={baseStyle.show}>
            <img alt="group-thumbnail" src={`${getImageEndpoint()}/${props.item.id}/poster.webp`} className={baseStyle["show-thumbnail"]} />
            <div className={baseStyle["show-title-wrapper"]}>
                <div className={baseStyle["show-title"]}>{title}</div>
            </div>
            <div className={baseStyle["show-extra-wrapper"]}>
                <div className={baseStyle["show-extra-text"]}>
                    <Text id="group.seasons" fields={{ count: props.children.length }} />
                </div>
            </div>
            <div className={baseStyle["show-overlay"]}>
                <div className={baseStyle["icon-info"]} />
            </div>
        </a>
    );
};

export default GroupCard;
