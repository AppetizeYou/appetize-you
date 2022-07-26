import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCategories from "../services/category";
import { postRecipe } from "../services/recipe";

const RecipeForm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((categories) => {
                Object.entries(categories).forEach(([key, value]) => {
                    const id = key.replace("categories", "category") + "_id";
                    let select = document.getElementById(id);
                    for (const category of value) {
                        let option = document.createElement("option");
                        option.value = category.id;
                        option.innerHTML = category.name.charAt(0).toUpperCase() + category.name.slice(1);
                        select.appendChild(option);
                    }
                });
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
    };

    const [formData, setFormData] = useState(initialFormData);

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

        postRecipe(formData).then(() => {
            navigate("/recipes");

            setFormData(initialFormData);
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleFormData} />
            </div>
            <div>
                <label htmlFor="serve">Serve</label>
                <input type="number" min="1" max="10" id="serve" name="serve" value={formData.serve} onChange={handleFormData} />
            </div>
            <div>
                <label htmlFor="type_category_id">Type</label>
                <select name="type_category_id" id="type_category_id" onChange={handleFormData} />
            </div>
            <div>
                <label htmlFor="occasion_category_id">Occasion</label>
                <select name="occasion_category_id" id="occasion_category_id" onChange={handleFormData} />
            </div>
            <div>
                <label htmlFor="main_ingredient_category_id">Main Ingredient</label>
                <select name="main_ingredient_category_id" id="main_ingredient_category_id" onChange={handleFormData} />
            </div>
            <div>
                <label htmlFor="cooking_method_category_id">Cooking Method</label>
                <select name="cooking_method_category_id" id="cooking_method_category_id" onChange={handleFormData} />
            </div>
            <div>
                <label htmlFor="ingredients">Ingredient</label>
                <div id="ingredients">
                    <button type="button" onClick={() => addIngredientFields()}>
                        Add
                    </button>
                    {formData.ingredients.map((element, index) => (
                        <div key={index}>
                            <input type="text" name="name" id={`name${index}`} value={separateIngredient(element).name} onChange={(event) => handleIngredientFieldData(index, event)} />
                            <input type="text" name="amount" id={`amount${index}`} value={separateIngredient(element).amount} onChange={(event) => handleIngredientFieldData(index, event)} />
                            <input type="text" name="unit" id={`unit${index}`} value={separateIngredient(element).unit} onChange={(event) => handleIngredientFieldData(index, event)} />
                            {index > 0 ? (
                                <button type="button" onClick={() => removeIngredientField(index)}>
                                    Remove
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="steps">Step</label>
                <div id="steps">
                    <button type="button" onClick={addStepField}>
                        Add
                    </button>
                    {formData.steps.map((element, index) => (
                        <div key={index}>
                            <textarea name="step" id={`step${index}`} value={formData.steps[index]} onChange={(event) => handleStepFieldData(index, event)} />
                            {index > 0 ? (
                                <button type="button" onClick={() => removeStepField(index)}>
                                    Remove
                                </button>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <button type="submit">SUBMIT</button>
            </div>
        </form>
    );
};

export default RecipeForm;
