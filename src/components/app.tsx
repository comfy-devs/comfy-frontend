/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
import { IntlProvider } from "preact-i18n";
/* Styles */
import pageStyle from "../routes/style.scss";
import * as dark from "../style/themes/dark";
import * as light from "../style/themes/light";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../redux/util";
import * as actions from "../redux/actions";
/* Components */
import Header from "./header";
import SubHeader from "./sub-header";
import AppRouter from "./router";
import Footer from "./footer";

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    const [resizeID, setResizeID] = useState(
        setTimeout(() => {
            /* */
        }, 0)
    );
    const [ruleID, setRuleID] = useState(-1);
    const [localization, setLocalization] = useState({});

    // API calls
    useEffect(() => {
        props.actions.fetchStats();
        props.actions.fetchPreferences();
        props.actions.loginToken();

        props.actions.setDimensions(window.innerWidth, window.innerHeight);
        window.addEventListener("resize", () => {
            clearTimeout(resizeID);
            setResizeID(
                setTimeout(() => {
                    props.actions.setDimensions(window.innerWidth, window.innerHeight);
                }, 500)
            );
        });
    }, [true]);

    // Localization
    useEffect(() => {
        const loadLocalization = async () => {
            const localizationReq = await fetch(`/assets/lang/${props.preferences.lang}.json`);
            setLocalization(await localizationReq.json());
        };
        loadLocalization();
    }, [props.preferences.lang]);

    // Preferences
    useEffect(() => {
        localStorage.setItem("theme", props.preferences.theme.toString());
        localStorage.setItem("torrent", props.preferences.torrent.toString());
        localStorage.setItem("lang", props.preferences.lang);
        localStorage.setItem("developer", props.preferences.developer.toString());
        localStorage.setItem("blur", props.preferences.blur.toString());
    }, [props.preferences]);

    // Themes
    useEffect(() => {
        const item = document.styleSheets.item(0);
        if (item === null) {
            return;
        }
        if (ruleID !== -1) {
            item.deleteRule(ruleID);
        }

        switch (props.preferences.theme) {
            case "dark":
                setRuleID(item.insertRule(dark.default));
                break;

            case "light":
                setRuleID(item.insertRule(light.default));
                break;
        }
    }, [props.preferences.theme]);

    // Misc
    const user = props.session === null ? null : props.users.get(props.session.user) ?? null;

    return (
        <IntlProvider definition={localization}>
            <div id="app">
                <Header user={user} />
                <SubHeader dimensions={props.dimensions} />
                <div className={pageStyle.page}>
                    <AppRouter {...props} dictionary={localization} user={user} />
                    <Footer stats={props.stats} />
                </div>
            </div>
        </IntlProvider>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
