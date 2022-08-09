import AppetizeYouAPI from "../config/api";

async function submitContact(data) {
    const response = await AppetizeYouAPI.post("/contacts", data);

    return response.data;
}

export default submitContact;