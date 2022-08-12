import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getReviews } from "../services/review";
import { useGlobalState } from "../utilities/context";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const Reviews = (params) => {
    const { recipe } = params;

    const { store } = useGlobalState();
    const { user } = store;

    const [reviews, setReviews] = useState([]);

    // load reviews for recipe
    useEffect(() => {
        getReviews(recipe.id)
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.log(error);
            });

        // eslint-disable-next-line
    }, []);

    return (
        <>
            {user && user.username !== recipe.author.username && <ReviewForm id={recipe.id} setReviews={setReviews} />}
            {reviews.length > 0 ? (
                <ul style={{ padding: "0" }}>
                    {reviews.map((review, index) => (
                        <li key={index} style={{ listStyle: "none", marginBottom: "20px", display: "flex" }}>
                            <Review review={review} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div style={{ height: "150px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="body2">Be the first to review this recipe!</Typography>
                </div>
            )}
        </>
    );
};

export default Reviews;
