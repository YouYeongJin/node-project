import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import SignIn from "../components/SignIn";
import { changeEmail, changePassword, submit } from "../modules/signInAction";
import { useHistory } from "react-router-dom";

const SignInContainer = () => {
    const history = useHistory();
    // const state = useSelector((state) => state.signInAction);

    const dispatch = useDispatch();

    const onChangeEmail = useCallback(
        (e) => {
            dispatch(changeEmail(e.target.value));
        },
        [dispatch]
    );
    const onChangePassword = useCallback(
        (e) => {
            dispatch(changePassword(e.target.value));
        },
        [dispatch]
    );

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(submit());
            history.push("/");
        },
        [history, dispatch]
    );

    return <SignIn onChangeEmail={onChangeEmail} onChangePassword={onChangePassword} onSubmit={onSubmit} />;
};

export default SignInContainer;
