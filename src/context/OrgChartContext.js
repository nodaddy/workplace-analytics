// src/context/AppContext.js
import React, { createContext, useEffect, useState } from 'react';

const OrgChartContext = createContext();

const OrgChartProvider = ({ children }) => {
  const [orgChartState, setOrgChartState] = useState({
    selectedEmployeeWithFullInfo: {
        employeeType: null,
        jpbTitle: null,
        fullName: null,
        employeeId: null,
        location: null,
        department: null,
        email: null,
        managerEmail: null
    },
    flyOutForEmployeeInfo: false
    // Add other global states here
  });

  const saveSelectedEmployeeWithFullInfo = (employee) => {
   setOrgChartState((prev) => {return { ...prev, selectedEmployeeWithFullInfo: employee}});
  };

  const setFlyOutForEmployeeInfo = (status) => {
    setOrgChartState((prev) => {return { ...prev, flyOutForEmployeeInfo: status}});
  };

  return (
    <OrgChartContext.Provider value={{ orgChartState, saveSelectedEmployeeWithFullInfo, setFlyOutForEmployeeInfo }}>
      {children}
    </OrgChartContext.Provider>
  );
};

export { OrgChartContext, OrgChartProvider };
