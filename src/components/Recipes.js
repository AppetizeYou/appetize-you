import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipe";
import getCategories from "../services/category";
import Recipe from "./Recipe";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

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
        <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {Object.entries(categories).map(([key, category]) => (
                    <FormControl key={key}>
                        <FormLabel id="demo-row-radio-buttons-group-label">{formatCategoryName(key)}</FormLabel>
                        <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label">
                            {category.map((object, index) => (
                                <div key={index}>
                                    <FormControlLabel control={<Radio />} label={object ? capitalize(object.name) : "All"} name={key} value={index} checked={setChecked(key, index)} onChange={handleSelectedCategories} />
                                </div>
                            ))}
                        </RadioGroup>
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
