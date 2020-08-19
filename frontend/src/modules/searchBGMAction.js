export const SEARCH = "searchBGMAction/SEARCH";
export const CHANGE = "searchBGMAction/CHANGE";

export const search = data => ({ type: SEARCH, payload: { data: data } });
export const change = data => ({ type: CHANGE, payload: { data: data } });

let initialState = {
    keyword: "",
    searchCheck: false,
    displayState: "",
    bgmList: []
};

const searchBGMAction = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case CHANGE:
            return {
                ...state,
                keyword: action.payload.data
            };
        case SEARCH:
            return {
                ...state,
                searchCheck: true,
                displayState: "none",
                bgmList: action.payload.data
            };

        default:
            return state;
    }
};

export default searchBGMAction;
