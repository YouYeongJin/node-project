import React from "react";
import Navi from "../components/Navi";

const NaviContainer = () => {
    const naviObj = [
        { idx: 1, name: "로그인", url: "/login" },
        { idx: 2, name: "메인", url: "/main" },
        { idx: 3, name: "루트", url: "/" },
    ];

    return (
        <div>
            <Navi navis={naviObj} />
        </div>
    );
};

export default NaviContainer;
