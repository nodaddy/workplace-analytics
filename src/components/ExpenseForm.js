import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, DatePicker, message, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postExpense } from '../services/expenseService';
import { useAppContext } from '../context/AppContext';
import { uploadFileToFirebaseStorage } from '../firebase/storage';
import { attachmentNameForStorage } from '../utility';

const { TextArea } = Input;
const { Option } = Select;

const ExpenseForm = ({expenseItemCreated, setExpenseFormFlyOut}) => {
  const [form] = Form.useForm();
  const {state} = useAppContext();

  const [postingExpense, setPostingExpense] = useState(false);

  const handleSubmit = async (values) => {

    setPostingExpense(true);

    let attachmentUrl = null;

    const attachmentName = attachmentNameForStorage(values.attachment[0].originFileObj.name, state.currentEmployee.id, Date.now());

    await uploadFileToFirebaseStorage(values.attachment[0].originFileObj, 'expenses', attachmentName).then((res) => {
        attachmentUrl = res.url;
    }).catch((error) => {
        console.log(error);
        message.error(error.message);
    })

    const expense = {
        status: 0,
        category: values.category,
        expenseDate: values.expenseDate.toString(),
        amount: values.amount,
        currency: values.currency,
        description: values.description,
        attachment: attachmentUrl
    }
    console.log('Form Values:', expense);
    postExpense(expense, state.apiToken).then((res) => {
        console.log(res.data);
        expenseItemCreated();
        setExpenseFormFlyOut(false);
        form.resetFields();
        setPostingExpense(false);
        message.success("Expense item created successfully");
    }).catch((error) => {
        message.error(error.message);
        setPostingExpense(false);
    })
  };

  const selectAfter = (
<Form.Item
    style={{margin: '0px'}}
    name="currency"
    rules={[{ required: true, message: 'Please select the currency' }]}
    >
    <Select placeholder="Currency" style={{width: '190px'}}>
      <Option value="USD">USD</Option>
      <Option value="EUR">EUR</Option>
      <Option value="GBP">GBP</Option>
      <Option value="INR">INR</Option>
      <Option value="CNY">CNY</Option>
    </Select>
    </Form.Item>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form
    disabled={postingExpense}
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
    <Form.Item
        label="Expense Date"
        name="expenseDate"
        rules={[{ required: true, message: 'Please select the submission date' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Amount and Currency"
        name="amount"
        rules={[{ required: true, message: 'Please select the currency' }]}
      >
        <InputNumber addonAfter={selectAfter} placeholder='Enter amount'/>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select the category' }]}
      >
        <Select placeholder="Select category">
          <Option value="travel">Travel</Option>
          <Option value="accommodation">Accommodation</Option>
          <Option value="meals">Meals</Option>
          <Option value="supplies">Supplies</Option>
          <Option value="employeeLearning">Employee Learning</Option>
          <Option value="communications">Communications</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter the description' }]}
      >
        <TextArea rows={4} placeholder="Enter description" />
      </Form.Item>

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
          Submit
        </Button>
        <Button htmlType="button" style={{marginLeft: '10px'}}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
