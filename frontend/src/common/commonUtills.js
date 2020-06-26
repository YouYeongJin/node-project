// import React from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
// import SignIn from "../login/SignIn";

//axios 공통
const getAxios = (method, url, data, callThen, callCatch) => {
    axios({
        withCredentials: true,
        method: method,
        url: url,
        data: data,
    })
        .then((res) => {
            if (res.data.code === "999") {
                // ReactDOM.render(<SignIn />, document.getElementById("root"));
                alert("세션이 없습니다 로그인을 해야합니다.");
            } else {
                callThen(res);
            }
        })
        .catch((err) => {
            if (callCatch) {
                callCatch(err);
            } else {
                alert(err);
            }
        });
};

const getAsyncAxios = async (method, url, data) => {
    return await axios({ withCredentials: true, method: method, url: url, data: data });
};

const isEmptyArray = (target) => {
    return Object.keys(target).length === 0;
};

const isEmptyObject = (target) => {
    return Object.keys(target).length === 0;
};

//또다른 공통들 ....

export { getAxios, getAsyncAxios, isEmptyArray, isEmptyObject };
