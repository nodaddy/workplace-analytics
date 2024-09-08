import React from 'react';
import { Card, Row, Col, Typography, Rate, Divider } from 'antd';
import { infoColor, secondaryColor } from '../css';

const { Title, Text } = Typography;

const PerformanceReviewDisplay = ({ review }) => {
  const { selfReview, managerReview, cyclePeriod, performanceCycle } = review;

  return (
    <Card
      title={<span style={{ fontWeight: '500' }}>{`Performance Review - ${performanceCycle} (${cyclePeriod.toUpperCase()})`}</span>}
      bordered={false}
      style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Title level={4} style={{ fontWeight: '600' }}>Self Review</Title>
          <div>
            <Rate disabled defaultValue={selfReview.rating} style={{ marginTop: 4, color: infoColor }} />
          </div>
          <Divider />
          <div>
            <Text strong>Achievements:</Text>
            <p style={{ margin: '8px 0' }}>{selfReview.achievements || 'No details provided'}</p>
          </div>
          <Divider />
          <div>
            <Text strong>Challenges:</Text>
            <p style={{ margin: '8px 0' }}>{selfReview.challenges || 'No details provided'}</p>
          </div>
          <Divider />
          <div>
            <Text strong>Development Needs:</Text>
            <p style={{ margin: '8px 0' }}>{selfReview.developmentNeeds || 'No details provided'}</p>
          </div>
          <Divider />
          <div>
            <Text strong>Comments:</Text>
            <p style={{ margin: '8px 0' }}>{selfReview.comments || 'No comments provided'}</p>
          </div>
        </Col>


        <Col span={12} align="right">
          <Title level={4} style={{ fontWeight: '600' }}>Manager Review</Title>
          <div>
            <Rate disabled defaultValue={managerReview.rating || 0} style={{ marginTop: 4, color: infoColor }} />
          </div>
          <Divider />
          <div>
            <Text strong>Performance Summary:</Text>
            <p style={{ margin: '8px 0' }}>{managerReview.performanceSummary || 'Not provided'}</p>
          </div>
          <Divider />
          <div>
            <Text strong>Areas of Improvement:</Text>
            <p style={{ margin: '8px 0' }}>{managerReview.areasOfImprovement || 'Not provided'}</p>
          </div>
          <Divider />
          <div>
            <Text strong>Goal Achievement Evaluation:</Text>
            <p style={{ margin: '8px 0' }}>{managerReview.goalAchievementEvaluation || 'Not provided'}</p>
          </div>
          <Divider />
          <div>
            <Text strong>Manager Email:</Text>
            <p style={{ margin: '8px 0' }}>{managerReview.managerEmail || 'Not available'}</p>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Title level={4} style={{ color: '#595959', fontWeight: '600' }}>Final Comments After Review Discussion</Title>
          <Text style={{ marginTop: '8px', display: 'block' }}>
            {review.finalCommentsAfterReviewDiscussion || 'No final comments provided'}
          </Text>
          <br/>
        </Col>
      </Row>
    </Card>
  );
};

export default PerformanceReviewDisplay;
