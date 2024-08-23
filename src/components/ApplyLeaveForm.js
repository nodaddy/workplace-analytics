import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Row, Col, Spin, Alert , message, Upload} from 'antd';
import { silverColor, white } from '../css';
import { t } from 'i18next';
import { postLeaveApplication } from '../services/leaveService';
import Toast from './Toast';
import { useAppContext } from '../context/AppContext';
import { EditFilled, EditOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadFileToFirebaseStorage } from '../firebase/storage';
import { leavesFolderInStorage } from '../Constants';
const { Option } = Select;

const ApplyLeaveForm = ({reloadApplications}) => {
  const [form] = Form.useForm();

  const {state}  = useAppContext();

  const [datesSelected, setDatesSelected] = useState([]);

  const [leaveApplicationResponseLoading, setLeaveApplicationResponseLoading] = useState(false);

  const [dayOptions, setDayOptions] = useState([
    {
        value: 'fullday',
        label: 'Full Day',
    },
    {
        value: 'halfday',
        label: 'Half Day',
    },
  ]);

  const leaveTypes = [
    'Annual Leave/Privilege Leave',
    'Casual Leave',
    'Sick Leave',
    'Maternity Leave',
    'Paternity Leave',
    'Bereavement Leave',
    'Loss of Pay Leave',
    'Sabbatical Leave',
    'Adoption Leave',
    'Parental Leave'
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div style={{width: '47%', height: '100%'}}>
    <Alert icon={leaveApplicationResponseLoading ? <LoadingOutlined /> : <EditOutlined />} style={{ backgroundColor: silverColor, fontWeight: '500', border: '10px solid white', borderRadius: '8px 8px 0px 0px', padding: '7px 12px', 
    }} message={<h4 style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',  
            fontWeight: '300',
            margin: '0px'
        }}>Apply Leave</h4>} 
      type={'info'} showIcon />
    <Form
      disabled={leaveApplicationResponseLoading}
      style={{ padding: '20px 20px', backgroundColor: white, borderRadius: '0px 0px 8px 8px', height: '100%' }}
      form={form}
      layout="vertical" // Adjust layout as needed
      initialValues={{ remember: true }}
      onFinish={async (e) => {
        setLeaveApplicationResponseLoading(true);
        const datesAndDuration = datesSelected.map((date, index) => {
            return {date: date.$d.toString(), duration: e[Object.keys(e).find(x => x.includes(`dayType-${index}`))]}
        })

        let attachmentUrl = null;

        const attachmentName = e.attachment[0].originFileObj.name + state.currentEmployee.id + Date.now();

        await uploadFileToFirebaseStorage(e.attachment[0].originFileObj, leavesFolderInStorage, attachmentName).then((res) => {
            attachmentUrl = res.url;
        }).catch((error) => {
            console.log(error);
            message.error(error.message);
        })

        const leavePayload = {
            leaveType: e.leaveType,
            datesAndDuration: datesAndDuration,
            reason: e.reason,
            attachment: attachmentUrl
        }
        postLeaveApplication(leavePayload, state.apiToken).then((res) => {
            if(res.status === 200) {
                setLeaveApplicationResponseLoading(false);
                message.success('Leave applied successfully');
                // reset form
                form.resetFields();
                setDatesSelected([]);
                reloadApplications();
            }
        }).catch((err) => {
            message.error('Something went wrong');
            setLeaveApplicationResponseLoading(false);
        })
      }}
      autoComplete="off"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Type of Leave"
            name="leaveType"
            rules={[
              {
                required: true,
                message: 'Please select leave type',
              },
            ]}
          >
            <Select placeholder="Select a leave type">
            {leaveTypes?.map((leaveType, index) => (
        <Option key={index} value={leaveType}>
          {leaveType}
        </Option>
      ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
      <Col span={24}>
          <Form.Item
            label="Select Dates (You can select multiple dates)"
            name="dates"
            rules={[
              {
                required: true,
                message: 'Please select start date',
              },
            ]}
          >
            <DatePicker multiple onChange={(e) => {
                setDatesSelected(form.getFieldValue('dates'));
            }} maxTagCount="responsive" defaultValue={null} />
          </Form.Item>
        </Col>
      </Row>

      {datesSelected?.map((date, index) => (
        <Row label="fs" key={index} style={{ padding: '5px 20px', backgroundColor: silverColor}}>
          <Col span={12} style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            {date.format('YYYY-MM-DD')} | {date.$d.toString().split(' ')[0]}
          </Col>
          <Col span={12} align="right">
            <Form.Item
              defaultValue="fullday"
              name={`dayType-${index}`}
              initialValue={dayOptions[0].value}
              style={{margin: '0px'}}
            >
              <Select placeholder="Select day type" size='small' style={{margin: '5px', maxWidth: '150px'}} align="left">
                {dayOptions.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ))}
      {datesSelected && datesSelected.length > 0 && <br/>}

      <Row>
      <Col span={24}>
          <Form.Item
            label="Reason/Description"
            name="reason"
            rules={[
              {
                required: true,
                message: 'Please select start date',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Attachment"
        name="attachment"
        valuePropName="attachment"
        getValueFromEvent={normFile}
        rules={[{ required: true, message: 'Please upload the receipt' }]}
      >
        <Upload name="attachment" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
<br/>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          { leaveApplicationResponseLoading ? <Spin indicator={<LoadingOutlined />} size="small" spinning /> : 'Submit' }
        </Button>
      </Form.Item>
    </Form>
    <Button
        style={{position: 'absolute', marginTop: '-80px', marginLeft: '110px'}}
        type="secondary" onClick={(e) => {
            e.preventDefault();
            console.log('sss');
            setLeaveApplicationResponseLoading(false);
            form.resetFields();
            setDatesSelected([]);}}>
          Cancel
        </Button>
    </div>
  );
};

export default ApplyLeaveForm;