import React from "react";
import "../sytle/insertBGM.css";

const insertBGM = ({ onChange, onSubmit }) => {
    return (
        <div className="insertBGM_div">
            <input className="insertBGM_input" id="bgmName" placeholder="BGM 명" onChange={onChange}></input>
            <input className="insertBGM_input" id="bgmType" placeholder="BGM 타입" onChange={onChange}></input>
            <input className="insertBGM_input" id="artistName" placeholder="작곡가 이름" onChange={onChange}></input>
            <input className="insertBGM_input" id="file" type="file" onChange={onChange}></input>
            <button className="insertBGM_button" onClick={onSubmit}>
                BGM 등록
            </button>
        </div>
    );
};

export default insertBGM;
