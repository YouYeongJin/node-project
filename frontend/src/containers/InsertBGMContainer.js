import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change, insert } from "../modules/insertBGMAction";
import InsertBGM from "../components/InsertBGM";
import { useHistory } from "react-router-dom";
import { getAxios, getAsyncAxios, getAsyncFileAxios } from "../common/commonUtills";

const InsertBGMContainer = () => {
    const state = useSelector((state) => state.insertBGMAction);
    const history = useHistory();

    const dispatch = useDispatch();

    const onChange = useCallback(
        (e) => {
            dispatch(change({ data: e.target, type: e.target.id }));
        },
        [dispatch]
    );

    const onSubmit = useCallback(
        async (e) => {
            await e.preventDefault();
            const data = setFromData();
            const res = await getAsyncAxios("post", "http://localhost:5000/bgm/insert", data);
            // dispatch(search(res.data.bgmData));
            history.push("/main");
        },
        [state, history, dispatch]
    );

    const setFromData = () => {
        const formData = new FormData();
        for (const [key, value] of Object.entries(state)) {
            formData.append(key, value);
        }
        return formData;
    };

    return (
        <div>
            <InsertBGM onChange={onChange} onSubmit={onSubmit} />
        </div>
    );
};

export default InsertBGMContainer;
