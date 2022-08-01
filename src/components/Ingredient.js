const Ingredient = (params) => {
    const { ingredient } = params;

    const [name, amount, unit] = ingredient.split(",");

    return (
        <>
            <div>{name}</div>
            <div>{amount}</div>
            <div>{unit}</div>
        </>
    );
};

export default Ingredient;
