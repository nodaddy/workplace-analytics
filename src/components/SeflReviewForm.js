import React, { useState } from 'react';
import { Form, Input, Button, Rate, Tooltip, Alert , message} from 'antd';
import { infoColor, silverColor } from '../css';
import { EditOutlined, InfoCircleFilled } from '@ant-design/icons';
import { postReview } from '../services/reviewService';
import { useAppContext } from '../context/AppContext';
import Toast from './Toast';

const SelfReviewForm = ({reviewSavedToDb}) => {
  const {state} = useAppContext();
  const [form] = Form.useForm();

  const [postReviewResponseLoading, setPostReviewResponseLoading] = useState(false);

  const handleFinish = (values) => {
    setPostReviewResponseLoading(true);
    postReview({selfReview: {...values}, performanceCycle: state.careerAndPerformance.performanceCycle, cyclePeriod: state.careerAndPerformance.cyclePeriod}, state.apiToken).then((res) => {
        console.log(res);
        reviewSavedToDb();
        setPostReviewResponseLoading(false);
    }).catch((err) => {
        message.error(err.message);
        setPostReviewResponseLoading(false);
    })
  };

  const desc = [
    "Unsatisfactory - Does not meet the required standards and expectations; significant improvement is needed.",
    "Needs Improvement - Falls short of some expectations; there are areas where improvement is necessary.",
    "Meets Expectations - Consistently meets the required standards and expectations for the role.",
    "Exceeds Expectations - Performs above the standard requirements and often goes beyond what is expected.",
    "Outstanding - Exceeds all expectations and consistently delivers exceptional work.",
  ];
  const [value, setValue] = useState(0);

  return (
    <Form
    disabled={postReviewResponseLoading}
    style={{ margin: 'auto', padding: '12px 20px', backgroundColor: '#fff', borderRadius: '8px', width: '50%' , height: '100%'}}

      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        rating: '',
        achievements: '',
        challenges: '',
        developmentNeeds: '',
        comments: '',
      }}
    >
        <Alert icon={<EditOutlined />} showIcon style={{ backgroundColor: silverColor, fontWeight: '500', borderRadius: '0px', border:'0px', padding: '7px 12px', 
    }} message={<span style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}><span>Self Review</span><span style={{color: infoColor, cursor: 'pointer', fontWeight:'400'}}><InfoCircleFilled /> Quick guide for self review</span></span>} type="info" />

    <br/>
      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: 'Please provide a rating' }]}
      >
        <Rate
          tooltips={desc}
          onChange={setValue}
          value={value}
        />
        {value ? (
          <div style={{ marginTop: 8 }}>
            <Tooltip title={desc[value - 1]}>
              <span>{desc[value - 1]}</span>
            </Tooltip>
          </div>
        ) : null}
      </Form.Item>

      <Form.Item
        label="Achievements"
        name="achievements"
        rules={[{ required: true, message: 'Please describe your achievements' }]}
      >
        <Input.TextArea rows={4} placeholder="Describe your key achievements" />
      </Form.Item>

      <Form.Item
        label="Challenges"
        name="challenges"
        rules={[{ required: true, message: 'Please describe the challenges you faced' }]}
      >
        <Input.TextArea rows={4} placeholder="Describe the challenges you faced" />
      </Form.Item>

      <Form.Item
        label="Development Needs"
        name="developmentNeeds"
        rules={[{ required: true, message: 'Please describe your development needs' }]}
      >
        <Input.TextArea rows={4} placeholder="Describe any development needs" />
      </Form.Item>

      <Form.Item
        label="Comments"
        name="comments"
        rules={[{ required: false }]}
      >
        <Input.TextArea rows={4} placeholder="Any additional comments" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SelfReviewForm;
