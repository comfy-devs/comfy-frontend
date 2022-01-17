/* Base */
import { h, FunctionalComponent } from "preact";
import { NavLink } from "react-router-dom";
import { AuthResult } from "../../ts/base";
import { LoginConnectedProps } from "../../ts/routes";
import { authResultToDisplayName } from "../../scripts/nyan/constants";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import style from "./style.scss";

const Login: FunctionalComponent<LoginConnectedProps> = (props: LoginConnectedProps) => {
    return (
        <div className="route">
            <div className={style.auth}>
                <div className={style["auth-form"]}>
                    <div className={style["auth-title"]}>Login</div>
                    <input name="username" placeholder="Username..." type="text" className={style["auth-input"]} onChange={(e) => { props.actions.setAuthUsername(e.currentTarget.value);}} value={props.authData.username} />
                    <input name="password" placeholder="Password..." type="password" className={style["auth-input"]} onChange={(e) => { props.actions.setAuthPassword(e.currentTarget.value); }} value={props.authData.password} />
                    <div className={style["auth-button"]} onClick={() => {
                        props.actions.setAuthResult(AuthResult.WAITING);
                        props.actions.login(props.authData.username, props.authData.password);
                    }}>
                        <div className={style["auth-button-title"]}>Login</div>
                    </div>
                    <NavLink to="/register" className={style["auth-link"]}>No account yet? (Register)</NavLink>
                    <div className={style["auth-result-text"]}>{authResultToDisplayName(props.authData.result)}</div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Login);
