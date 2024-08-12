let logoutFunction = null;

export const setLogoutFunction = (logoutFn) => {
  logoutFunction = logoutFn;
};

export const logout = () => {
  if (logoutFunction) {
    logoutFunction();
  }
};