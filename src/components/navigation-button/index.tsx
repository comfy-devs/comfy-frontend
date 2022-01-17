/* Base */
import { h, FunctionalComponent } from "preact";
import { NavigationButtonConnectedProps } from "../../ts/components";
/* Styles */
import style from "./style.scss";

const NavigationButton: FunctionalComponent<NavigationButtonConnectedProps> = (props: NavigationButtonConnectedProps) => {
    return <div className={style["navigation-button"]} data={props.i === props.filterData.page ? "true" : "false"}>{(props.i + 1)}</div>;
};

export default NavigationButton;
