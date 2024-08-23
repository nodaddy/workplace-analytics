import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

export const postGoal = async (data, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/goals/postgoal`, data, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
}

export const getGoals = async (data, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/goals/getGoalsByEmployeeIdAndPerformanceCycle`, data, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    });
}