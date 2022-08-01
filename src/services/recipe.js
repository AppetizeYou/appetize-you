import AppetizeYouAPI from "../config/api";

async function getRecipes() {
    const response = await AppetizeYouAPI.get("recipes/");

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

export { getRecipes, postRecipe, getRecipe, updateRecipe };
