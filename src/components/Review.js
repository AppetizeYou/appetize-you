import { Avatar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import "./styles/Star.scss";

const Review = (params) => {
    const { review } = params;

    // render stars per each review
    const drawStars = (rating) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <span key={i} className="star">
                    ★
                </span>
            );
        }

        return stars;
    };

    return (
        <>
            <Avatar sx={{ bgcolor: blue[300] }} style={{ marginRight: "10px" }}>
                {review.reviewer[0]}
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                    <Typography variant="h7" style={{ marginRight: "5px" }}>
                        {review.reviewer}
                    </Typography>
                    <Typography variant="subtitle2" style={{ marginRight: "5px" }}>
                        {new Date(review.created_at).toLocaleString("en-AU")}
                    </Typography>
                </div>
                <div>{drawStars(parseInt(review.rating)).map((star) => star)}</div>
                <p>{review.comment}</p>
            </div>
        </>
    );
};

export default Review;
