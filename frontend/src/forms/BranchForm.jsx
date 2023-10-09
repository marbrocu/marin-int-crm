import React from 'react';
import { Button, Form, Select,Input } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';

export default function BranchrForm({ isUpdateForm = false }) {
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label="Branch Name"
        name="branchName"
        rules={[
          {
            required: true,
            message: 'Please input your Branch name!',
          },
          {
            validator: validateEmptyString,
            message: 'Please input valid value!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sector"
        label="Sector Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value="norte">Norte</Select.Option>
          <Select.Option value="sur">Sur</Select.Option>
          <Select.Option value="centro">Centro</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="ContactSurname"
        rules={[
          {
            required: true,
            message: 'Please input your surname!',
          },
          {
            validator: validateEmptyString,
            message: 'Please input valid value!',
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Name"
        name="ContactName"
        rules={[
          {
            required: true,
            message: 'Please input your manager name!',
          },
          {
            validator: validateEmptyString,
            message: 'Please input valid value!',
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
          {
            validator: validateEmptyString,
            message: 'Please enter valid phone number!',
          },
          {
            pattern: validatePhoneNumber,
            message: 'Please enter valid phone number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
          {
            validator: validateEmptyString,
            message: 'Please input valid value!',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
