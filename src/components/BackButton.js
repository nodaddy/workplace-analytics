import { AppstoreOutlined, ArrowDownOutlined, BackwardFilled, DownCircleFilled, HomeFilled, RollbackOutlined, StepBackwardOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  const location = useLocation();
  const isExcludedRoute = location.pathname === '/';

  return ( !isExcludedRoute ?
    <div align="center"
    style={{cursor: 'pointer'}}
    onClick={() => navigate(-1)}
    >
      
      <RollbackOutlined style={{fontSize: '30px'}} />
    <br/>
    <span style={{fontSize:'12px'}}>Back</span>
    </div>
    :
    <div align="center"
    >
      <AppstoreOutlined style={{fontSize: '30px'}} />
    <br/>
    <span style={{fontSize:'12px'}}>{t('description.apps')} <ArrowDownOutlined /> </span>
    </div>
  );
}

export default BackButton;