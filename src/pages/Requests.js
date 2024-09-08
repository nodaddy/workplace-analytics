import { Alert, Button, Table, Tabs, Tag } from "antd";
import { useAppContext } from "../context/AppContext";
import LeaveListCard from "../components/LeaveListCard";
import { CheckCircleFilled, CheckCircleOutlined, CompassFilled, CompassOutlined, DownloadOutlined, FileDoneOutlined, WarningOutlined } from "@ant-design/icons";
import ToolBanner from "../components/ToolBanner";
import { useEffect, useState } from "react";
import { errorColor, greyOnWhiteColor, infoColor, primaryBorderRadius, silverColor, successColor } from "../css";

function Requests() {
    const {state} = useAppContext();

    const [expensesForTable, setExpensesForTable] = useState(state.requestsForManager?.filter((application => application.type === "expense")).map(exp => (
        {
            createdBy: exp.employeeName,
            key: exp.employeeId,
            date: new Date(exp.expenseDate).toDateString(),
            amount: exp.currency + " " + exp.amount,
            category: exp.category,
            description: exp.description,
            status: exp.status,
            attachment: <a style={{color: infoColor}} href={exp.attachment} target="_blank" download={'file.jpeg'}>
                            <DownloadOutlined /> &nbsp; Download
                        </a>,
            actions:  <span>
            <Button style={{color: successColor}}>Accept</Button>
            &nbsp;
            &nbsp;
            <Button style={{color: errorColor}}>Reject</Button>
            </span>
                    
        }
    )));

    useEffect(() => {
        setExpensesForTable(state.requestsForManager?.filter((application => application.type === "expense")).map(exp => (
            {
                createdBy: exp.employeeName,
                key: exp.employeeId,
                date: new Date(exp.expenseDate).toDateString(),
                amount: exp.currency + " " + exp.amount,
                category: exp.category,
                description: exp.description,
                status: exp.status,
                attachment: <a style={{color: infoColor}} href={exp.attachment} target="_blank" download={'file.jpeg'}>
                                <DownloadOutlined /> &nbsp; Download
                            </a>,
                actions:  <span>
                <Button style={{color: successColor}}>Accept</Button>
                &nbsp;
                &nbsp;
                <Button style={{color: errorColor}}>Reject</Button>
                </span>
            }
        )))
    }, [state.requestsForManager])

    const columns = [
        {
            title: ' Created_By ',
            dataIndex: 'createdBy',
            key: 'createdBy',
          },
        {
          title: ' Date ',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: ' Amount ',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: ' Category ',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: ' Description ',
          dataIndex: 'description',
          key: 'description',
        },
        {
            title: ' Attachment ',
            dataIndex: 'attachment',
            key: 'attachment',
        },
        {
            title: ' Actions ',
            dataIndex: 'actions',
            key: 'actions',
        }
      ];

    return ( 
        <>
            <ToolBanner icon={<CheckCircleOutlined />} title={'Requests'} subTitle={'Approve or Reject Requests'} />
            <Tabs
                    label=""
                    id="requests-tabs"
                    defaultActiveKey="1"
                    style={{margin: '20px'}}
                    items={[
                    {
                        label: 'Leaves',
                        key: '1',
                        icon: <CompassOutlined />,
                        children: <LeaveListCard forManager={true} leaveApplications={state.requestsForManager?.filter((application => application.type === "leave"))} title={'Pending for Approval'} alertType={'warning'} pendingOrApproved={'pending'} />
                    },
                    {
                        label: 'Expenses',
                        key: '2',
                        icon: <FileDoneOutlined />,
                        children: <div style={{border: '1px solid ' + greyOnWhiteColor, borderRadius: primaryBorderRadius, overflow: 'auto'}}>
                        <Alert style={{ width: '100%', background: `linear-gradient(to right, ${silverColor}, white)`, color: `silverColor`, fontWeight: '500', border: '10px solid white', borderRadius: '8px 8px 0px 0px', padding: '7px 12px', 
    }} message={<><h4 style={{
        width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',  
          fontWeight: '300',
          margin: '0px'
      }}>Pending for Approval &nbsp;</h4></>} type="warning" showIcon />
                        <Table size="small" columns={columns} pagination={false} dataSource={expensesForTable} style={{margin: '10px'}} />
                        </div>
                    },
                    // {
                    //     label: 'Feedbacks',
                    //     key: '3',
                    //     children: 'Coming soon'
                    // }
                    ]}
                />
        </>
     );
}

export default Requests;