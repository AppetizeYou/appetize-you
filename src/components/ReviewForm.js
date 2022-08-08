import { Button, FormLabel, TextareaAutosize, Typography } from "@mui/material";
import { useState } from "react";
import { getReviews, postReview } from "../services/review";
import ReactStars from "react-rating-stars-component";

const ReviewForm = (params) => {
    const { id, setReviews } = params;

    const initialFormData = {
        comment: "",
        rating: 0,
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

        postReview(id, formData)
            .then(() => {
                getReviews(params.id)
                    .then((data) => {
                        setReviews(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

        setFormData(initialFormData);
    };

    return (
        <div>
            <form style={{ margin: "0 auto", maxWidth: "800px", display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
                <FormLabel htmlFor="comment">
                    <Typography variant="body2">Comment</Typography>
                </FormLabel>
                <TextareaAutosize name="comment" id="comment" style={{ minWidth: 300, margin: "0 6px 6px 0" }} aria-label="empty textarea" minRows={4} value={formData.comment} onChange={handleFormData} />
                <ReactStars name="rating" id="rating" count={5} onChange={handleFormData} size={30} activeColor="#ffd700" />
                <Button type="submit">Leave review</Button>
            </form>
        </div>
    );
};

export default ReviewForm;
