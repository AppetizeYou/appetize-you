import { Alert, AlertTitle, } from "@mui/material";
import { useEffect, useState } from "react";

const SuccessAlert = (params) => {
    const { successCode } = params;

    const successList = {
        contact: <>Thank you for contacting us and we will get back to you as soon as possible!</>,
    };

    // set the success message only when the page is first loaded
    useEffect(() => {
        setSuccessMessage(successList[successCode]);
        
        // eslint-disable-next-line
    }, [successCode]);

    const [successMessage, setSuccessMessage] = useState(null);

    return (
        <>
            {successCode && (
                <Alert id="alert" severity="success" style={{ marginBottom: "20px" }}>
                    <AlertTitle style={{ margin: "0" }}>Success</AlertTitle>
                    {successMessage}
                </Alert>
            )}
        </>
    );
};

export default SuccessAlert;
