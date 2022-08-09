import { Avatar, Button, CardHeader, Slider, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
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
    const [multiplier, setMultiplier] = useState(1);

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

    const handleMultiplierChange = (event) => {
        setMultiplier(event.target.value);
    };

    const handleEdit = () => {
        navigate(`/recipes/${recipe.id}/edit`);
    };

    return (
        <>
            {recipe ? (
                <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <div>
                        <Typography variant="h3" fontWeight={800}>
                            {recipe.title}
                        </Typography>
                        <Typography variant="button">
                            <strong>Serves:</strong> {recipe.serve} {recipe.serve === 1 ? "person" : "people"}
                        </Typography>
                        <div>
                            <img src={recipe.image_url || images.default} alt={recipe.title} style={{ maxWidth: "700px" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: blue[300] }} aria-label="author">
                                        {recipe.author.username[0]}
                                    </Avatar>
                                }
                                title={recipe.author.username}
                                subheader={`${new Date(recipe.created_at).toLocaleString("en-AU")} (Updated: ${new Date(recipe.updated_at).toLocaleString("en-AU")})`}
                            />
                            {user && user.username === recipe.author.username && (
                                <Button type="button" onClick={handleEdit}>
                                    Edit
                                </Button>
                            )}
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
                                <Typography variant="h5" fontWeight={500} style={{ marginBottom: "10px" }}>
                                    Ingredients
                                </Typography>
                                <Slider defaultValue={multiplier} step={1} marks min={1} max={10} aria-label="Default" valueLabelDisplay="auto" style={{ width: "90%", alignSelf: "center" }} value={multiplier} onChange={handleMultiplierChange} />
                                <ul style={{ padding: "0" }}>
                                    <Ingredients ingredients={recipe.ingredients} multiplier={multiplier} />
                                </ul>
                            </div>
                            <div style={{ width: "60%", display: "flex", flexDirection: "column" }}>
                                <Typography variant="h5" fontWeight={500} style={{ marginBottom: "10px" }}>
                                    Steps
                                </Typography>
                                <ul style={{ padding: "0" }}>
                                    <Steps steps={recipe.steps} />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <Typography variant="h5" fontWeight={500} style={{ marginBottom: "10px" }}>
                            Reviews
                        </Typography>
                        <Reviews recipe={recipe} />
                    </div>
                </div>
            ) : (
                <InvalidPage />
            )}
        </>
    );
};

export default RecipeDetail;
