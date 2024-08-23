// src/components/Header.js
import React, { useContext, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Home = () => {

  const appIconStyle = {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    marginBottom: '12px'
  }

  const { state, saveSelectedTool } = useAppContext();
  const {isAdmin} = state;
  const { currentEmployee } = state;

  useEffect(() => {
    saveSelectedTool(null);
  }, []);

  return (
    <div 
    style={{
      padding: '20px'
    }}>
        <h2 style={{
            textAlign: 'right',
            borderRadius: '5px',
            fontWeight: '300',
        }}>Hi, {currentEmployee?.firstName} &nbsp; </h2>
<br/>
<br/>

<h1 align="center" style={{fontWeight: '500', color: 'silver'}}>Feed - Notices and Announcements</h1>
       
    </div>
  );
};

export default Home;
