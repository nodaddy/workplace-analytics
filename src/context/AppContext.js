// src/context/AppContext.js
import React, { createContext, useEffect, useState } from 'react';
import { API_TOKEN_KEY } from '../Constants';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: 'light',
    apiToken: sessionStorage.getItem(API_TOKEN_KEY),
    currentEmployee: null
    // Add other global states here
  });

  const saveCurrentUser = (currentEmployee) => {
    setState({ ...state, currentEmployee: currentEmployee});
  };

  const login = (user) => {
    console.log("login login");
    setState({ ...state, user: user, apiToken: user.accessToken });
    sessionStorage.setItem(API_TOKEN_KEY, user.accessToken);
  };

  const logout = () => {
    setState({ ...state, user: null });
  };

  const toggleTheme = () => {
    setState({ ...state, theme: state.theme === 'light' ? 'dark' : 'light' });
  };

  // Update sessionStorage whenever the token changes
  useEffect(() => {
    if (state.apiToken) {
      sessionStorage.setItem(API_TOKEN_KEY, state.apiToken);
    } else {
      sessionStorage.removeItem(API_TOKEN_KEY);
    }
  }, [state.apiToken]);

  return (
    <AppContext.Provider value={{ state, login, logout, toggleTheme, saveCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
