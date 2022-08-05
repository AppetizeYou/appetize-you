import { useGlobalState } from "../utilities/context";
import { useState } from "react";
import { login } from "../services/authentication";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, FormLabel, Input, Link } from "@mui/material";

const LoginForm = () => {
    const navigate = useNavigate();

    const { dispatch } = useGlobalState();

    const initialFormData = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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
                console.log(error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div>
                    <Button type="submit">Login</Button>
                </div>
            </form>
            <Link component={RouterLink} to="/auth/signup" underline="none">
                Sign up
            </Link>
        </div>
    );
};

export default LoginForm;
