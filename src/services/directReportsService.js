import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

const directReportsEndpoint = "/api/directs"

const getDirectReportsByEmail = async (email, apiToken) => {
    return axiosInstance.post(`${BASE_URL}${directReportsEndpoint}/getdirects`, {
        managerId: email
    }, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
};

export {
  getDirectReportsByEmail
}