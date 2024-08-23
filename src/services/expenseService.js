import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

export const postExpense = async (data, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/expenses/createExpense`, data, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}


export const getExpensesByEmployeeIdAndCompanyId = async (apiToken) => {
    return axiosInstance.get(`${BASE_URL}/api/expenses//getExpensesByEmployeeIdAndCompanyId`, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    });
}