import { useState } from "react";
import { getReviews, postReview } from "../services/review";

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="comment" value={formData.comment} onChange={handleFormData} />
                <button type="submit">Leave review</button>
            </form>
        </div>
    );
};

export default ReviewForm;
