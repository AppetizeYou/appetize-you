import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../services/recipe";
import { useGlobalState } from "../utilities/context";

const RecipeDetail = () => {
    const { store } = useGlobalState();
    const { user } = store;

    const params = useParams();

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        getRecipe(params.id)
            .then((data) => {
                setRecipe(data);
            })
            .catch((error) => console.log(error));
    }, [params.id]);

    return (
        <div>
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
                                <div>{ingredient.name}</div>
                                <div>{ingredient.amount}</div>
                                <div>{ingredient.unit}</div>
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <div>Steps</div>
                <ul>
                    {recipe.steps && recipe.steps.map((step, index) => (
                        <li key={index}>
                            <div>{step}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {user && (user.username === recipe.author ? (<button type="button" onClick={null}>Edit</button>) : null)}
            </div>
        </div>
    );
};

export default RecipeDetail;
