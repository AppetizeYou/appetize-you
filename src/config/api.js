import axios from "axios";

const AppetizeYouAPI = axios.create({
    baseURL: "http://localhost:3001",
});

AppetizeYouAPI.interceptors.request.use((request) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.token) {
        request.headers["Authorization"] = `Bearer ${user.token}`;
    }

    return request;
});

export default AppetizeYouAPI;
