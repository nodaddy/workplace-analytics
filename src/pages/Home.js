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
  const {tools} = state;
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
        }}>Hi, {currentEmployee?.fullName} &nbsp; </h2>
<br/>
<br/>

<h1 align="center" style={{fontWeight: '500', color: 'silver'}}>Feed - Notices and Announcements</h1>
        {/* <div style={{
            paddingLeft: lateralViewportDistance,
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
        }}>
            {
                tools?.map(tool => {
                    return <Link
                    to={`/${tool.displayName.toLocaleLowerCase().split(" ").join("")}`}
                    style={{
                        textDecoration: 'none',
                        marginBottom: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginRight: '85px',
                        maxWidth: '100px',
                        cursor: 'pointer',
                        color: 'black',
                        fontWeight: '300',
                        fontSize: '14px'
                    }}>
                        <div style={{...appIconStyle, backgroundColor: tool.color}} />
                        {tool.displayName}
                    </Link>
                })
            }
        </div> */}
    </div>
  );
};

export default Home;
