// src/context/AppContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_TOKEN_KEY } from '../Constants';
import { setLogoutFunction } from '../auth';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: 'light',
    apiToken: sessionStorage.getItem(API_TOKEN_KEY),
    currentEmployee: null,
    tools: [
      {
          displayName: 'Organisational Chart',
          color: 'orange'
      },
      {
          displayName: 'Leaves',
          color: '#4285F4'
      },
      {
          displayName: 'Career & Performance',
          color: '#F4B400'
      },
      {
          displayName: 'Expenses',
          color: 'skyblue'
      },
      // {
      //     displayName: 'Benefits',
      //     color: '#DB4437'
      // }
    ],
    selectedTool: null,
    // Add other global states here
  });

  const saveCurrentUser = (currentEmployee) => {
    setState((prev) => {return { ...prev, currentEmployee: currentEmployee}});
  };

  const saveSelectedTool = (toolName) => {
    setState((prev) => {return {...prev, selectedTool: toolName}});
  }

  const login = (user) => {
    console.log("login login");
    setState((prev) => {return { ...prev, user: user, apiToken: user.accessToken }});
    sessionStorage.setItem(API_TOKEN_KEY, user.accessToken);
  };

  const logout = () => {
    setState((prev) => {return { ...prev, user: null, apiToken: null }});
  };

  const toggleTheme = () => {
    setState((prev) => {return { ...prev, theme: state.theme === 'light' ? 'dark' : 'light' }});
  };

  // Update sessionStorage whenever the token changes
  useEffect(() => {
    if (state.apiToken) {
      sessionStorage.setItem(API_TOKEN_KEY, state.apiToken);
    } else {
      sessionStorage.removeItem(API_TOKEN_KEY);
    }
  }, [state.apiToken]);

  useEffect(() => {
    setLogoutFunction(logout);
  }, []);

  return (
    <AppContext.Provider value={{ state, login, logout, toggleTheme, saveCurrentUser, saveSelectedTool }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
export { useAppContext, AppProvider };
