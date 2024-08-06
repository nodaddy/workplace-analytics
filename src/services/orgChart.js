import axios from "axios";
import { BASE_URL } from "../Constants";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const useEmployeeApi = () => {
  const { state, saveCurrentUser } = useContext(AppContext);

  const getEmployeeByEmail = async (email) => {
    console.log(state.apiToken);
    axios.post(`${BASE_URL}/api/employees/getemployee`, {
      id: email
  }, {
      headers: {
          "Authorization": `Bearer ${state.apiToken}`,
          "Content-Type": "application/json"
      }
  })
  .then(res => {
      saveCurrentUser(res.data);
  })
  };

  return [getEmployeeByEmail, "string"];
};

export {
  useEmployeeApi
}