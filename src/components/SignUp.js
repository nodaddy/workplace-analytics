import React, {useContext} from 'react';
import { Button, Checkbox, Form, Input , message} from 'antd';
import { EmailPasswordSignIn, EmailPasswordSignUp, sendSignInEmail } from '../firebase/email_password_auth';
import { useAppContext } from '../context/AppContext';

const SignUp = () => { 

const {login, state} = useAppContext();
const { user } = state;

const onFinish = ({password, username, remember}) => {
    EmailPasswordSignIn(username, password, login);
    // sendSignInEmail(username);
  };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

    return(
        <div style={{zIndex: '99999'}}> 
            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
            </div>
)};
export default SignUp;