import { Button, FormLabel, Input, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { deleteAccount, getAccount, updateAccount } from "../services/authentication";
import { useGlobalState } from "../utilities/context";

import "react-confirm-alert/src/react-confirm-alert.css";
import ErrorAlert from "./ErrorAlert";

const Profile = () => {
    const navigate = useNavigate();

    const { dispatch } = useGlobalState();

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
            setErrorCode("passwordsNotSame");
        } else if (formData.email === "" || formData.username === "" || formData.password === "" || formData.password_confirmation === "") {
            console.log(formData);

            setErrorCode("fieldEmpty");
        } else {
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
                .catch((error) => {
                    console.log(error);
                });
        }
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
        <div style={{ margin: "0 10px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <ErrorAlert errorCode={errorCode} />
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input type="text" id="username" name="username" placeholder="Type your username" value={formData.username} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" id="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="password_confirmation">Password confirmation</FormLabel>
                    <Input type="password" id="password_confirmation" name="password_confirmation" placeholder="Type your password again" value={formData.password_confirmation} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">Update Account</Button>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <Link component={RouterLink} to="/" underline="none" onClick={handleDeleteAccountButton}>
                        Delete Account
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Profile;
