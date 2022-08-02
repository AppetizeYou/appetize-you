import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipe";
import getCategories from "../services/category";

const Recipes = () => {
    useEffect(() => {
        getCategories()
            .then((categories) => {
                Object.entries(categories).forEach(([_, category]) => {
                    category.unshift(null);
                });

                setCategories(categories);
            })
            .catch((error) => {
                console.log(error);
            });

        getRecipes()
            .then((recipes) => {
                setRecipes(recipes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const initialSelectedCategories = {
        type_category_id: 0,
        occasion_category_id: 0,
        main_ingredient_category_id: 0,
        cooking_method_category_id: 0,
    };

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);
    const [recipes, setRecipes] = useState([]);

    const setChecked = (key, index) => {
        const id = key.replace("categories", "category") + "_id";

        return index === selectedCategories[id];
    };

    const handleSelectedCategories = (event) => {
        const id = event.target.name.replace("categories", "category") + "_id";

        setSelectedCategories({
            ...selectedCategories,
            [id]: parseInt(event.target.value),
        });
    };

    const formatCategoryName = (category) => {
        category = category.replaceAll("_", " ");

        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    const filterRecipe = (recipe) => {
        const categoryList = ["type_category_id", "occasion_category_id", "main_ingredient_category_id", "cooking_method_category_id"];
        for (const category of categoryList) {
            if (selectedCategories[category] !== 0 && recipe[category] !== selectedCategories[category]) {
                return true;
            }
        }

        return false;
    };

    return (
        <div>
            <div>
                {Object.entries(categories).map(([key, category]) => (
                    <div key={key}>
                        <div>{formatCategoryName(key)}</div>
                        <div style={{ display: "flex" }}>
                            {category.map((object, index) => (
                                <div key={index}>
                                    <input type="radio" id={object ? object.name : "all"} name={key} value={index} checked={setChecked(key, index)} onChange={handleSelectedCategories} />
                                    <label htmlFor={object ? object.name : "all"}>{object ? object.name : "All"}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {recipes.map((recipe, index) =>
                    filterRecipe(recipe) ? null : (
                        <div key={index}>
                            <Link to={`${recipe.id}`}>{recipe.title}</Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Recipes;
