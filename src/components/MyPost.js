import { getMyRecipes } from "../services/recipe";

const MyPost = () => {
    getMyRecipes()
        .then((recipes) => {
            console.log(recipes);
        })
        .catch((error) => {
            console.log(error);
        });

    return (
        <>
            <></>
        </>
    );
};

export default MyPost;
