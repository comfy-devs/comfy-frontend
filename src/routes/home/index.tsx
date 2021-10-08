/* Base */
import { h, FunctionalComponent } from "preact";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";
/* Components */
import Button from "../../components/ui/button";
import Checkbox from "../../components/ui/checkbox";

const Home: FunctionalComponent<HomeConnectedProps> = (props: HomeConnectedProps) => {
    return (
        <div class={style["home"]}>
            <div class={style["home-row"]}>
                <Button>Button (Primary)</Button>
                <Button secondary>Button (Secondary)</Button>
                <Button disabled>Button (Disabled)</Button>
                <Button icon={"/assets/ui_icons/i_close.png"} aria-label="Close" />
                <Button icon={"/assets/ui_icons/i_close.png"} iconText>
                    Close
                </Button>
            </div>
            <div class={style["home-row"]}>
                <Checkbox type="checkbox" />
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Home);
