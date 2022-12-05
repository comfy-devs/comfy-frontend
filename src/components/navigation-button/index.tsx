/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import style from "./style.scss";

const NavigationButton: FunctionalComponent<NavigationButtonConnectedProps> = (props: NavigationButtonConnectedProps) => {
    return (
        <div
            className={style["navigation-button"]}
            data={props.i === props.page ? "true" : "false"}
            onClick={() => {
                props.actions.setFilterPage(props.i);
            }}>
            {props.i + 1}
        </div>
    );
};

export default NavigationButton;
