import { Typography } from "@mui/material";

const Step = (params) => {
    const { step, index } = params;

    return (
        <>
            <Typography variant="body2" style={{ marginBottom: "5px" }}>
                Step {index + 1}
            </Typography>
            <div>{step}</div>
        </>
    );
};

export default Step;
