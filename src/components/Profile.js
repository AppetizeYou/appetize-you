import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteAccount, getAccount, updateAccount } from "../services/authentication";
import { useGlobalState } from "../utilities/context";

import "./styles/Profile.scss";

const Profile = () => {
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

    useEffect(() => {
        getAccount().then((data) =>
            setFormData({
                ...formData,
                email: data.email,
                username: data.username,
            })
        );

        // eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        updateAccount(formData)
            .then((user) => {
                dispatch({
                    type: "setUser",
                    data: {
                        username: user.username,
                        token: user.jwt,
                    },
                });

                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    const handleDeleteAccountButton = (event) => {
        event.preventDefault();

        confirmAlert({
            title: "Confirm to delete account",
            message: "Are you sure to delete your account?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        deleteAccount()
                            .then((data) => {
                                dispatch({
                                    type: "setUser",
                                    data: null,
                                });

                                navigate("/");
                            })
                            .catch((error) => console.log(error));
                    },
                },
                {
                    label: "No",
                    onClick: null,
                },
            ],
        });
    };

    return (
        <div id="profile-form-parent">
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
                    <button type="submit">Update Account</button>
                </div>
            </form>
            <Link to="/" onClick={handleDeleteAccountButton}>
                Delete Account
            </Link>
        </div>
    );
};

export default Profile;
