import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

  const getEmployeeByEmail = async (email, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/employees/getemployee`, {
      email: email
    }, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
  };

  const updateEmployeeProfile = async (employeeEmail, data, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/employees/updateemployeeprofile`, {
      employeeEmail: employeeEmail,
      data: data
    }, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
  };

  const updateMultipleEmployeesWithSameData = async (employees, data, apiToken) => {
    console.log(employees);
    return axiosInstance.post(`${BASE_URL}/api/employees/updatemultipleemployeesRoles`, {
      listOfEmployeeEmails: employees,
      data: data
    }, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
  }


  const postEmployeesInbulk = async (employees, apiToken) => {
    return axiosInstance.post(`${BASE_URL}/api/employees/postemployeesinbulk`, {
      employees: employees,
      companyId: localStorage.getItem('companyhris')
    }, {
        headers: {
            "Authorization": `Bearer ${apiToken}`,
            "Content-Type": "application/json"
        }
    })
  };

export {
  getEmployeeByEmail,
  postEmployeesInbulk,
  updateMultipleEmployeesWithSameData,
  updateEmployeeProfile
}