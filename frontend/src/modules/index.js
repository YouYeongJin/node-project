import { combineReducers } from "redux";
import searchBGMAction from "./searchBGMAction";
import signInAction from "./signInAction";
import insertBGMAction from "./insertBGMAction";

const rootReducer = combineReducers({
    searchBGMAction,
    signInAction,
    insertBGMAction,
});

export default rootReducer;
