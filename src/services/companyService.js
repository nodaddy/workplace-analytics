import { BASE_URL } from "../Constants";
import axiosInstance from "../axiosInstance";

const companyEndpoint = "/api/companies";

const getCompanyById = async (id, apiToken) => {
    return axiosInstance.post(`${BASE_URL}${companyEndpoint}/getcompany`, {
        companyId: id
    }, {
            headers: {
                    "Authorization": `Bearer ${apiToken}`,
                    "Content-Type": "application/json"
            }
    })
};

const postCompany = async (companyData, apiToken) => {
    return axiosInstance.post(`${BASE_URL}${companyEndpoint}/createcompany`, companyData, {
            headers: {
                    "Authorization": `Bearer ${apiToken}`,
                    "Content-Type": "application/json"
            }
    })
};



export {
  getCompanyById,
  postCompany
}