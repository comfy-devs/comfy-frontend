/* Base */
import { h, FunctionalComponent } from "preact";
import { NavigationConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";
/* Components */
import NavigationButton from "../navigation-button";

const Navigation: FunctionalComponent<NavigationConnectedProps> = (props: NavigationConnectedProps) => {
    const totalPages = 1;
    let navigationStart = props.filterData.page - 2;
    if (props.filterData.page > totalPages - 4) {
        navigationStart = totalPages - 5;
    }
    let navigationEnd = props.filterData.page + 2;
    if (navigationEnd < 4) {
        navigationEnd = 4;
    }
    const navigationButtons = [];
    for (let i = navigationStart; i <= navigationEnd; i++) {
        if (i >= 0 && i < totalPages) {
            navigationButtons.push(<NavigationButton i={i} filterData={props.filterData} />);
        }
    }

    return <div className={style.navigation}>{navigationButtons}</div>;
};

export default Navigation;
