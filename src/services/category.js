import AppetizeYouAPI from "../config/api";

async function getCategories() {
    let categories = {};
    const categoryList = ["type_categories", "occasion_categories", "main_ingredient_categories", "cooking_method_categories"];
    for (const category of categoryList) {
        const response = await AppetizeYouAPI.get(`/recipes/${category}`);

        categories[category] = response.data;
    }

    return categories;
}

export default getCategories;
