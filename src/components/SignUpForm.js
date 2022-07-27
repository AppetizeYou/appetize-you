import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authentication";
import { useGlobalState } from "../utilities/context";

import "./styles/SignUp.scss";

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
        <div id="signup-form-parent">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Type your username" value={formData.username} onChange={handleFormData} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div>
                    <label htmlFor="password_confirmation">Password confirmation</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        placeholder="Type your password again"
                        value={formData.password_confirmation}
                        onChange={handleFormData}
                    />
                </div>
                <div>
                    <button type="submit">SIGN UP</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
