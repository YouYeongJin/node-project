import React from "react";
import "../sytle/searchBGM.css";

const BgmItem = React.memo(({ name }) => {
    return (
        <div>
            <h3 className="searchBGM_h3">{name}</h3>
        </div>
    );
});

const BgmList = React.memo(({ bgmList }) => bgmList.map((bgmItem, key) => <BgmItem name={bgmItem.bgm_name} key={key} />));

const SearchBGM = ({ onChange, onSubmit, bgmList, value, onKeyPress, displayState }) => {
    return (
        <div className="searchBGM_div">
            <div>
                <h1 className="searchBGM_h1" style={{ display: displayState }}>
                    B.G.M project
                </h1>
                <input className="searchBGM_input" onChange={onChange} onKeyPress={onKeyPress} value={value} placeholder="원하는 스타일을 검색해보세요 (Ex. 웅장한, 상쾌한 ...)"></input>
                <button className="searchBGM_button" onClick={onSubmit}>
                    Search
                </button>
            </div>
            <div>
                <BgmList bgmList={bgmList} />
            </div>
        </div>
    );
};

export default SearchBGM;
