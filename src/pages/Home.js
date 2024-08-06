// src/components/Header.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { sendSignInEmail } from '../firebase/email_password_auth';
import { lateralViewportDistance, silverColor } from '../css';
import { Link } from 'react-router-dom';

const Home = () => {

  const appIconStyle = {
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    marginBottom: '12px'
  }

  const [tools, setTools] = useState([
    {
        displayName: 'Organisational Chart',
        color: 'orange'
    },
    {
        displayName: 'Leaves',
        color: '#4285F4'
    },
    {
        displayName: 'My Career',
        color: '#F4B400'
    },
    {
        displayName: 'Expenses',
        color: 'skyblue'
    },
    {
        displayName: 'Support Case',
        color: '#DB4437'
    }
  ])

  const { state } = useContext(AppContext);
  const { user } = state;
  return (
    <div>
        {JSON.stringify(state?.apiToken)}
        <h2 style={{
            textAlign: 'left',
            padding: `20px ${lateralViewportDistance}`,
            borderRadius: '5px',
            backgroundColor: silverColor,
            margin: '0px',
            fontWeight: '300'
        }}>Hi, {user?.email.split("@")[0]}</h2>
        <div style={{
            padding: lateralViewportDistance,
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
        </div>
    </div>
  );
};

export default Home;
