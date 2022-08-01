const Step = (params) => {
    const { step, index } = params;

    return (
        <>
            <div>Step {index + 1}</div>
            <div>{step}</div>
        </>
    );
};

export default Step;
