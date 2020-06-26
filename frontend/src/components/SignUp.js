import React from "react";
import "../sytle/signIn.css";

const SignIn = ({ onChange, onSend }) => {
    return (
        <div className="sign_div">
            <h1 className="sign_h1">Sign Up</h1>
            <div>
                <input className="sign_input" id="email" placeholder="E-Mail" onChange={onChange}></input>
                <input className="sign_input" id="password" placeholder="Password" onChange={onChange}></input>
                <input className="sign_input" id="password2" placeholder="Password" onChange={onChange}></input>
            </div>
            <div>
                <button className="sign_button" onClick={onSend}>
                    Send
                </button>
                <button className="sign_button">Cancel</button>
            </div>
        </div>
    );
};

export default SignIn;
