import React, { useContext } from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { useAppContext } from './context/AppContext';
import Navigationbar from './components/NavigationBar';
import OrgChart from './pages/OrgChart';
import { OrgChartProvider } from './context/OrgChartContext';
import BackButton from './components/BackButton';
import SideBar from './components/SideBar';

const AppRoutes = () => {

   const {state} = useAppContext();
   const { apiToken, user } = state;
  
    return (
    <Router>
        {
            apiToken ? <>
            <SideBar />
            <Navigationbar />
            <br/>
            <br/>
            <br/>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/about" element={<div style={{color: 'black'}}>About</div>} />
                <Route path="/organisationalchart" element={<OrgChartProvider><OrgChart/></OrgChartProvider>} />
            </Routes></> :
            <Routes>
                <Route path="/*" element={<Auth/>} />
            </Routes>
        }
        
    </Router>
  );
};

export default AppRoutes;