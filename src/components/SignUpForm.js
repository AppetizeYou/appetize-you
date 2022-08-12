import { Button, FormLabel, Input, Link, Typography } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signup } from "../services/authentication";
import { useGlobalState } from "../utilities/context";
import images from "../utilities/images";
import ErrorAlert from "./ErrorAlert";

const SignUpForm = () => {
    const navigate = useNavigate();

    const { dispatch } = useGlobalState();

    // initial sign up form data
    const initialFormData = {
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    // success and error code to display message on alert
    const [errorCode, setErrorCode] = useState(null);

    // handle form data
    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    // submit form data
    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            setErrorCode("passwordsNotTheSame");
        } else if (formData.email === "" || formData.username === "" || formData.password === "" || formData.password_confirmation === "") {
            setErrorCode("fieldEmpty");
        } else {
            signup(formData)
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
                    console.log(error);
                });
        }
    };

    return (
        <div style={{ marginTop: "50px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    Sign up
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
                    <FormLabel htmlFor="username">
                        <Typography variant="body2">Username</Typography>
                    </FormLabel>
                    <Input type="text" id="username" name="username" placeholder="Type your username" value={formData.username} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password">
                        <Typography variant="body2">Password</Typography>
                    </FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password_confirmation">
                        <Typography variant="body2">Password confirmation</Typography>
                    </FormLabel>
                    <Input type="password" id="password_confirmation" name="password_confirmation" placeholder="Type your password again" value={formData.password_confirmation} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">SIGN UP</Button>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="overline">Already have an account?</Typography>
                    <Link component={RouterLink} to="/auth/login" underline="none">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
