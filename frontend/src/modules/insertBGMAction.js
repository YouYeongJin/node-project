export const INSERT = "insertBGMAction/INSERT";
export const CHANGE = "insertBGMAction/CHANGE";

export const insert = (data) => ({ type: INSERT, payload: { data: data } });
export const change = ({ data, type }) => ({ type: CHANGE, payload: { data, type } });

let initialState = {
    bgmName: "",
    bgmType: "",
    artistName: "",
    fileDir: "BGM",
    file: "",
};

const insertBGMAction = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE:
            switch (action.payload.type) {
                case "bgmName":
                    return {
                        ...state,
                        bgmName: action.payload.data.value,
                    };
                case "bgmType":
                    return {
                        ...state,
                        bgmType: action.payload.data.value,
                    };
                case "artistName":
                    return {
                        ...state,
                        artistName: action.payload.data.value,
                    };
                case "file":
                    return {
                        ...state,
                        file: action.payload.data.files[0],
                    };
                default:
                    break;
            }

        case INSERT:
            return {
                ...state,
                bgmName: action.payload.data.bgmName,
                bgmType: action.payload.data.bgmType,
                artistName: action.payload.data.artistName,
                file: action.payload.data.file,
            };

        default:
            return state;
    }
};

export default insertBGMAction;
