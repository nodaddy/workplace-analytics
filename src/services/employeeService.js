import axios from "axios";
import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

  const getEmployeeByEmail = async (email, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/employees/getemployee`, {
      id: email
    }, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
  };

export {
  getEmployeeByEmail
}