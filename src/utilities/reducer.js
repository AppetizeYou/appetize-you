const reducer = (state, action) => {
    switch (action.type) {
        case "setUsername":
            sessionStorage.setItem("username", action.data);
            console.log(sessionStorage.getItem("username"));
            return {
                ...state,
                username: action.data,
            };
        case "setToken":
            sessionStorage.setItem("token", action.data);
            console.log(sessionStorage.getItem("token"));
            return {
                ...state,
                token: action.data,
            };
        default:
            return state;
    }
};

export default reducer;
