import AppetizeYouAPI from "../config/api";

async function login(data) {
    const response = await AppetizeYouAPI.post("/auth/login", data);

    return response.data;
}

async function signup(data) {
    const response = await AppetizeYouAPI.post("/auth/singup", data);

    return response.data;
}

export { login, signup };
