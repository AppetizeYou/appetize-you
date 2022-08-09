import { Button, FormLabel, Input, InputLabel, MenuItem, Select, TextareaAutosize, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCategories from "../services/category";
import { postRecipe } from "../services/recipe";
import images from "../utilities/images";
import ErrorAlert from "./ErrorAlert";

const RecipeForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((categories) => {
                setCategories(categories);
            })
            .catch((error) => console.log(error));
    }, []);

    const initialFormData = {
        title: "",
        serve: 1,
        type_category_id: 1,
        occasion_category_id: 1,
        main_ingredient_category_id: 1,
        cooking_method_category_id: 1,
        ingredients: [",,"],
        steps: [""],
        image: null,
    };

    const [categories, setCategories] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [errorCode, setErrorCode] = useState(null);

    const buildCategories = (category) => {
        const id = `${category}_category_id`;

        return (
            <Select labelId="demo-simple-select-helper-label" name={id} id={id} defaultValue={categories[`${category}_categories`][0].id} onChange={handleFormData}>
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
            [event.target.id || event.target.name]: event.target.id === "title" ? event.target.value : parseInt(event.target.value),
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

    const handleImageData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.files[0],
        });
    };

    const validateArray = (array, target) => {
        for (const element of array) {
            if (element === target) return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.title !== "" && formData.ingredients.length !== 0 && validateArray(formData.ingredients, ",,") && formData.steps.length !== 0 && validateArray(formData.steps, "") && formData.image !== null) {
            let formDataObject = new FormData();
            for (let key in formData) {
                const data = formData[key];
                if (key === "ingredients" || key === "steps") {
                    for (let i = 0; i < data.length; i++) {
                        formDataObject.append(`${key}[]`, data[i]);
                    }
                } else {
                    formDataObject.append(key, data);
                }
            }

            postRecipe(formDataObject)
                .then(() => {
                    navigate("/recipes");
                    setFormData(initialFormData);
                })
                .catch((error) => console.log(error));
        } else {
            setErrorCode("fieldEmpty");
        }
    };

    return (
        <div style={{ marginTop: "50px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    Post new recipe
                </Typography>
                <img src={images.default} alt="default" style={{ height: "200px", marginBottom: "10px", objectFit: "cover" }} />
                <ErrorAlert errorCode={errorCode} />
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="title">
                        <Typography variant="body2">Title</Typography>
                    </FormLabel>
                    <Input type="text" id="title" name="title" value={formData.title} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="serve">
                        <Typography variant="body2">Serve</Typography>
                    </FormLabel>
                    <Input type="number" min="1" max="10" id="serve" name="serve" value={formData.serve} onChange={handleFormData} />
                </div>
                <div>
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="type_category_id">
                            <Typography variant="body2">Type</Typography>
                        </InputLabel>
                        {categories && buildCategories("type")}
                    </div>
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="occasion_category_id">
                            <Typography variant="body2">Occasion</Typography>
                        </InputLabel>
                        {categories && buildCategories("occasion")}
                    </div>
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="main_ingredient_category_id">
                            <Typography variant="body2">Main ingredient</Typography>
                        </InputLabel>
                        {categories && buildCategories("main_ingredient")}
                    </div>
                    <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                        <InputLabel id="demo-simple-select-helper-label" htmlFor="cooking_method_category_id">
                            <Typography variant="body2">Cooking method</Typography>
                        </InputLabel>
                        {categories && buildCategories("cooking_method")}
                    </div>
                </div>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="ingredients">
                        <Typography variant="body2">Ingredient</Typography>
                    </FormLabel>
                    <div>
                        {formData.ingredients.map((element, index) => (
                            <div key={index} style={{ display: "flex" }}>
                                <Input type="text" name="name" id={`name${index}`} sx={{ mb: "10px", mr: "6px" }} placeholder="Name" value={separateIngredient(element).name} onChange={(event) => handleIngredientFieldData(index, event)} />
                                <Input type="text" name="amount" id={`amount${index}`} sx={{ mb: "10px", mr: "6px" }} placeholder="Amount" value={separateIngredient(element).amount} onChange={(event) => handleIngredientFieldData(index, event)} />
                                <Input type="text" name="unit" id={`unit${index}`} sx={{ mb: "10px", mr: "6px" }} placeholder="Unit" value={separateIngredient(element).unit} onChange={(event) => handleIngredientFieldData(index, event)} />
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
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="steps">
                        <Typography variant="body2">Step</Typography>
                    </FormLabel>
                    <div id="steps">
                        {formData.steps.map((element, index) => (
                            <div key={index} style={{ display: "flex" }}>
                                <TextareaAutosize name="step" id={`step${index}`} style={{ minWidth: 400, margin: "0 6px 10px 0" }} aria-label="empty textarea" minRows={4} value={element} onChange={(event) => handleStepFieldData(index, event)} />
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
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="image">
                        <Typography variant="body2">Image</Typography>
                    </FormLabel>
                    <Input type="file" name="image" id="image" accept="image/*" onChange={handleImageData} />
                </div>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">Post</Button>
                </div>
            </form>
        </div>
    );
};

export default RecipeForm;
