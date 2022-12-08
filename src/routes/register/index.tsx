/* Base */
import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import { Text, Localizer } from "preact-i18n";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Register: FunctionalComponent<RegisterConnectedProps> = (props: RegisterConnectedProps) => {
    return (
        <div className={baseStyle["page-content"]}>
            <div className={style.auth}>
                <div className={style["auth-form"]}>
                    <div className={style["auth-title"]}>
                        <Text id="register.title" />
                    </div>
                    <Localizer>
                        <input
                            name="username"
                            placeholder={props.dictionary.register?.username.placeholder}
                            type="text"
                            className={style["auth-input"]}
                            onChange={(e) => {
                                props.actions.setAuthUsername(e.currentTarget.value);
                            }}
                            value={props.authData.username}
                        />
                        <input
                            name="password"
                            placeholder={props.dictionary.register?.password.placeholder}
                            type="password"
                            className={style["auth-input"]}
                            onChange={(e) => {
                                props.actions.setAuthPassword(e.currentTarget.value);
                            }}
                            value={props.authData.password}
                        />
                        <input
                            name="password_2"
                            placeholder={props.dictionary.register?.password_2.placeholder}
                            type="password"
                            className={style["auth-input"]}
                            onChange={(e) => {
                                props.actions.setAuthPassword2(e.currentTarget.value);
                            }}
                            value={props.authData.password2}
                        />
                    </Localizer>
                    <div
                        className={style["auth-button"]}
                        onClick={() => {
                            if (props.authData.username.length < 3) {
                                props.actions.setAuthResult(AuthResult.USERNAME_TOO_SHORT);
                                return;
                            }
                            if (props.authData.password.length < 8) {
                                props.actions.setAuthResult(AuthResult.PASSWORD_TOO_SHORT);
                                return;
                            }
                            if (props.authData.password !== props.authData.password2) {
                                props.actions.setAuthResult(AuthResult.PASSWORD_NO_MATCH);
                                return;
                            }
                            props.actions.setAuthResult(AuthResult.WAITING);
                            props.actions.register(props.authData.username, props.authData.password);
                        }}>
                        <div className={style["auth-button-title"]}>
                            <Text id="register.button" />
                        </div>
                    </div>
                    <Link href="/login" className={style["auth-link"]}>
                        <Text id="register.existingAccount" />
                    </Link>
                    <div className={style["auth-result-text"]}>{<Text id={`enum.authResult.${props.authData.result}`} />}</div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Register);
