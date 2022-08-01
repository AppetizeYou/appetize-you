import AppetizeYouAPI from "../config/api";

async function getReviews(id) {
    const response = await AppetizeYouAPI.get(`/recipes/${id}/reviews`);

    return response.data;
}

async function postReview(id, data) {
    const response = await AppetizeYouAPI.post(`/recipes/${id}/review`, data);

    return response.data;
}

export { getReviews, postReview };
