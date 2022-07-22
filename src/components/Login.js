import { useGlobalState } from "../utilities/context";
import { useState } from "react";
import { login } from "../services/authentication";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
            })
            .catch((error) => console.log(error));

        setFormData(initialFormData);

        navigate("/");
    };

    return (
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
                <button type="submit">LOGIN</button>
            </div>
            Or
            <div>
                <Link to="/signup">SIGN UP</Link>
            </div>
        </form>
    );
};

export default Login;
