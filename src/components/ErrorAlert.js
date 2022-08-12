import { Alert, AlertTitle, } from "@mui/material";
import { useEffect, useState } from "react";

const ErrorAlert = (params) => {
    const { errorCode } = params;

    const errorList = {
        fieldEmpty: <>Input fields must not be left empty!</>,
        incorrectEmailAndPassword: (
            <>
                <strong>ERROR 404</strong> - Email or password is wrong!
            </>
        ),
        passwordsNotTheSame: <>Password and password confirmation must be same!</>,
    };

    // set the error message only when the page is first loaded
    useEffect(() => {
        setErrorMessage(errorList[errorCode]);
        
        // eslint-disable-next-line
    }, [errorCode]);

    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <>
            {errorCode && (
                <Alert id="alert" severity="error" style={{ marginBottom: "20px" }}>
                    <AlertTitle style={{ margin: "0" }}>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}
        </>
    );
};

export default ErrorAlert;
