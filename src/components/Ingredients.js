import Ingredient from "./Ingredient";

const Ingredients = (params) => {
    const { ingredients, multiplier } = params;

    return (
        <>
            {ingredients.map((ingredient, index) => (
                <li key={index} style={{ listStyle: "none", marginBottom: "10px", display: "flex" }}>
                    <Ingredient ingredient={ingredient} multiplier={multiplier} />
                </li>
            ))}
        </>
    );
};

export default Ingredients;
