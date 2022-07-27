import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from "../services/recipe";
import { useGlobalState } from "../utilities/context";
import InvalidPage from "./InvalidPage";

const RecipeDetail = () => {
    const navigate = useNavigate();

    const { store } = useGlobalState();
    const { user } = store;

    const params = useParams();

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        getRecipe(params.id)
            .then((data) => {
                setRecipe(data);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, [params.id]);

    const separateIngredient = (ingredient) => {
        let [name, amount, unit] = ingredient.split(",");

        return { name, amount, unit };
    };

    const handleEdit = (event) => {
        navigate(`/recipes/${params.id}/edit`);
    };

    return (
        <div>
            {recipe ? (
                <>
                    <div>{recipe.title}</div>
                    <div>{recipe.author}</div>
                    <div>
                        {recipe.created_at} (Updated: {recipe.updated_at})
                    </div>
                    <div>
                        <div>Ingredients</div>
                        <ul>
                            {recipe.ingredients &&
                                recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        <div>{separateIngredient(ingredient).name}</div>
                                        <div>{separateIngredient(ingredient).amount}</div>
                                        <div>{separateIngredient(ingredient).unit}</div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div>
                        <div>Steps</div>
                        <ul>
                            {recipe.steps &&
                                recipe.steps.map((step, index) => (
                                    <li key={index}>
                                        <div>
                                            <div>Step {index + 1}</div>
                                            <div>{step}</div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div>
                        {user &&
                            (user.username === recipe.author ? (
                                <button type="button" onClick={handleEdit}>
                                    Edit
                                </button>
                            ) : null)}
                    </div>
                </>
            ) : (
                <InvalidPage />
            )}
        </div>
    );
};

export default RecipeDetail;
