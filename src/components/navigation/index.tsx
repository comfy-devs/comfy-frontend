/* Base */
import { h, FunctionalComponent } from "preact";
import { NavigationConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";
/* Components */
import NavigationButton from "../navigation-button";

const Navigation: FunctionalComponent<NavigationConnectedProps> = (props: NavigationConnectedProps) => {
    const totalPages = Math.ceil(props.items / props.limit);
    let navigationStart = props.page - 2;
    if (props.page > totalPages - 4) {
        navigationStart = totalPages - 5;
    }
    let navigationEnd = props.page + 2;
    if (navigationEnd < 4) {
        navigationEnd = 4;
    }
    const navigationButtons = [];
    for (let i = navigationStart; i <= navigationEnd; i++) {
        if (i >= 0 && i < totalPages) {
            navigationButtons.push(<NavigationButton i={i} page={props.page} actions={props.actions} />);
        }
    }

    return <div className={style.navigation}>{navigationButtons}</div>;
};

export default Navigation;
