import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../services/recipe";

const Recipes = () => {
    useEffect(() => {
        getRecipes().then((recipes) => {
            setRecipes(recipes);
        });
    }, []);

    // eslint-disable-next-line
    const [recipes, setRecipes] = useState(null);

    return (
        <div>
            {recipes
                ? recipes.map((recipe, index) => (
                      <div key={index}>
                          <Link to={`${recipe.id}`}>{recipe.title}</Link>
                      </div>
                  ))
                : null}
        </div>
    );
};

export default Recipes;
