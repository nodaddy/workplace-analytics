import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Select, Alert, Spin, Result, DatePicker , message} from 'antd';
import { white } from '../css';
import { getCompanyByCreatedBy, postCompany } from '../services/companyService';
import { useAppContext } from '../context/AppContext';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';
import { t } from 'i18next';


const disabledInputStyle = {border: '0px', padding: '0px', color: 'grey'}

const CompanyForm = ({ onSubmit, company }) => {
  const [form] = Form.useForm();
  const [companyExisting, setCompanyExisting] = useState(company);

  const {state, saveSelectedTool} = useAppContext();

    useEffect(() => {
      saveSelectedTool(t('Company Profile'));
    }, []);
  useEffect(() => {
    setCompanyExisting(company);
  }, company);

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (<div style={{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
  {companyExisting ? 
  <div>
    <Alert style={{width: '60vw'}} message="Company profile has been created" type="success" showIcon />
    <br/>
  </div>
  : <></>}
    <Form form={form} layout="vertical" style={{
        width: '60vw',
        margin: 'auto',
        backgroundColor: white,
        padding: '45px 60px',
        borderRadius: '5px'

    }} onFinish={onFinish}>

    <h1 style={{margin: '0px', fontWeight: '500', color: 'grey'}}>{companyExisting ? 'Company' : 'Create company'} profile</h1>
    <span style={{color: 'grey'}}>{companyExisting ? <>If you want to update the company profile, contact <a>support@company.com</a></> : 'Create your company profile'}</span>
<br/>
<br/>
<br/>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: 'Please enter company name' }]}>
          <Input style={companyExisting ? disabledInputStyle : null} defaultValue={companyExisting?.companyName} placeholder={companyExisting?.companyName || 'Company Name' }/>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label="Company Email" name="email" rules={[
          { type: 'email', message: 'Invalid email address' },
          { required: true, message: 'Please enter company email' }
        ]}>
          <Input style={companyExisting ? disabledInputStyle : null} defaultValue={companyExisting?.email} placeholder={companyExisting?.email || 'contact@company.com'} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Company Phone" name="phoneNumber">
          <Input style={companyExisting ? disabledInputStyle : null} defaultValue={companyExisting?.phoneNumber} placeholder={companyExisting?.phoneNumber ||'+99 9999999999'}/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Company Website" name="website" rules={[
          { type: 'url', message: 'Invalid website URL' }
        ]}>
          <Input style={companyExisting ? disabledInputStyle : null} defaultValue={companyExisting?.website} placeholder={companyExisting?.website ||'www.example.com' }/>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={12}>
        <Form.Item label="Legal Structure" name="legalStructure">
          <Select disabled={companyExisting} defaultValue={companyExisting?.legalStructure} placeholder="Select legal structure">
            <Select.Option value="Sole Proprietorship">Sole Proprietorship</Select.Option>
            <Select.Option value="Partnership">Partnership</Select.Option>
            <Select.Option value="Limited Liability Company">Limited Liability Company (LLC)</Select.Option>
            <Select.Option value="Corporation">Corporation</Select.Option>
            <Select.Option value="Limited Liability Partnership">Limited Liability Partnership (LLP)</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Tax Information" name="taxId">
          <Input style={companyExisting ? disabledInputStyle : null} defaultValue={companyExisting?.taxId} placeholder={companyExisting?.taxId ||'Tax ID (EIN or equivalent'} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col span={24}>
        <Form.Item label="Company Address" name="companyAddress" rules={[{ required: true, message: 'Please enter company address' }]}>
          <Input style={companyExisting ? disabledInputStyle : null} placeholder={companyExisting?.companyAddress ||'Company Address'} />
        </Form.Item>
      </Col>
    </Row>
    <br/> 
    <h2 style={{margin: '0px', fontWeight: '500', color: 'grey'}}>
      Leaves Info.
    </h2>
    <hr/>
    <br/>

    <Row gutter={24}>

      <Col span={12}>
        <Form.Item label="Max annual carry over leaves" name="maxAnnualCarryOverLeaves" rules={[{ required: true, message: 'Please add max annual carry over leaves' }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Leave year start date" name="leaveYearStartDate" rules={[{ required: true, message: 'Please add leave year start date' }]}>
          <DatePicker />
        </Form.Item>
      </Col>
    </Row>
    
    {companyExisting ? null : <Row gutter={24}>
      <Col span={24}>
        <Form.Item>
          <br/>
          <Button type="primary" htmlType="submit">
           Create
          </Button>
        </Form.Item>
      </Col>
    </Row>}
  </Form>
  </div>
);
};



function CompanyProfile() {
  const {state} = useAppContext();
  const { apiToken, currentEmployee } = state;

  const [companyDataLoading, setCompanyDataLoading] = useState(false);

  const [companyCreated, setCompanyCreated] = useState(null);

    const onSubmit = (values) => {
      setCompanyDataLoading(true);
      postCompany({...values}, apiToken).then((res) => {
        console.log(res.data);
        localStorage.setItem('companyhris', res.data);
        message.success('Company profile created successfully');

        setTimeout(() => {
          setCompanyDataLoading(false);
        }, 1500);
      }).catch((res) => {
        message.error('Something went wrong');
        setCompanyDataLoading(false);
      })
    }

    return (<div
    style={{
      marginTop: '35px'
    }}
    >
      {companyDataLoading ? <Spinner height={'50vh'} text={'Loading...'} /> : companyCreated ? <Result
    status="success"
    title="Company profile has successfully been created"
    subTitle={`Company name: ${companyCreated?.companyName}, Company email:  (${companyCreated?.email})`}
    extra={[
     
    ]}
  />
  :
  <CompanyForm company={companyCreated} onSubmit={onSubmit}/>}
        
    </div>);
}

export default CompanyProfile;