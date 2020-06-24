import React from "react";
import { Link } from "react-router-dom";
import "../sytle/navi.css";

const NaviItem = React.memo(({ name, url }) => {
    return (
        <li className="navi_li">
            <Link className="navi_link" to={url}>
                {name}
            </Link>
        </li>
    );
});

const NaviList = React.memo(({ navis }) => navis.map((navi, key) => <NaviItem name={navi.name} url={navi.url} key={key} />));

const Navi = ({ navis }) => {
    return (
        <div className="navi_div">
            <ul className="navi_ul">
                <NaviList navis={navis} />
            </ul>
        </div>
    );
};

export default Navi;
