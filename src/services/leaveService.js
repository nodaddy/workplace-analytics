import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

export const postLeaveApplication = async (data, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/leaves/createleave`, data, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}

export const getLeaveApplications = async (apiToken) => {
    return axiosInstance.get(`${BASE_URL}/api/leaves/getleaves`, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}