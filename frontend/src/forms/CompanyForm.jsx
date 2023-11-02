import React from 'react';
import { Button, Form, Select,Input } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';

export default function CompanyForm({ isUpdateForm = false }) {
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[
          {
            required: true,
            message: 'Please input your Company name!',
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
