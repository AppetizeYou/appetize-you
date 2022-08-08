import { useGlobalState } from "../utilities/context";
import { useState } from "react";
import { login } from "../services/authentication";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, FormLabel, Input, Link } from "@mui/material";
import ErrorAlert from "./ErrorAlert";

const LoginForm = () => {
    const navigate = useNavigate();

    const { dispatch } = useGlobalState();

    const initialFormData = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorCode, setErrorCode] = useState(null);

    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.email !== "" && formData.password !== "") {
            login(formData)
                .then((user) => {
                    dispatch({
                        type: "setUser",
                        data: {
                            username: user.username,
                            token: user.jwt,
                        },
                    });

                    navigate("/");

                    setFormData(initialFormData);
                })
                .catch((error) => {
                    setErrorCode("incorrectEmailAndPassword");
                });
        } else {
            setErrorCode("fieldEmpty");
        }
    };

    return (
        <div style={{ margin: "0 10px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <ErrorAlert errorCode={errorCode} />
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">Login</Button>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Link component={RouterLink} to="/auth/signup" underline="none">
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
