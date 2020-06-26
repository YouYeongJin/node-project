import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../components/SignIn";
import { change, submit } from "../modules/signInAction";
import { useHistory } from "react-router-dom";
import { getAsyncAxios } from "../common/commonUtills";

const SignInContainer = () => {
    const history = useHistory();
    const state = useSelector((state) => state.signInAction);
    const dispatch = useDispatch();

    const onChange = useCallback(
        (e) => {
            dispatch(change(e.target, e.target.id));
        },
        [dispatch]
    );

    const onSignIn = useCallback(
        async (e) => {
            await e.preventDefault();

            const res = await getAsyncAxios("post", "http://localhost:5000/login/signIn", state);

            if (res.data.result) {
                dispatch(submit());
                history.push("/main");
            } else {
                alert("로그인 실패");
            }
        },
        [state, history, dispatch]
    );

    const onKeyPress = (e) => {
        if (e.key === "Enter") onSignIn(e);
    };

    const onSignUp = () => {
        history.push("/signup");
    };

    const onClickCheckSession = useCallback(async (e) => {
        await e.preventDefault();
        const res = await getAsyncAxios("post", "http://localhost:5000/login/noSessionRequest", state);
    });

    const onClickDeleteSession = useCallback(async (e) => {
        await e.preventDefault();
        const res = await getAsyncAxios("post", "http://localhost:5000/login/deleteSession", state);
    });

    return <SignIn onChange={onChange} onSignIn={onSignIn} onSignUp={onSignUp} onKeyPress={onKeyPress} onClickCheckSession={onClickCheckSession} onClickDeleteSession={onClickDeleteSession} />;
};

export default SignInContainer;
