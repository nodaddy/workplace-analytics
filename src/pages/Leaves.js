import { t } from "i18next";
import { bannerColor, errorColor, infoColor, leavesBannerColor, successColor, white } from "../css";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import ToolBanner from "../components/ToolBanner";
import { Alert, Card, Collapse, List, Spin, Tabs, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { getLeaveApplications } from "../services/leaveService";
import { useAppContext } from "../context/AppContext";
import Toast from "../components/Toast";
import { CaretRightOutlined, CheckCircleOutlined, CheckCircleTwoTone, CloseCircleOutlined, CompassOutlined, ImportOutlined, Loading3QuartersOutlined, LoadingOutlined, NotificationOutlined, WarningOutlined, WarningTwoTone } from "@ant-design/icons";
import LeaveListCard from "../components/LeaveListCard";
import Spinner from "../components/Spinner";

function Leaves() {

    const {state, saveSelectedTool} = useAppContext();

    const [loadingLeaveApplications, setLoadingLeaveApplications] = useState(true);
    const [leaveApplications, setLeaveApplications] = useState([]);


    const reloadApplications = () => {
        setLoadingLeaveApplications(true);
        getLeaveApplications(state.apiToken).then(res => {
            setLeaveApplications(res.data);
            setLoadingLeaveApplications(false);
        }).catch(() => {
            console.log("Something went wrong while fetching leave applications");
            setLoadingLeaveApplications(false);
        })
    }

    
    useEffect(() => {
        saveSelectedTool('Leaves');
        getLeaveApplications(state.apiToken).then(res => {
            setLeaveApplications(res.data);
            setLoadingLeaveApplications(false);
        }).catch(() => {
            console.log("Something went wrong while fetching leave applications");
            setLoadingLeaveApplications(false);
        })

        return () => {
            saveSelectedTool(null);
        }
    }, [])
    
    return ( <>
    {/* banner with background on the top with info about organisation chart */}
    <ToolBanner icon={<CompassOutlined />} title={t('tools.leaves')} subTitle={t('Manage your leaves')} />
    <div style={{display: 'flex', justifyContent: 'space-around'}}>


    
    {loadingLeaveApplications ? <div style={{width: '38%', display: 'flex', justifyContent: 'center', position: 'relative'}}><Spinner text={t('Leaves')} /></div> : 
    <div style={{width: '38%'}}>
        <Tabs
                label="faf"
                id="career-and-performance-tabs"
                defaultActiveKey="1"
                items={[
                {
                    label: 'Pending',
                    key: '1',
                    icon: <WarningOutlined style={{color: 'orange'}} />,
                    children: <LeaveListCard leaveApplications={leaveApplications?.filter((application => application.status === 0))} title={'Pending for Approval'} alertType={'warning'} pendingOrApproved={'pending'} />
                },
                {
                    label: 'Approved',
                    key: '2',
                    icon: <CheckCircleOutlined style={{color: successColor}} />, 
                    children: <LeaveListCard leaveApplications={leaveApplications?.filter((application => application.status === 1))} title={'Approved Leaves'} alertType={'success'} pendingOrApproved={'approved'}/>
                },
                {
                    label: <span style={{color: 'grey'}}>Rejected</span>,
                    key: '3',
                    icon: <CloseCircleOutlined style={{color: errorColor}}/>,
                    children: <LeaveListCard leaveApplications={leaveApplications?.filter((application => application.status === -1))} title={'Rejected Leave Applications'} alertType={'error'} pendingOrApproved={'rejected'}/>

                }
                // {
                //     label: 'Feedbacks',
                //     key: '3',
                //     children: 'Coming soon'
                // }
                ]}
                />
    <br/>
    </div>
    }
    <ApplyLeaveForm reloadApplications={reloadApplications}/>

    </div>
    <br/>
    <br/>
    </> );
}

export default Leaves;