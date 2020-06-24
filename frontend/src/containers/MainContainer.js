import React from "react";
import SearchBGMContainer from "./SearchBGMContainer";
import NaviContainer from "./NaviContainer";
import "../sytle/main.css";

const MainContainer = () => {
    return (
        <div>
            <div className="main_div_left">
                <NaviContainer />
            </div>
            <div className="main_div_right">
                <SearchBGMContainer />
            </div>
        </div>
    );
};

export default MainContainer;
