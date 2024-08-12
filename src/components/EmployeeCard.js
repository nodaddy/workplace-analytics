import { Card, Tooltip } from "antd";
import { iconColor, nonAntTagColor, silverColor, tagColor, white } from "../css";
import { MailOutlined, PhoneOutlined, ProjectOutlined, TeamOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { OrgChartContext } from "../context/OrgChartContext";
import { getEmployeeByEmail } from "../services/employeeService";
import { useAppContext } from "../context/AppContext";
import { getDirectReportsByEmail } from "../services/directReportsService";
import Toast from "./Toast";

function EmployeeCard({employee, highlight, manager, t}) {
    const iconStyle = {
        color: iconColor
    }

    const overflowCSS = {maxWidth: '220px', textWrap: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis', display: 'inline-block'}
    const {state} = useAppContext();
    const {saveSelectedEmployeeWithFullInfo, setFlyOutForEmployeeInfo} = useContext(OrgChartContext);

    const onClick = () => {
        setFlyOutForEmployeeInfo(true);
        saveSelectedEmployeeWithFullInfo({
          employeeType: null,
          jpbTitle: null,
          fullName: null,
          employeeId: null,
          location: null,
          department: null,
          email: null,
          managerEmail: null
      });
        getEmployeeByEmail(employee?.email, state.apiToken).then(res => {
            if(state.currentEmployee){
                getDirectReportsByEmail(res.data?.email, state.apiToken).then(res2 => {
                        saveSelectedEmployeeWithFullInfo({...res.data, directs: res2.data});
                }).catch(()=>{
                    saveSelectedEmployeeWithFullInfo({...res.data});
                })
            }
        }).catch((err) => {
            Toast.error(err);
        })
    }
    return   <Tooltip title={employee?.email}>
    <Card
            className="employee-card"
            size="small"
            onClick={onClick}
            style={{
              width: '300px',
              display: 'flex',
              alignItems: 'flex-start',
              marginRight: '20px',
              cursor: 'pointer',
              paddingLeft:'10px',
              marginBottom: '20px',
              boxShadow: '0px'
            }}>
                
              <div
              style={{
                display: 'flex',
                justifyContent: 'space-around'
              }}
              >
                {/* <img src="https://picsum.photos/seed/picsum/200/300" style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                marginRight: '10px'
              }}></img> */}
              <span>
              {manager ? <><span style={{fontSize: '11px', padding: '3px 8px', background: nonAntTagColor, color: white, borderRadius: '999px', marginBottom: '20px'}}>{t('description.manager')}</span><br/></> : null}

                <span style={{fontSize: '18px', ...overflowCSS}}>{employee?.fullName}</span>
                <br/>
               
                  <span style={{fontSize: '12px', ...overflowCSS}}><ProjectOutlined style={iconStyle}/> {employee?.jobTitle}</span>
                 
                <br/>
                <span style={{fontSize: '12px', color: 'grey', ...overflowCSS}}><TeamOutlined style={iconStyle}/> {employee?.department }</span>                
                {/* {manager ? <><br/><MailOutlined style={iconStyle} /> <span style={{fontSize: '12px'}}>{employee?.email }</span></> : null} */}
              
              </span>
              </div>
            </Card>
            </Tooltip>
}

export default EmployeeCard;