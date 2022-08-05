import { useEffect, useState } from "react";
import { getReviews } from "../services/review";
import { useGlobalState } from "../utilities/context";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const Reviews = (params) => {
    const { id, author } = params;

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
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div>Reviews</div>
            {user && user.username !== author.username && <ReviewForm id={id} setReviews={setReviews} />}
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
