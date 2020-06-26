import React from "react";
import "../sytle/signIn.css";

const SignIn = ({ onChange, onSignIn, onSignUp, onKeyPress, onClickCheckSession, onClickDeleteSession }) => {
    return (
        <div className="sign_div">
            <h1 className="sign_h1">Sign In</h1>
            <div>
                <input className="sign_input" id="email" placeholder="E-Mail" onChange={onChange}></input>
                <input className="sign_input" id="password" placeholder="Password" onChange={onChange} onKeyPress={onKeyPress}></input>
            </div>
            <div>
                <button className="sign_button" onClick={onSignIn}>
                    Sign In
                </button>
                <button className="sign_button" onClick={onSignUp}>
                    Sign Up
                </button>
                <button className="sign_button" onClick={onClickCheckSession}>
                    check session
                </button>
                <button className="sign_button" onClick={onClickDeleteSession}>
                    delete session
                </button>
            </div>
        </div>
    );
};

export default SignIn;
