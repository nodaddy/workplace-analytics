import { Drawer, Input, Popover, Tag, message } from "antd";
import OrgChartFC from "../components/OrgChartFC";
import { useContext, useEffect, useState, useTransition } from "react";
import { useAppContext } from "../context/AppContext";
import { getDirectReportsByEmail } from "../services/directReportsService";
import { OrgChartContext, OrgChartProvider } from "../context/OrgChartContext";
import { silverColor} from "../css";
import { t } from "i18next";
import { getEmployeeByEmail } from "../services/employeeService";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import ToolBanner from "../components/ToolBanner";
import { ApartmentOutlined, DeploymentUnitOutlined, EditOutlined, EditTwoTone, PrinterOutlined, PrinterTwoTone, SettingOutlined } from "@ant-design/icons";

function OrgChart() {
    const {state, saveSelectedTool} = useAppContext();
    const [listOfDirectReports, setListOfDirectReports] = useState(null);

    const {orgChartState, setFlyOutForEmployeeInfo, saveSelectedEmployeeWithFullInfo} = useContext(OrgChartContext);

    const [drawerLoadingFor, setDrawerLoadingFor] = useState(null);

    const {
        employeeType,
        jobTitle,
        firstName,
        lastName,
        employeeId, 
        location,
        department,
        email,
        managerEmail,
        directs
    } = orgChartState?.selectedEmployeeWithFullInfo;

    useEffect(() => {
        saveSelectedTool(t('tools.organisationalChart'));

        return () => {
            saveSelectedTool(null);
        }
    }, []);

    useEffect(() => {
        if(state.currentEmployee){
            getDirectReportsByEmail(state.currentEmployee?.managerEmail, state.apiToken).then(res => {
                    setListOfDirectReports(res.data);
            }).catch(()=>{
                console.log("Something went wrong fetching the directs");
                // message.error("Something went wrong fetching the directs");
            })
        }
    }, [state.currentEmployee]);

    const infoLoading = (loadingFor) => {
        setDrawerLoadingFor(loadingFor);
        saveSelectedEmployeeWithFullInfo({
                employeeType: null,
                jobTitle: null,
                firstName: null,
                lastName: null,
                employeeId: null,
                location: null,
                department: null,
                email: null,
                managerEmail: null,
                imageUrl: null
            })
    };

    return ( <div id="orgchartpage">
                <ToolBanner icon={<DeploymentUnitOutlined />} title={t('tools.organisationalChart')} subTitle={'See organisational information'} />
                
                    <div align="right" style={{margin: '0px 83px', cursor: 'pointer'}}>
                    <Popover placement="top" content={
                    <div style={{width: '100px'}}>
                       <span onClick={()=>{
                        message.warning('coming soon');
                       }} style={{cursor: 'pointer'}}> <PrinterTwoTone />&nbsp; Print Chart </span>
                       <br/>
                       <span onClick={()=>{
                        message.warning('coming soon');
                       }} style={{cursor: 'pointer'}}> <EditTwoTone />&nbsp;  Edit Chart </span>

                    </div>
                }>
                      <SettingOutlined size={'large'} />  
                        </Popover>
                    </div>
              
                <OrgChartFC employee={state.currentEmployee} listOfDirectReports={listOfDirectReports} />
                <Drawer placement="right" width={'35%'} style={{padding: '3px'}} onClose={() => {
                    setFlyOutForEmployeeInfo(false);
                }} open={orgChartState.flyOutForEmployeeInfo}>
                    {
                        email ? <div align="center">
                        {orgChartState.selectedEmployeeWithFullInfo?.imageUrl && <img src={orgChartState.selectedEmployeeWithFullInfo?.imageUrl} style={{
                            width: '110px',
                            height: '110px',
                            borderRadius: '50%',
                            marginRight: '10px',
                            border: '5px solid ' + silverColor,
                            backgroundColor: silverColor
                        }}></img>}
                        <br/>
                        <br/>
                        <span style={{fontSize: '22px'}}>{firstName}</span>
                        <br/>
                        <span style={{fontSize: '15px'}}>{jobTitle}</span>

                        <br/>
                        <br/>
                        <br/>
                        <hr/>

                        <div align='left'>
                            <h2 style={{fontWeight: '300'}}>
                                {t('employeeInfo.contactInfo')}
                            </h2>
                            <div style={{display: 'flex', flexDirection: 'column', height: '110px', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                                <span>
                                <b>{t('employeeInfo.workEmail')}</b>
                                <br/>
                                {email}
                                <br/>
                                <br/>
                                </span>
                                
                                <span>
                                <b>{t('employeeInfo.workPhone')}</b>
                                <br/>
                                {'+546 989 99 999'}
                                <br/>
                                <br/>
                                </span>
                                {/* <span>
                                <b>{t('employeeInfo.workAddress')}</b>
                                <br/>
                                {state.company.companyAddress}
                                {location?.streetAddress}
                                <br/>
                                {location?.city}, {location?.state}
                                </span> */}
                            </div>
                        </div>

                        <br/>
                        <br/>
                        <hr/>

                        <div align='left'>
                            <h2 style={{fontWeight: '300'}}>
                                {t('employeeInfo.managersAndDirects')}
                            </h2>
                            <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                                <span>
                                <b>{t('description.manager')}</b>
                                <br/>
                                <Tag style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} key={managerEmail} onClick={() => {
                                                
                                                infoLoading(managerEmail.split('@')[0]);
                                                getEmployeeByEmail(managerEmail, state.apiToken).then(res => {
                                                        getDirectReportsByEmail(res.data?.email, state.apiToken).then(res2 => {
                                                                saveSelectedEmployeeWithFullInfo({...res.data, directs: res2.data});
                                                        }).catch((err)=>{
                                                            saveSelectedEmployeeWithFullInfo({...res.data});
                                                        })
                                                }).catch((err) => {
                                                    message.error(err.message);
                                                })
                                            }}>
                                                {managerEmail}
                                            </Tag>  
                                <br/>
                                <br/>
                                </span>
                                
                                <span>
                                
                                {directs && directs.length > 0 ? <>
                                    <b>{t('employeeInfo.directs')}</b>
                                    <br/>
                                    {
                                        directs.map((direct) => {
                                            return (direct.email != email && <>
                                            <Tag style={{marginRight: '5px', marginTop: '5px', cursor: 'pointer'}} title={direct.email} key={direct.email} onClick={() => {
                                                infoLoading(direct.fullName);
                                                getEmployeeByEmail(direct?.email, state.apiToken).then(res => {
                                                        getDirectReportsByEmail(res.data?.email, state.apiToken).then(res2 => {
                                                                saveSelectedEmployeeWithFullInfo({...res.data, directs: res2.data});
                                                        }).catch((err)=>{
                                                            saveSelectedEmployeeWithFullInfo({...res.data});
                                                        })
                                                }).catch((err) => {
                                                    message.error(err.message);
                                                })
                                            }}>
                                                {direct.firstName} {direct.lastName}
                                            </Tag>  
                                            </>)
                                        })
                                    }
                                </>: null}
                                <br/>
                                <br/>
                                </span>
                            </div>
                        </div>

                    </div>
                    :
                    <Spinner height={'50vh'} text={drawerLoadingFor}/>
                    }       
                </Drawer>
<br/>
<br/>
            </div> );
}

export default OrgChart;
