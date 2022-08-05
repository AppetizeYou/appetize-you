import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from "../services/recipe";
import { useGlobalState } from "../utilities/context";
import images from "../utilities/images";
import Ingredients from "./Ingredients";
import InvalidPage from "./InvalidPage";
import Reviews from "./Reviews";
import Steps from "./Steps";

const RecipeDetail = () => {
    const params = useParams();

    const navigate = useNavigate();

    const { store } = useGlobalState();
    const { user } = store;

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
    }, []);

    const handleEdit = (event) => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    return (
        <div>
            {recipe ? (
                <>
                    <div>{recipe.title}</div>
                    <div>
                        <img src={recipe.image_url || images.default} alt={recipe.title} />
                    </div>
                    <div>{recipe.author.username}</div>
                    <div>
                        {recipe.created_at} (Updated: {recipe.updated_at})
                    </div>
                    <div>
                        <div>Ingredients</div>
                        <ul>
                            <Ingredients ingredients={recipe.ingredients} />
                        </ul>
                    </div>
                    <div>
                        <div>Steps</div>
                        <ul>
                            <Steps steps={recipe.steps} />
                        </ul>
                    </div>
                    <div>
                        {user &&
                            (user.username === recipe.author.username ? (
                                <button type="button" onClick={handleEdit}>
                                    Edit
                                </button>
                            ) : null)}
                    </div>
                    <div>
                        <Reviews id={recipe.id} author={recipe.author} />
                    </div>
                </>
            ) : <InvalidPage />}
        </div>
    );
};

export default RecipeDetail;
