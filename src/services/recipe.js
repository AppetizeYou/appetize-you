import AppetizeYouAPI from "../config/api";

async function postRecipe(data) {
    const response = await AppetizeYouAPI.post("recipes/", data);

    return response.data;
}

async function getRecipe(id) {
    const response = await AppetizeYouAPI.get(`recipes/${id}`);

    return response.data;
}

export { postRecipe, getRecipe };
