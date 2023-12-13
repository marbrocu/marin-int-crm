import React from 'react';
import { Button, Form, Input } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';

export default function CustomerForm({ isUpdateForm = false }) {
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
            name="branch"
            rules={[
              {
                required: true,
                message: 'Please input the branch!',
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'branch'}
              displayLabels={['branchName']}
              searchFields={'branchName'}
              // outputValue={'branchName'}
              // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
      <Form.Item
        label="Surname"
        name="surname"
        rules={[
          {
            required: true,
            message: 'Please input the surname!',
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
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the name!',
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
