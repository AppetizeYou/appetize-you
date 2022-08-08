import { Button, FormLabel, Input, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authentication";
import { useGlobalState } from "../utilities/context";
import ErrorAlert from "./ErrorAlert";

const SignUpForm = () => {
    const navigate = useNavigate();

    const { dispatch } = useGlobalState();

    const initialFormData = {
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
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
        <div style={{ margin: "0 10px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <ErrorAlert errorCode={errorCode} />
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="email"><Typography variant="body2">Email</Typography></FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="username"><Typography variant="body2">Username</Typography></FormLabel>
                    <Input type="text" id="username" name="username" placeholder="Type your username" value={formData.username} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password"><Typography variant="body2">Password</Typography></FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password_confirmation"><Typography variant="body2">Password confirmation</Typography></FormLabel>
                    <Input type="password" id="password_confirmation" name="password_confirmation" placeholder="Type your password again" value={formData.password_confirmation} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">SIGN UP</Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
