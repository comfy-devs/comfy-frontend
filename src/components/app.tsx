/* Base */
import { h, FunctionalComponent } from "preact";
import { Router } from "preact-router";
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

    return (
        <div id="app">
            <Header />
            <Router>
                <Home path="/" counter={props.counter} users={props.users} actions={props.actions} />
            </Router>
        </div>
    );
};
App.displayName = "App";

export default connect(mapState, mapDispatch(actions))(App);
