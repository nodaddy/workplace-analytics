import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import EmployeeCard from "./EmployeeCard";
import Spinner from "./Spinner";
import { silverColor } from "../css";

function OrgChartFC(props) {
    const { employee, listOfDirectReports } = props;
    const { t } = useTranslation();

    return ( 
      <div 
      style={{
        backgroundColor: silverColor,
        margin: 'auto',
        width: '85vw',
        minHeight: '90vh',
        position: 'absolute',
        right: '0px'
      }}>
        {
          listOfDirectReports ? <>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        {employee &&  <div
        style={{ display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'}}
        >
          {/* <h2 style={{fontWeight: '300'}}>{employee.fullName.split(" ")} reports to <br/>
           {listOfDirectReports.find(x => x.email == employee.managerEmail).fullName}</h2> */}
          <EmployeeCard employee={listOfDirectReports?.find(x => x.email == employee.managerEmail)} manager={true} t={t} />
        </div> } 
        <hr/>
        <br/> 
        <div style={{ 
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '0px 30px'
        }}
        >
          {listOfDirectReports.map(direct => {
            return (direct.email !== employee?.managerEmail ? <EmployeeCard employee={direct} highlight={direct.email == employee.email} t={t} /> : null
          )
          })}
        </div>
        </> 
        :
        <Spinner text={t('tools.organisationalChart')} />
        }
    </div>
     );
}

export default React.memo(OrgChartFC);