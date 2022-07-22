const reducer = (state, action) => {
    switch (action.type) {
        case "setUser":
            if (action.data === null && sessionStorage.getItem("user")) {
                sessionStorage.removeItem("user");
            } else {
                sessionStorage.setItem("user", JSON.stringify(action.data));
            }

            return {
                ...state,
                user: action.data,
            };
        default:
            return state;
    }
};

export default reducer;
