import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

export const getRequests = async (apiToken) => {
    return axiosInstance.get(`${BASE_URL}/api/requests/getRequests`, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}