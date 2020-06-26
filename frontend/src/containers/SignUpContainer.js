import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../components/SignUp";
import { change } from "../modules/signUpAction";
import { getAsyncAxios } from "../common/commonUtills";
import { useHistory } from "react-router-dom";

const SignUpContainer = () => {
    const history = useHistory();
    const state = useSelector((state) => state.signUpAction);
    const dispatch = useDispatch();

    const onChange = useCallback(
        (e) => {
            dispatch(change(e.target, e.target.id));
        },
        [dispatch]
    );

    const onSend = useCallback(
        async (e) => {
            await e.preventDefault();
            const res = await getAsyncAxios("post", "http://localhost:5000/login/signUp", state);

            if (res.data.result) {
                alert("회원가입 성공");
                history.push("/main");
            } else {
                alert("회원가입 실패");
            }
        },
        [state, dispatch]
    );
    return <SignUp onChange={onChange} onSend={onSend} />;
};

export default SignUpContainer;
