import React, { useContext } from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useAppContext } from './context/AppContext';
import OrgChart from './pages/OrgChart';
import { OrgChartProvider } from './context/OrgChartContext';
import SideBar from './components/SideBar';
import EmployeesDirectory from './pages/EmployeesDirectory';
import CompanyProfile from './pages/CompanyProfile';
import AddRoles from './pages/AddRoles';
import Navigationbar from './components/NavigationBar';
import Leaves from './pages/Leaves';
import CareerAndPerformance from './pages/CareerAndPerformance';
import Expenses from './pages/Expenses';

const AppRoutes = () => {

   const {state} = useAppContext();
   const { apiToken, user } = state;
  
    return (
    <Router>
        {
            apiToken ? <>
            <Navigationbar />
            <SideBar />

            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/about" element={<div style={{color: 'black'}}>About</div>} />
                <Route path="/organisationalchart" element={<OrgChartProvider><OrgChart/></OrgChartProvider>} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/companyprofile" element={<CompanyProfile/>} />
                <Route path="/employeesdirectory" element={<EmployeesDirectory/>} />
                <Route path="/assignroles" element={<AddRoles/>} />
                <Route path="/career&performance" element={<CareerAndPerformance />} />
                <Route path="/expenses" element={<Expenses />} />
            </Routes></> :
            <Routes>
                <Route path="/*" element={<Auth/>} />
            </Routes>
        }
        
    </Router>
  );
};

export default AppRoutes;