import { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import AppRoutes from './routes';
import { getEmployeeByEmail } from './services/employeeService';
import i18n from './i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { message } from 'antd';

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };

const App = () => {
  const {state, saveCurrentUser} = useAppContext();

  useEffect(() => { 
      if(state.apiToken){
          getEmployeeByEmail(null, state.apiToken).then(res => {
            saveCurrentUser(res.data);
          }).catch((err)=>{
            message.error(err.message)
          });
      }
  }, [state.apiToken]);

  return (
    <>
      <AppRoutes />

      <ToastContainer position="top-right" />

      {/* <button style={{
        position: 'absolute',
        bottom: '0px',
        right: '0px'
      }} onClick={() => {
        i18n.changeLanguage(Object.keys(lngs)[1])
      }}>change lang </button> */}
    </>
)};

export default App;