import { combineReducers } from "redux";
import searchBGMAction from "./searchBGMAction";
import signInAction from "./signInAction";

const rootReducer = combineReducers({
    searchBGMAction,
    signInAction,
});

export default rootReducer;
