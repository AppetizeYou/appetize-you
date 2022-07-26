import AppetizeYouAPI from "../config/api";

async function login(data) {
    const response = await AppetizeYouAPI.post("/auth/login", data);

    return response.data;
}

async function signup(data) {
    const response = await AppetizeYouAPI.post("/auth/signup", data);

    return response.data;
}

async function getAccount() {
    const response = await AppetizeYouAPI.get("/auth");

    return response.data;
}

async function updateAccount(data) {
    const response = await AppetizeYouAPI.put("/auth", data);

    return response.data;
}

async function deleteAccount() {
    const response = await AppetizeYouAPI.delete("/auth");

    return response.data;
}

export { login, signup, getAccount, updateAccount, deleteAccount };
