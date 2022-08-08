import { Avatar, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const Review = (params) => {
    const { review } = params;

    return (
        <>
            <Avatar sx={{ bgcolor: blue[300] }} style={{ marginRight: "10px" }}>
                {review.reviewer[0]}
            </Avatar>
            <div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                    <Typography variant="h7" style={{ marginRight: "5px" }}>
                        {review.reviewer}
                    </Typography>
                    <Typography variant="subtitle2">{new Date(review.created_at).toLocaleString("en-AU")}</Typography>
                </div>
                <p>{review.comment}</p>
            </div>
        </>
    );
};

export default Review;
