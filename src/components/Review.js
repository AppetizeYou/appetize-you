const Review = (params) => {
    const { review } = params;

    return (
        <>
            <div>{review.reviewer}</div>
            <div>{review.created_at}</div>
            <div>{review.comment}</div>
        </>
    );
};

export default Review;
