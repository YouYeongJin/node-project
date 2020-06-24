// import { getAxios } from "../common/commonUtills";
// import React from "react";
// import ReactDOM from "react-dom";

export const SUBMIT = "signIn/SUBMIT";
export const CHANGEEMAIL = "signIn/CHANGE/EMAIL";
export const CHANGEPASSWORD = "signIn/CHANGE/PASSWORD";

export const submit = () => ({ type: SUBMIT });
export const changeEmail = (data) => ({ type: CHANGEEMAIL, payload: { data: data } });
export const changePassword = (data) => ({ type: CHANGEPASSWORD, payload: { data: data } });

let initialState = {
    eMail: "",
    password: "",
};

const signInAction = (state = initialState, action) => {
    switch (action.type) {
        case CHANGEEMAIL:
            state.eMail = action.payload.data;
            return state;
        case CHANGEPASSWORD:
            state.password = action.payload.data;
            return state;
        case SUBMIT:
            // getAxios(
            //     "post",
            //     "http://localhost:5000/bgm/list",
            //     { keyword: initialState.keyword },
            //     (res) => {
            //         if (res.data.result) {
            //             alert("성공");
            //             ReactDOM.render(<SignIn />, document.getElementById("root"));
            //         } else {
            //             alert("실패");
            //         }
            //     },
            //     (err) => {
            //         console.log(err);
            //         alert(err);
            //     }
            // );
            return state;
        default:
            return state;
    }
};

export default signInAction;
