import { useGlobalState } from "../utilities/context";
import { useState } from "react";
import { login } from "../services/authentication";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, FormLabel, Input, Link, Typography } from "@mui/material";
import ErrorAlert from "./ErrorAlert";

import images from "../utilities/images";

const LoginForm = () => {
    const navigate = useNavigate();

    // to set user throughout the entire page
    const { dispatch } = useGlobalState();

    // initial login form data
    const initialFormData = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errorCode, setErrorCode] = useState(null);

    // handle login form data
    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    // submit login form data to server
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
        <div style={{ marginTop: "50px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    Login
                </Typography>
                <img src={images.default} alt="default" style={{ height: "200px", marginBottom: "10px", objectFit: "cover" }} />
                <ErrorAlert errorCode={errorCode} />
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="email">
                        <Typography variant="body2">Email</Typography>
                    </FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password">
                        <Typography variant="body2">Password</Typography>
                    </FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">Login</Button>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="overline">Do not have an account yet?</Typography>
                    <Link component={RouterLink} to="/auth/signup" underline="none">
                        Sign up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
