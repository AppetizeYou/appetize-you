const Ingredient = (params) => {
    const { ingredient, multiplier } = params;

    // separate ingredient data into three different variables
    const [name, amount, unit] = ingredient.split(",");

    return (
        <>
            <div style={{width: "60%"}}>{name}</div>
            <div style={{width: "25%"}}>{parseInt(amount) * multiplier}</div>
            <div style={{width: "15%"}}>{unit}</div>
        </>
    );
};

export default Ingredient;
