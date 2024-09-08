// src/components/Header.js
import React, { useContext, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { primaryTextColor } from '../css';
import { Avatar, Card, Col, Row } from 'antd';
import Title from 'antd/es/skeleton/Title';

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

  const employee = currentEmployee;

  useEffect(() => {
    saveSelectedTool(null);
  }, []);

  return (
    <div 
    style={{
      padding: '0px 20px'
    }}>

{ employee && <Card
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #e6f7ff, #ffffff)',
      }}
    >
      <Row align="middle">
        {/* Employee Photo */}
        <Col span={24} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: primaryTextColor}}>
          <Avatar
            size={96}
            src={employee?.imageUrl}
            style={{
              border: '2px solid #1890ff',
              backgroundColor: '#f0f0f0',
              borderRadius: '50%'
            }}
          />
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        {/* Employee Details */}
        <span>
        <h1 type="secondary" style={{ fontWeight: '300', margin: '0px' }}>
            {employee?.firstName + " " + employee?.lastName}
          </h1>
          <span type="secondary" style={{ fontSize: '16px' }}>
            {employee?.jobTitle}
          </span>
          </span>
        </Col>
      </Row>
    </Card>}
<br/>
<br/>

<h1 align="center" style={{fontWeight: '500', color: 'silver'}}>Feed - Notices and Announcements</h1>
       
    </div>
  );
};

export default Home;
