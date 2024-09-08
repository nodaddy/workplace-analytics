import { Alert, Avatar, Card, Tooltip, message } from "antd";
import { greyOnWhiteColor, iconColor, infoColor, nonAntTagColor, silverColor, tagColor, white } from "../css";
import { MailFilled, MailOutlined, PhoneOutlined, ProjectOutlined, TeamOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { OrgChartContext } from "../context/OrgChartContext";
import { getEmployeeByEmail } from "../services/employeeService";
import { useAppContext } from "../context/AppContext";
import { getDirectReportsByEmail } from "../services/directReportsService";
import Toast from "./Toast";

function EmployeeCard({employee, manager, t}) {
    const iconStyle = {
        color: iconColor
    }

    const overflowCSS = {maxWidth: '220px', textWrap: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis', display: 'inline-block'}
    const {state} = useAppContext();
    const {saveSelectedEmployeeWithFullInfo, setFlyOutForEmployeeInfo} = useContext(OrgChartContext);

    const onClick = () => {
        setFlyOutForEmployeeInfo(true);
        saveSelectedEmployeeWithFullInfo({});
        getEmployeeByEmail(employee?.email, state.apiToken).then(res => {
            if(state.currentEmployee){
                getDirectReportsByEmail(res.data?.email, state.apiToken).then(res2 => {
                        saveSelectedEmployeeWithFullInfo({...res.data, directs: res2.data});
                }).catch(()=>{
                    saveSelectedEmployeeWithFullInfo({...res.data});
                })
            }
        }).catch((err) => {
            message.error(err.message);
        })
    }
    return   <Tooltip title={employee?.email}>
    <Card
            className="employee-card"
            size="small"
            onClick={onClick}
            style={{
              zIndex: '99',
              width: '260px',
              display: 'flex',
              alignItems: 'flex-start',
              marginRight: '20px',
              cursor: 'pointer',
              paddingLeft: '10px',
              marginBottom: '20px',
              boxShadow: '0px',
              borderColor: greyOnWhiteColor,
            }}>
                
              <div
              style={{
                display: 'flex',
                justifyContent: 'space-around'
              }}
              >
                <span style={{}}>
                   <Avatar
                   src={employee.imageUrl}
        style={{
          backgroundColor: silverColor,
          color: 'grey',
          marginRight: '10px',
          width: '36px',
          height: '36px',
        }}
      >

        { !employee.imageUrl && employee?.firstName.charAt(0) + employee?.lastName.charAt(0)}
      </Avatar>
      <br/>

      {employee.email == state.currentEmployee.email ? <>
      {/* <span style={{fontSize: '11px', padding: '3px 8px', background: infoColor, color: white, borderRadius: '999px', marginBottom: '20px'}}>{t('You')}</span> */}
      <Alert style={{padding: '1px 5px', fontSize: '12px', display:'inline-block', marginTop: '5px'}} message={t('You')} type="info" />
      <br/></> : null}

</span>

              <span>
                <span style={{fontSize: '15px', ...overflowCSS}}>{employee?.firstName + " " + employee?.lastName} 
                {manager ? <>
              <Alert style={{padding: '1px 10px', fontSize: '12px'}} message={t('description.manager')} type="warning" />
              {/* <span style={{fontSize: '11px', padding: '3px 8px', background: infoColor, color: white, borderRadius: '999px', marginBottom: '20px'}}>{t('description.manager')}
              </span> */}</> : null}
                </span>
                <br/>
               
                  <span style={{fontSize: '12px', ...overflowCSS}}><ProjectOutlined style={iconStyle}/> {employee?.jobTitle}</span>
                 
                
                {/* <span style={{fontSize: '12px', color: 'grey', ...overflowCSS}}><MailOutlined style={iconStyle}/> {employee?.email }</span>                 */}
                {/* {manager ? <><br/><MailOutlined style={{...iconStyle, marginBottom: '12px'}} /> <span style={{fontSize: '12px'}}>{employee?.email }</span></> : null} */}
              
              </span>
              </div>
            </Card>
            </Tooltip>
}

export default EmployeeCard;