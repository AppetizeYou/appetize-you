const reducer = (state, action) => {
    switch (action.type) {
        case "setUser":
            sessionStorage.setItem("user", JSON.stringify(action.data));

            return {
                ...state,
                user: action.data,
            };
        default:
            return state;
    }
};

export default reducer;
