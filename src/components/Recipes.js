import { useEffect, useState } from "react";
import { getMyRecipes, getRecipes } from "../services/recipe";
import getCategories from "../services/category";
import Recipe from "./Recipe";
import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useGlobalState } from "../utilities/context";

const Recipes = (params) => {
    const { recipesFor } = params;

    const { store } = useGlobalState();
    const { user } = store;

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

        if (recipesFor === "all") {
            getRecipes()
                .then((recipes) => {
                    setRecipes(recipes);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (recipesFor === "user") {
            getMyRecipes()
                .then((recipes) => {
                    setRecipes(recipes);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        // eslint-disable-next-line
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

    const setChecked = (key) => {
        const id = key.replace("categories", "category") + "_id";

        return selectedCategories[id];
    };

    const handleSelectedCategories = (event, value) => {
        const id = event.target.name.replace("categories", "category") + "_id";
        setSelectedCategories({
            ...selectedCategories,
            [id]: parseInt(value),
        });
    };

    const formatCategoryName = (category) => {
        category = category.replaceAll("_", " ");

        return capitalize(category);
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
        <div style={{ marginTop: "50px" }}>
            <div style={{ margin: "0 20px 20px 20px", display: "flex", flexDirection: "column" }}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    {recipesFor === "user" && `${user.username}'s`} Recipe
                </Typography>
                {Object.entries(categories).map(([key, category]) => (
                    <FormControl key={key} style={{ marginBottom: "10px" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            <Typography variant="subtitle2">{formatCategoryName(key)}</Typography>
                        </FormLabel>
                        <ToggleButtonGroup color="primary" value={setChecked(key)} exclusive onChange={handleSelectedCategories}>
                            {category.map((object, index) => (
                                <ToggleButton key={index} name={key} value={index}>
                                    {object ? capitalize(object.name) : "All"}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </FormControl>
                ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {recipes.map((recipe, index) =>
                    filterRecipe(recipe) ? null : (
                        <div key={index} style={{ margin: "6px", minWidth: "345px" }}>
                            <Recipe recipe={recipe} />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Recipes;
