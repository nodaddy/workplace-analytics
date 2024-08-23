import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Col, Row, Select, Spin , message} from 'antd';
import { white } from '../css';
import { update } from 'firebase/database';
import { updateMultipleEmployeesWithSameData } from '../services/employeeService';
import { useAppContext } from '../context/AppContext';
import Toast from '../components/Toast';
import { LoadingOutlined } from '@ant-design/icons';
import { t } from 'i18next';

const EmployeeSearchForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState(['editor', 'analyst']); // Replace with your role data

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" style={{
        width: '60%',
        margin: 'auto',
        backgroundColor: white,
        padding: '45px 60px',
        borderRadius: '5px'
    }} onFinish={onFinish}>
      <h1 style={{margin: '0px', fontWeight: '500', color: 'grey'}}>Assign Editor Role</h1>
      <span>Kindly provide a comma seperated list of employee emails and the role you want to assign to them</span>
      <br/>
      <br/>
      <br/>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="List of Employee Emails" name="employeeEmails" rules={[{ required: true, message: 'Comma seperated list of employee emails' }]}>
            <Input disabled={loading} placeholder='Comma,seperated,list' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Role" name="role">
            <Select disabled={loading} placeholder="Select role">
              {roles.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {loading ? <Spin indicator={<LoadingOutlined style={{color:white}} spin />} />: 'Assign Roles'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

function AddRoles() {
  const {state} = useAppContext();
  const [assignRolesRequestLoading, setAssignRolesRequestLoading] = useState(false);
  const { saveSelectedTool} = useAppContext();

    useEffect(() => {
      saveSelectedTool(t('Assign Roles'));
    }, []);
    const onSubmit = (values) => {
      setAssignRolesRequestLoading(true);
      updateMultipleEmployeesWithSameData(!values.employeeEmails.includes(',') ? [values.employeeEmails.trim()] : values.employeeEmails.split(','), {roles: state.currentEmployee?.roles ? [...state.currentEmployee?.roles, values.role] : [values.role]}, state.apiToken).then(res => {
        if(res.status === 200){
          message.success('Roles assigned successfully');
          setAssignRolesRequestLoading(false);
        } else {
          message.error('Something went wrong');
          setAssignRolesRequestLoading(false);
        }
      }).catch(err => {
        message.error('Something went wrong');
        setAssignRolesRequestLoading(false);
      })
    }
    return (<div
    style={{marginTop: '35px'}}>
         <EmployeeSearchForm loading={assignRolesRequestLoading} onSubmit={onSubmit}/>
    </div> );
}

export default AddRoles;