/* Base */
import { h, FunctionalComponent } from "preact";
import { NavLink } from "react-router-dom";
import { Text, Localizer } from "preact-i18n";
import { AuthResult } from "../../ts/base";
import { LoginConnectedProps } from "../../ts/routes";
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
                    <div className={style["auth-title"]}><Text id="login.title" /></div>
                    <Localizer>
                        <input name="username" placeholder={props.dictionary.login === undefined ? "" : props.dictionary.login.username.placeholder} type="text" className={style["auth-input"]} onChange={(e) => { props.actions.setAuthUsername(e.currentTarget.value);}} value={props.authData.username} />
                        <input name="password" placeholder={props.dictionary.login === undefined ? "" : props.dictionary.login.password.placeholder} type="password" className={style["auth-input"]} onChange={(e) => { props.actions.setAuthPassword(e.currentTarget.value); }} value={props.authData.password} />
                    </Localizer>
                    <div className={style["auth-button"]} onClick={() => {
                        props.actions.setAuthResult(AuthResult.WAITING);
                        props.actions.login(props.authData.username, props.authData.password);
                    }}>
                        <div className={style["auth-button-title"]}><Text id="login.button" /></div>
                    </div>
                    <NavLink to="/register" className={style["auth-link"]}><Text id="login.noAccount" /></NavLink>
                    <div className={style["auth-result-text"]}>{<Text id={`enum.authResult.${props.authData.result}`} />}</div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Login);
