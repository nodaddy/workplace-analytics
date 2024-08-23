import { CaretRightOutlined, Loading3QuartersOutlined, NotificationOutlined, ImportOutlined, DownloadOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Alert, Collapse, Spin, Tooltip, List, Tag, message, Popconfirm } from "antd";
import { errorColor, infoColor, silverColor, successColor, white } from "../css";
import Spinner from "./Spinner";
import Toast from "./Toast";

function LeaveListCard({leaveApplications, title, alertType, pendingOrApproved}) {
    return (
      <div style={{fontWeight: 300, border: '0px', backgroundColor: white, borderRadius: '8px'}} >
      <Alert style={{ backgroundColor: silverColor, fontWeight: '500', border: '10px solid white', borderRadius: '8px 8px 0px 0px', padding: '7px 12px', 
    }} message={<><h4 style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',  
          fontWeight: '300',
          margin: '0px'
      }}>{title} &nbsp; 
      {
      <Tooltip title={leaveApplications.reduce((a, b) => a + b.dates?.reduce((c, d) => c + (d.duration === 'fullday' ? 1 : 0.5), 0), 0) + ' Day(s)'}>

      <Tag> {leaveApplications.reduce((a, b) => a + b.dates?.reduce((c, d) => c + (d.duration === 'fullday' ? 1 : 0.5), 0), 0)} Day(s) </Tag>
      </Tooltip>
      }
      </h4>
      </>} 
      type={alertType} showIcon />
      <Collapse
      bordered={false}
      expandIconPosition="end"
      ghost
      size="small"
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      accordion 
      style={{ border: '0px', maxHeight: '200px', overflow: 'auto', overflowX: 'hidden'}}>
        {leaveApplications
          .map((item, index) => (
            <Collapse.Panel
            header={<div>
            &nbsp;&nbsp;
            {`${item.leaveType} - ${item.dates?.reduce((c, d) => c + (d.duration === 'fullday' ? 1 : 0.5), 0)} Day(s)`
            }

            
            </div>} key={index}>
              <div style={{fontSize: '13px'}}>
              <div><strong style={{fontWeight: '500'}}>Leave Type:</strong> {item.leaveType}</div>
              <div style={{
                  whiteSpace: 'wrap',
              }}><strong style={{fontWeight: '500'}}>Dates:</strong> {item.dates.map(date => new Date(date.date).toDateString() + `(${date.duration})`).join(' | ')}</div>
              <div style={{
                  whiteSpace: 'wrap',
              }}><strong style={{fontWeight: '500'}}>Reason:</strong> {item.reason}</div>
              </div>

              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <a href={item.attachment} target="_blank" download={'file'}>
                                    <PaperClipOutlined /> Attachment
                                </a>
              <span>
              <Popconfirm
              onConfirm={() => {
                message.warning('Feature coming soon!')
              }}
              placement="top" title={`Notify manager`}>
      <NotificationOutlined style={{color: infoColor}}  />
  </Popconfirm>
              &nbsp;
              &nbsp;
              &nbsp;
              <Popconfirm
              onConfirm={() => {
                message.warning('Feature coming soon!')
              }}
              placement="top" title={`Withdraw ${item.leaveType}`}>
      <ImportOutlined style={{color: errorColor}}  />
  </Popconfirm>
              </span>
              </div>
              
              {pendingOrApproved === 'pending'  && <div align="right"> 
              </div>}
              {/* Add any other details you want to show here */}
            </Collapse.Panel>
          ))}
      </Collapse>
      {
      leaveApplications.length === 0 && 
      <List
      
      style={{padding: '0px 17px'}}
        dataSource={[]}
        renderItem={(item) => (
          <List.Item>
            {/* Render individual leave details here */}
            <div>Employee: {item.employeeName}</div>
            <div>Leave Type: {item.leaveType}</div>
            {/* ... other details */}
          </List.Item>
        )}
      />
      }
      </div>
     );
}

export default LeaveListCard
;