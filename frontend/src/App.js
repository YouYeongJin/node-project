import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchBGMContainer from "./containers/SearchBGMContainer";
import SignInContainer from "./containers/SignInContainer";
import MainContainer from "./containers/MainContainer";
const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/main">
                    <MainContainer />
                </Route>
                <Route path="/login">
                    <SignInContainer />
                </Route>
                <Route path="/">
                    <SearchBGMContainer />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
