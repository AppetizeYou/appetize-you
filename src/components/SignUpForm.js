import { Button, FormLabel, Input } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authentication";
import { useGlobalState } from "../utilities/context";

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

    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

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
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input type="text" id="username" name="username" placeholder="Type your username" value={formData.username} onChange={handleFormData} />
                </div>
                <div>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div>
                    <FormLabel htmlFor="password_confirmation">Password confirmation</FormLabel>
                    <Input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="Type your password again"
                        value={formData.password_confirmation}
                        onChange={handleFormData}
                    />
                </div>
                <div>
                    <Button type="submit">SIGN UP</Button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
