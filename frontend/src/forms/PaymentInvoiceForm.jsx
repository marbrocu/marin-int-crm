import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import SelectAsync from '@/components/SelectAsync';
import { useMoney } from '@/settings';
export default function PaymentInvoiceForm({ maxAmount = null, isUpdateForm = false }) {
  const { TextArea } = Input;
  const money = useMoney();
  return (
    <>
      <Form.Item
        label="Number"
        name="number"
        initialValue={1}
        rules={[
          {
            required: true,
          },
        ]}
        style={{ width: '50%', float: 'left', paddingRight: '20px' }}
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[
          {
            required: true,
            type: 'object',
          },
        ]}
        initialValue={dayjs()}
        style={{ width: '50%' }}
      >
        <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[{ required: true, message: 'Amount is required' }]}
      >
        <InputNumber
          className="moneyInput"
          min={0}
          controls={false}
          max={maxAmount}
          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
          addonBefore={money.currency_position === 'before' ? money.currency_symbol : null}
        />
      </Form.Item>
      <Form.Item
        label="Payment Mode"
        name="paymentMode"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SelectAsync
          entity={'paymentMode'}
          displayLabels={['name']}
          withRedirect={true}
          urlToRedirect="/payment/mode"
          redirectLabel="Add Payment Mode"
        ></SelectAsync>
      </Form.Item>
      <Form.Item
            label="URL Payment"
            name="paymentfile"
            rules={[
              {
                required: true,
                message: 'Please input a URL for the payment file!',
              },
              {
                type: 'string', // Define the type of input expected
                pattern: new RegExp(
                  '^(https?://)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.([a-z]+)?$'
                ), // Define the regular expression for URL validation
                message: 'Please enter a valid URL', // Error message to display if the URL is invalid
              },
            ]}
          >
            <Input />
          </Form.Item>
      <Form.Item label="Reference" name="ref">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea />
      </Form.Item>
    </>
  );
}
