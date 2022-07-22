import { useParams } from "react-router-dom";

const RecipeDetail = () => {
    const params = useParams();

    return (
        <div>
            <h1>RECIPE DETAIL {params.id} PAGE</h1>
        </div>
    );
};

export default RecipeDetail;
