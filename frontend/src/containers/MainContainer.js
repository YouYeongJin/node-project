import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchBGMContainer from "./SearchBGMContainer";
import NaviContainer from "./NaviContainer";
import InsertBGMContainer from "./InsertBGMContainer";
import "../sytle/main.css";

const MainContainer = (param) => {
    return (
        <div className="main_div">
            <div className="main_div_left">
                <NaviContainer />
            </div>
            <div className="main_div_right">
                <Switch>
                    <Route exact path="/main" component={SearchBGMContainer} />
                    <Route exact path="/main/insert" component={InsertBGMContainer} />
                </Switch>
            </div>
        </div>
    );
};

export default MainContainer;

{
    /* <div>
    <div className="main_div_left">
        <NaviContainer />
    </div>
    <div className="main_div_right">
        <SearchBGMContainer />
        <InsertBGMContainer />
    </div>
</div>; */
}
