import { Drawer, Input, Tag } from "antd";
import OrgChartFC from "../components/OrgChartFC";
import { useContext, useEffect, useState, useTransition } from "react";
import { useAppContext } from "../context/AppContext";
import { getDirectReportsByEmail } from "../services/directReportsService";
import { OrgChartContext, OrgChartProvider } from "../context/OrgChartContext";
import { silverColor } from "../css";
import { t } from "i18next";
import { getEmployeeByEmail } from "../services/employeeService";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";

function OrgChart() {
    const {state, saveSelectedTool} = useAppContext();
    const [listOfDirectReports, setListOfDirectReports] = useState(null);

    const {orgChartState, setFlyOutForEmployeeInfo, saveSelectedEmployeeWithFullInfo} = useContext(OrgChartContext);

    const [drawerLoadingFor, setDrawerLoadingFor] = useState(null);

    const {
        employeeType,
        jobTitle,
        fullName,
        employeeId, 
        location,
        department,
        email,
        managerEmail,
        directs
    } = orgChartState?.selectedEmployeeWithFullInfo;

    useEffect(() => {
        saveSelectedTool(t('tools.organisationalChart'));
    }, []);

    useEffect(() => {
        if(state.currentEmployee){
            getDirectReportsByEmail(state.currentEmployee?.managerEmail, state.apiToken).then(res => {
                    setListOfDirectReports(res.data);
            }).catch(()=>{
                Toast.error("Something went wrong fetching the directs");
            })
        }
    }, [state.currentEmployee]);

    const infoLoading = (loadingFor) => {
        setDrawerLoadingFor(loadingFor);
        saveSelectedEmployeeWithFullInfo({
                employeeType: null,
                jpbTitle: null,
                fullName: null,
                employeeId: null,
                location: null,
                department: null,
                email: null,
                managerEmail: null
            })
    };

    return ( <>
                <OrgChartFC employee={state.currentEmployee} listOfDirectReports={listOfDirectReports} />
                <Drawer width={'40%'} style={{padding: '3px'}} onClose={() => {
                    setFlyOutForEmployeeInfo(false);
                }} open={orgChartState.flyOutForEmployeeInfo}>
                    {
                        email ? <div align="center">
                        <img src="https://picsum.photos/seed/picsum/200/300" style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            marginRight: '10px',
                            border: '5px solid ' + silverColor
                        }}></img>
                        <br/>
                        <br/>
                        <span style={{fontSize: '22px'}}>{fullName}</span>
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
                                <span>
                                <b>{t('employeeInfo.workAddress')}</b>
                                <br/>
                                {location?.streetAddress}
                                <br/>
                                {location?.city}, {location?.state}
                                </span>
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
                                                    Toast.error(err);
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
                                                    Toast.error(err);
                                                })
                                            }}>
                                                {direct.fullName}
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
                    <Spinner text={drawerLoadingFor}/>
                    }       
                </Drawer>

            </> );
}

export default OrgChart;
