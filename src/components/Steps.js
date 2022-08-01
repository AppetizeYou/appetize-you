import Step from "./Step";

const Steps = (params) => {
    const { steps } = params;

    return (
        <>
            {steps.map((step, index) => (
                <li key={index}>
                    <Step step={step} index={index} />
                </li>
            ))}
        </>
    );
};

export default Steps;
