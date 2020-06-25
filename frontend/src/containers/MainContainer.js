import React from "react";
import SearchBGMContainer from "./SearchBGMContainer";
import NaviContainer from "./NaviContainer";
import "../sytle/main.css";
import InsertBGMContainer from "./InsertBGMContainer";

const MainContainer = () => {
    return (
        <div>
            <div className="main_div_left">
                <NaviContainer />
            </div>
            <div className="main_div_right">
                <SearchBGMContainer />
                <InsertBGMContainer />
            </div>
        </div>
    );
};

export default MainContainer;
