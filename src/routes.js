import React, { useContext } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { AppContext } from './context/AppContext';
import Navigationbar from './components/NavigationBar';
import OrgChart from './pages/OrgChart';

const AppRoutes = () => {
    const {state} = useContext(AppContext);
    const { apiToken, user } = state;
  return (
    <Router>
        <Navigationbar />
        {
            apiToken ? <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="/about" element={<div style={{color: 'black'}}>About</div>} />
                <Route path="/organisationalchart" element={<OrgChart/>} />
            </Routes> :
            <Routes>
                <Route path="/*" element={<Auth/>} />
            </Routes>
        }
        
    </Router>
  );
};

export default AppRoutes;