export const SUBMIT = "signIn/SUBMIT";
export const CHANGE = "signIn/CHANGE";

export const submit = () => ({ type: SUBMIT });
export const change = (data, type) => ({ type: CHANGE, payload: { data, type } });

let initialState = {
    eMail: "",
    password: "",
    loginState: false,
};

const signInAction = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE:
            switch (action.payload.type) {
                case "email":
                    return {
                        ...state,
                        eMail: action.payload.data.value,
                    };
                case "password":
                    return {
                        ...state,
                        password: action.payload.data.value,
                    };
                default:
                    break;
            }
        case SUBMIT:
            return {
                ...state,
                loginState: true,
            };
        default:
            return state;
    }
};

export default signInAction;
