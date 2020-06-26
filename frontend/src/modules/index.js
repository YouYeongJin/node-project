import { combineReducers } from "redux";
import searchBGMAction from "./searchBGMAction";
import signInAction from "./signInAction";
import signUpAction from "./signUpAction";
import insertBGMAction from "./insertBGMAction";

const rootReducer = combineReducers({
    searchBGMAction,
    signInAction,
    signUpAction,
    insertBGMAction,
});

export default rootReducer;
