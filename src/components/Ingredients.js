import Ingredient from "./Ingredient";

const Ingredients = (params) => {
    const { ingredients } = params;

    return (
        <>
            {ingredients.map((ingredient, index) => (
                <li key={index}>
                    <Ingredient ingredient={ingredient} />
                </li>
            ))}
        </>
    );
};

export default Ingredients;
