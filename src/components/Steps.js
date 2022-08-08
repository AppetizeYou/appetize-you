import Step from "./Step";

const Steps = (params) => {
    const { steps } = params;

    return (
        <>
            {steps.map((step, index) => (
                <li key={index} style={{ listStyle: "none", marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <Step step={step} index={index} />
                </li>
            ))}
        </>
    );
};

export default Steps;
