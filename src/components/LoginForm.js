import { useGlobalState } from "../utilities/context";
import { useState } from "react";
import { login } from "../services/authentication";
import { Link, useNavigate } from "react-router-dom";

import "./styles/LoginForm.scss";

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
            .catch((error) => console.log(error));
    };

    return (
        <div id="login-form-parent">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <Link to="/auth/signup">Sign up</Link>
        </div>
    );
};

export default LoginForm;
