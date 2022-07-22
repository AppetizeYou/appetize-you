import axios from "axios";

const AppetizeYouAPI = axios.create({
    baseURL: "http://localhost:3001",
});

AppetizeYouAPI.interceptors.request.use((request) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
});

export default AppetizeYouAPI;
