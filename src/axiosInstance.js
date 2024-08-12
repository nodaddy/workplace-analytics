import axios from 'axios';
import { useContext } from 'react';
import { useAppContext } from './context/AppContext';
import { logout } from './auth';
import Toast from './components/Toast';
import { t } from 'i18next';

// Create an Axios instance
const axiosInstance = axios.create({
  // other configurations if needed
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response, // If the response is successful, just return it
  error => {
    // If the response has an error status code
    if (error.response && error.response.status === 401) {
      // Call the logout function
      Toast.warn(t('auth.loginAgain'));
      setTimeout(() => {
        logout();
      }, [2000]);
    }
    // Return the error to be handled by the calling function
    return Promise.reject(error);
  }
);

export default axiosInstance;