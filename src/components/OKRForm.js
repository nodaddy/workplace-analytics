import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Alert, Collapse, DatePicker, Tag , message} from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import Title from 'antd/es/skeleton/Title';
import { greyOnWhiteColor, primaryBorderRadius, silverColor, white } from '../css';
import { postGoal } from '../services/goalService';
import Toast from './Toast';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;


const OKRForm = ({state, performanceCycle, cyclePeriod, cyclePeriods, loadGoals, loadingGoals}) => {
  const [form] = Form.useForm();
  const [postingGoal, setPostingGoal] = useState(false);
  const handleFinish = (values) => {
    setPostingGoal(true);
    console.log(performanceCycle);
    console.log(cyclePeriod);
    const goal = {
        performanceCycle: performanceCycle,
        cyclePeriod: cyclePeriod,
        startDate: values.dateRange[0].$d.toString(),
        endDate: values.dateRange[1].$d.toString(),
        objective: {
            description: values.objective
        },
        initiatives: [{
            description: values.initiatives
        }],
        keyResults: [{
            description: values.keyResults
        }]
    }

    postGoal(goal, state.apiToken).then((response) => {
        message.success("Goal(OKI/OKR) created successfully");
        loadGoals();
        setPostingGoal(false);
        form.resetFields();
    }).catch((error) => {
        message.error("Something went wrong while posting goal");
        setPostingGoal(false);
    })
  };

  return (<>
    <Form
      disabled={postingGoal}
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ padding: '12px 20px',
      border: `1px solid ${greyOnWhiteColor}`,
      backgroundColor: '#fff', borderRadius: primaryBorderRadius, margin: '0px', width: '50%' , height: '100%'}}
    >
        <Alert icon={postingGoal ? <LoadingOutlined /> : <EditOutlined />} showIcon style={{ backgroundColor: silverColor, fontWeight: '500', borderRadius: '0px', border:'0px', padding: '7px 12px', 
    }} message={<span>Create a goal for <Tag>{ cyclePeriods.find(x => x.value == cyclePeriod).label }, {performanceCycle}</Tag></span>} type="info" />
        <br/>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label="Objective"
            name="objective"
            rules={[{ required: true, message: 'Please enter your objective' }]}
          >
            <Input.TextArea rows={1} placeholder="What is the goal you want to achieve?" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
      <Col span={12}>
          <Form.Item
            label="Key Results"
            name="keyResults"
            rules={[{ required: true, message: "Please describe how you'll measure success" }]}
          >
            <Input.TextArea rows={4} placeholder="How will you know you're getting there? These are the measurable milestones that will indicate your progress towards the goal" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Initiatives"
            name="initiatives"
            rules={[{ required: true, message: 'Please describe the actions you will take' }]}
          >
            <Input.TextArea rows={4} placeholder="What will you do to make it happen?" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Target Completion Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Please select a date range' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default OKRForm;
