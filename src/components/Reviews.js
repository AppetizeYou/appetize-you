import { useEffect, useState } from "react";
import { getReviews } from "../services/review";
import { useGlobalState } from "../utilities/context";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const Reviews = (params) => {
    const { id } = params;

    const { store } = useGlobalState();
    const { user } = store;

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews(id)
            .then((data) => {
                setReviews(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div>Reviews</div>
            {user && <ReviewForm id={id} setReviews={setReviews} />}
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <Review review={review} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Reviews;
