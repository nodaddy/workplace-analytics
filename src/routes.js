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
import EmployeeProfile from './pages/EmployeeProfile';
import LandingPage from './pages/LandingPage';
import Requests from './pages/Requests';

const AppRoutes = () => {

   const {state} = useAppContext();
   const { apiToken, tools } = state;

   const displayOrientation = () => {
    if(window.innerWidth < 768){
        return "vertical";
    } else {
        return "horizontal";
    }
   }

   // apply lazy loading for mobile pages and desktop pages etc.
  
    return (displayOrientation() === "vertical" ?
    <>
        <Router basename='/'>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>

        <Router basename='/hris'>
        {
            apiToken ? <>
            <Navigationbar />
            
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<div style={{color: 'black'}}>About</div>} />
                <Route path="/organisationalchart" element={<OrgChartProvider><OrgChart/></OrgChartProvider>} />
                <Route path="/profile/:id" element={<EmployeeProfile />} />
                <Route path="/requests" element={<Requests />} />
            </Routes>
            </> 
            :
            <Routes basename='/hris'>
                <Route path="/*" element={<Auth/>} />
            </Routes>
        }
        
    </Router>
    </>
    :
    <>
    <Router basename='/hris'>
        {
            apiToken ? <>
            <Navigationbar />
            <SideBar />
            
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<div style={{color: 'black'}}>About</div>} />
                <Route path="/organisationalchart" element={<OrgChartProvider><OrgChart/></OrgChartProvider>} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/companyprofile" element={<CompanyProfile/>} />
                <Route path="/employeesdirectory" element={<EmployeesDirectory/>} />
                <Route path="/assignroles" element={<AddRoles/>} />
                <Route path="/career&performance" element={<CareerAndPerformance />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/profile/:id" element={<EmployeeProfile />} />
                <Route path="/requests" element={<Requests />} />
            </Routes>
            </> 
            :
            <Routes basename='/hris'>
                <Route path="/*" element={<Auth/>} />
            </Routes>
        }
        
    </Router>
    

    <Router basename='/'>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
    </Router>
    </>
  );
};

export default AppRoutes;