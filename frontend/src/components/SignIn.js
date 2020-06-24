import React from "react";
import "../sytle/signIn.css";

const SignIn = ({ onChangeEmail, onChangePassword, onSubmit }) => {
    return (
        <div className="sign_div">
            <h1 className="sign_h1">Sign In</h1>
            <input className="sign_input" placeholder="E-Mail" onChange={onChangeEmail}></input>
            <input className="sign_input" placeholder="Password" onChange={onChangePassword}></input>
            <button className="sign_button" onClick={onSubmit}>
                Log In
            </button>
        </div>
    );
};

export default SignIn;
