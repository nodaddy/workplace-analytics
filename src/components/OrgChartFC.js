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
        // backgroundColor: silverColor,
        margin: '0px',
        width: '100vw',
        left: '0px',
        position: 'relative',
      }}>
        {
          listOfDirectReports ? <>
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
        <br/> 
        <div style={{ 
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          margin: '0px 30px',
          borderTop: '1px solid ' + 'rgb(230, 230, 230)',
          paddingTop: '40px'
        }}
        >
          {listOfDirectReports.map(direct => {
            return (direct.email !== employee?.managerEmail ? <EmployeeCard employee={direct} highlight={direct.email == employee.email} t={t} /> : null
          )
          })}
        </div>
        </> 
        :
        <Spinner height={'50vh'} text={t('tools.organisationalChart')} />
        }
    </div>
     );
}

export default React.memo(OrgChartFC);