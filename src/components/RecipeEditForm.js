import { Button, FormLabel, Input, InputLabel, MenuItem, Select, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCategories from "../services/category";
import { getRecipe, updateRecipe } from "../services/recipe";

const RecipeEditForm = () => {
    const params = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getRecipe(params.id)
            .then((recipe) => {
                setFormData({
                    title: recipe.title,
                    serve: recipe.serve,
                    type_category_id: recipe.type_category_id,
                    occasion_category_id: recipe.occasion_category_id,
                    main_ingredient_category_id: recipe.main_ingredient_category_id,
                    cooking_method_category_id: recipe.cooking_method_category_id,
                    ingredients: recipe.ingredients,
                    steps: recipe.steps,
                });

                getCategories()
                    .then((categories) => {
                        setCategories(categories);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }, [params.id]);

    const initialFormData = {
        title: "",
        serve: 1,
        type_category_id: 1,
        occasion_category_id: 1,
        main_ingredient_category_id: 1,
        cooking_method_category_id: 1,
        ingredients: [",,"],
        steps: [""],
        // image: null,
    };

    const [categories, setCategories] = useState(null);
    const [formData, setFormData] = useState(initialFormData);

    const buildCategories = (category) => {
        const id = `${category}_category_id`;

        return (
            <Select labelId="demo-simple-select-helper-label" name={id} id={id} defaultValue={formData[id]} onChange={handleFormData}>
                {categories[`${category}_categories`].map((element) => (
                    <MenuItem key={element.id} value={element.id} id={id}>
                        {element.name}
                    </MenuItem>
                ))}
            </Select>
        );
    };

    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.id === "title" ? event.target.value : parseInt(event.target.value),
        });
    };

    const handleIngredientFieldData = (index, event) => {
        const parent = event.target.parentElement;
        let { name, amount, unit } = separateIngredient(formData.ingredients[index]);
        if (event.target === parent.children["name"]) {
            name = event.target.value;
        } else if (event.target === parent.children["amount"]) {
            amount = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
        } else if (event.target === parent.children["unit"]) {
            unit = event.target.value;
        }

        let ingredients = [...formData.ingredients];
        ingredients[index] = `${name},${amount},${unit}`;

        setFormData({
            ...formData,
            ingredients: ingredients,
        });
    };

    const addIngredientFields = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, ",,"],
        });
    };

    const removeIngredientField = (index) => {
        let ingredients = [...formData.ingredients];
        ingredients.splice(index, 1);

        setFormData({
            ...formData,
            ingredients: ingredients,
        });
    };

    const separateIngredient = (ingredient) => {
        let [name, amount, unit] = ingredient.split(",");

        return { name, amount, unit };
    };

    const handleStepFieldData = (index, event) => {
        let steps = [...formData.steps];
        steps[index] = event.target.value;

        setFormData({
            ...formData,
            steps: steps,
        });
    };

    const addStepField = () => {
        setFormData({
            ...formData,
            steps: [...formData.steps, ""],
        });
    };

    const removeStepField = (index) => {
        let steps = [...formData.steps];
        steps.splice(index, 1);

        setFormData({
            ...formData,
            steps: steps,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        updateRecipe(params.id, formData).then(() => {
            navigate(`/recipes/${params.id}`);

            setFormData(initialFormData);
        });
    };

    return (
        <div style={{ margin: "0 10px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input type="text" id="title" name="title" value={formData.title} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="serve">Serve</FormLabel>
                    <Input type="number" min="1" max="10" id="serve" name="serve" value={formData.serve} onChange={handleFormData} />
                </div>
                <div>
                    <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="type_category_id">
                            Type
                        </InputLabel>
                        {categories && buildCategories("type")}
                    </div>
                    <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="occasion_category_id">
                            Occasion
                        </InputLabel>
                        {categories && buildCategories("occasion")}
                    </div>
                    <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="main_ingredient_category_id">
                            Main ingredient
                        </InputLabel>
                        {categories && buildCategories("main_ingredient")}
                    </div>
                    <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="cooking_method_category_id">
                            Cooking method
                        </InputLabel>
                        {categories && buildCategories("cooking_method")}
                    </div>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="ingredients">Ingredient</FormLabel>
                    <div>
                        {formData.ingredients.map((element, index) => (
                            <div key={index} style={{ display: "flex" }}>
                                <Input type="text" name="name" id={`name${index}`} sx={{ mb: "6px", mr: "6px" }} value={separateIngredient(element).name} onChange={(event) => handleIngredientFieldData(index, event)} />
                                <Input type="text" name="amount" id={`amount${index}`} sx={{ mb: "6px", mr: "6px" }} value={separateIngredient(element).amount} onChange={(event) => handleIngredientFieldData(index, event)} />
                                <Input type="text" name="unit" id={`unit${index}`} sx={{ mb: "6px", mr: "6px" }} value={separateIngredient(element).unit} onChange={(event) => handleIngredientFieldData(index, event)} />
                                {index === formData.ingredients.length - 1 && (
                                    <Button type="button" onClick={() => addIngredientFields()}>
                                        Add
                                    </Button>
                                )}
                                {formData.ingredients.length > 1 && (
                                    <Button type="button" onClick={() => removeIngredientField(index)}>
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="steps">Step</FormLabel>
                    <div id="steps">
                        {formData.steps.map((element, index) => (
                            <div key={index} style={{ display: "flex" }}>
                                <TextareaAutosize name="step" id={`step${index}`} style={{ minWidth: 300, margin: "0 6px 6px 0" }} aria-label="empty textarea" minRows={4} value={element} onChange={(event) => handleStepFieldData(index, event)} />
                                {index === formData.steps.length - 1 && (
                                    <Button type="button" onClick={addStepField}>
                                        Add
                                    </Button>
                                )}
                                {formData.steps.length > 1 && (
                                    <Button type="button" onClick={() => removeStepField(index)}>
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
};

export default RecipeEditForm;
