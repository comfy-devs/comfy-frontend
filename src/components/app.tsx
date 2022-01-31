/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IntlProvider } from "preact-i18n";
import { AppConnectedProps, PreferencesTheme } from "../ts/base";
/* Styles */
import * as dark from "../style/themes/dark";
import * as light from "../style/themes/light";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../redux/util";
import * as actions from "../redux/actions";
/* Components */
import Header from "./header";
import SubHeader from "./sub-header";
import Home from "../routes/home";
import All from "../routes/all";
import Settings from "../routes/settings";
import Download from "../routes/download";
import Login from "../routes/login";
import Register from "../routes/register";
import Anime from "../routes/anime";
import Group from "../routes/group";
import Episode from "../routes/episode";
import Footer from "./footer";

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    const [resizeID, setResizeID] = useState(setTimeout(() => { /* */ }, 0));
    const [ruleID, setRuleID] = useState(-1);
    const [localization, setLocalization] = useState({});

    /* API calls */
    useEffect(() => {
        props.actions.fetchAllAnimes();
        props.actions.fetchAllGroups();
        props.actions.fetchStats();
        props.actions.fetchPreferences();
        props.actions.loginToken();
        
        props.actions.setDimensions(window.innerWidth, window.innerHeight);
        window.addEventListener("resize", () => {
            clearTimeout(resizeID);
            setResizeID(setTimeout(() => {
                props.actions.setDimensions(window.innerWidth, window.innerHeight);
            }, 500));
        });
    }, [true]);

    /* Localization */
    useEffect(() => {
        const loadLocalization = async() => {
            const localizationReq = await fetch(`/assets/lang/${props.preferences.lang}.json`);
            setLocalization(await localizationReq.json());
        }
        loadLocalization();
    }, [props.preferences.lang]);

    /* Preferences */
    useEffect(() => {
        localStorage.setItem("theme", props.preferences.theme.toString());
        localStorage.setItem("lang", props.preferences.lang);
        localStorage.setItem("developer", props.preferences.developer.toString());
    }, [props.preferences]);

    /* Themes */
    useEffect(() => {
        const item = document.styleSheets.item(0);
        if(item === null) { return; }
        if(ruleID !== -1) { item.deleteRule(ruleID); }

        switch(props.preferences.theme) {
            case PreferencesTheme.DARK:
                setRuleID(item.insertRule(dark.default));
                break;

            case PreferencesTheme.LIGHT:
                setRuleID(item.insertRule(light.default));
                break;
        }
    }, [props.preferences.theme]);

    /* Auth */
    const user = props.session === undefined ? undefined : props.users.get(props.session.user);

    if(typeof window === "undefined") { return <div />; }
    return (
        <IntlProvider definition={localization}>
            <div id="app">
                <BrowserRouter>
                    <div className="route-container">
                        <Header user={user} />
                        <SubHeader />
                        <Routes>
                            <Route path="/" element={<Home dimensions={props.dimensions} users={props.users} animes={props.animes} groups={props.groups} episodes={props.episodes} random={props.random} actions={props.actions} />} />
                            <Route path="/all" element={<All dimensions={props.dimensions} animes={props.animes} groups={props.groups} filterData={props.filterData} actions={props.actions} />} />
                            <Route path="/settings" element={<Settings preferences={props.preferences} user={user} actions={props.actions} />} />
                            <Route path="/download" element={<Download />} />
                            <Route path="/login" element={<Login authData={props.authData} actions={props.actions} />} />
                            <Route path="/register" element={<Register authData={props.authData} actions={props.actions} />} />
                            <Route path="/animes/:id" element={<Anime animes={props.animes} episodes={props.episodes} actions={props.actions} />} />
                            <Route path="/groups/:id" element={<Group dimensions={props.dimensions} animes={props.animes} groups={props.groups} actions={props.actions} />} />
                            <Route path="/episodes/:id" element={<Episode dimensions={props.dimensions} playerData={props.playerData} animes={props.animes} episodes={props.episodes} segments={props.segments} preferences={props.preferences} actions={props.actions} />} />
                        </Routes>
                        <Footer stats={props.stats} />
                    </div>
                </BrowserRouter>
            </div>
        </IntlProvider>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
