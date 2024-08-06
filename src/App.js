import { useContext, useEffect } from 'react';
import { AppContext, AppProvider } from './context/AppContext';
import AppRoutes from './routes';
import { useEmployeeApi } from './services/orgChart';
import i18n from './i18n';

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };

const App = () => {
  const [getEmployeeByEmail] = useEmployeeApi();
  const {state} = useContext(AppContext);

  useEffect(() => { 
      console.log('component mounterd');
      if(state.apiToken){
          getEmployeeByEmail(null);
      }
  }, [state.apiToken]);

  return (
    <>
      <AppRoutes />
      <button style={{
        position: 'absolute',
        bottom: '0px',
        right: '0px'
      }} onClick={() => {
        i18n.changeLanguage(Object.keys(lngs)[1])
      }}>change lang </button>
    </>
)};

export default App;