import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBGM from "../components/SearchBGM";
import { search, change } from "../modules/searchBGMAction";
import { useHistory } from "react-router-dom";
import { getAxios } from "../common/commonUtills";

const SearchBGMContainer = () => {
    const state = useSelector((state) => state.searchBGMAction);
    const history = useHistory();

    const dispatch = useDispatch();

    const onChange = useCallback(
        (e) => {
            dispatch(change(e.target.value));
        },
        [dispatch]
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (state.keyword.length < 1) {
                alert("검색어를 1글자라도 입력해주세요.");
                return;
            }
            getAxios("post", "http://localhost:5000/bgm/list", { keyword: state.keyword }, (res) => {
                dispatch(search(res.data.bgmData));
            });
            history.push("/main");
        },
        [state.keyword, history, dispatch]
    );

    const onKeyPress = (e) => {
        if (e.key === "Enter") onSubmit(e);
    };

    return (
        <div>
            <SearchBGM onChange={onChange} onSubmit={onSubmit} bgmList={state.bgmList} value={state.keyword} onKeyPress={onKeyPress} displayState={state.displayState} />
        </div>
    );
};

export default SearchBGMContainer;
