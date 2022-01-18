/* Base */
import { h, FunctionalComponent } from "preact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../redux/util";
import * as actions from "../redux/actions";
/* Components */
import Header from "./header";
import Home from "../routes/home";
import { useEffect } from "react";

const App: FunctionalComponent<any> = (props: AppConnectedProps) => {
    useEffect(() => {
        props.actions.fetchUser("@me");
    }, [true]);

    if(typeof window === "undefined") { return <div />; }
    return (
        <div id="app">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home counter={props.counter} users={props.users} actions={props.actions} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
