export const SEARCH = "searchBGMAction/SEARCH";
export const CHANGE = "searchBGMAction/CHANGE";

export const search = (data) => ({ type: SEARCH, payload: { data: data } });
export const change = (data) => ({ type: CHANGE, payload: { data: data } });

let initialState = {
    keyword: "",
    searchCheck: false,
    displayState: "",
    bgmList: [],
};

const searchBGMAction = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case CHANGE:
            return {
                ...state,
                keyword: action.payload.data,
            };
        // state.keyword = action.payload.data;
        // return state;
        case SEARCH:
            return {
                ...state,
                searchCheck: true,
                displayState: "none",
                bgmList: action.payload.data,
            };
        // console.log("1-1");
        // state.searchCheck = true;
        // state.displayState = "none";
        // state.bgmList = action.payload.data;
        // console.log(state);
        // return state;

        default:
            return state;
    }
};

export default searchBGMAction;
