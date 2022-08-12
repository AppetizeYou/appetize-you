import { Button, FormLabel, Input, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import SuccessAlert from "./SuccessAlert";
import ErrorAlert from "./ErrorAlert";
import submitContact from "../services/contact";

import images from "../utilities/images";

const Contact = () => {
    // initial form data of contact
    const initialFormData = {
        name: "",
        email: "",
        message: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    // success and error code to display message on alert
    const [successCode, setSuccessCode] = useState(null);
    const [errorCode, setErrorCode] = useState(null);

    // handle contact form data
    const handleFormData = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    // submit form data to server
    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.name !== "" && formData.email !== "" && formData.message !== "") {
            submitContact(formData)
                .then((data) => {
                    setSuccessCode("contact");

                    setFormData(initialFormData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setErrorCode("fieldEmpty");
        }
    };

    return (
        <div style={{ marginTop: "50px" }}>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    Contact
                </Typography>
                <img src={images.default} alt="default" style={{ height: "200px", marginBottom: "10px", objectFit: "cover" }} />
                <SuccessAlert successCode={successCode} />
                <ErrorAlert errorCode={errorCode} />
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="name">
                        <Typography variant="body2">Name</Typography>
                    </FormLabel>
                    <Input type="text" id="name" name="name" placeholder="Type your name" value={formData.name} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="email">
                        <Typography variant="body2">Email</Typography>
                    </FormLabel>
                    <Input type="email" id="email" name="email" placeholder="Type your email" value={formData.email} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "10px", display: "flex", flexDirection: "column" }}>
                    <FormLabel htmlFor="message">
                        <Typography variant="body2">Message</Typography>
                    </FormLabel>
                    <TextareaAutosize id="message" name="message" style={{ minWidth: 400, margin: "0 6px 10px 0" }} placeholder="Type your message" aria-label="empty textarea" minRows={6} value={formData.message} onChange={handleFormData} />
                </div>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column" }}>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
