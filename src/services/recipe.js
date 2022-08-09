import AppetizeYouAPI from "../config/api";

async function getRecipes() {
    const response = await AppetizeYouAPI.get("recipes/");

    return response.data;
}

async function getMyRecipes() {
    const response = await AppetizeYouAPI.get("recipes/my_post");

    return response.data;
}

async function getWeeklyRecipes() {
    const response = await AppetizeYouAPI.get("recipes/weekly");

    return response.data;
}

async function getMonthlyRecipes() {
    const response = await AppetizeYouAPI.get("recipes/monthly");

    return response.data;
}

async function postRecipe(data) {
    const response = await AppetizeYouAPI.post("recipes/", data);

    return response.data;
}

async function getRecipe(id) {
    const response = await AppetizeYouAPI.get(`recipes/${id}`);

    return response.data;
}

async function updateRecipe(id, data) {
    const response = await AppetizeYouAPI.put(`recipes/${id}`, data);

    return response.data;
}

export { getRecipes, getMyRecipes, getWeeklyRecipes, getMonthlyRecipes, postRecipe, getRecipe, updateRecipe };
