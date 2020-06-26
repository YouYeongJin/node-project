import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchBGMContainer from "./containers/SearchBGMContainer";
import SignInContainer from "./containers/SignInContainer";
import MainContainer from "./containers/MainContainer";
import SignUpContainer from "./containers/SignUpContainer";
const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/main">
                    <MainContainer />
                </Route>
                <Route path="/signin">
                    <SignInContainer />
                </Route>
                <Route path="/signup">
                    <SignUpContainer />
                </Route>
                <Route path="/*">
                    <SearchBGMContainer />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
