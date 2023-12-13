import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from '@/components/CustomAntd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';
import { useMoney } from '@/settings';
import MoneyInputFormItem from '@/components/MoneyInputFormItem';

import calculate from '@/utils/calculate';

export default function ConfirmationForm({ subTotal = 0, current = null }) {
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const money = useMoney();
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const handelTaxChange = (value) => {
    setTaxRate(value);
  };

  useEffect(() => {
    if (current) {
      const { taxRate = 0, year } = current;
      setTaxRate(taxRate);
      setCurrentYear(year);
    }
  }, [current]);
  useEffect(() => {
    const currentTotal = calculate.add(calculate.multiply(subTotal, taxRate), subTotal);
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)).toFixed(2));
    setTotal(Number.parseFloat(currentTotal).toFixed(2));
  }, [subTotal, taxRate]);

  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="Confirmation Number"
            name="number"
            //initialValue={1}
            rules={[
              ({ getFieldValue }) => ({
                required: true,
                message: 'Please input confirmation number!',
              }),
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="year"
            name="year"
            initialValue={currentYear}
            rules={[
              {
                required: true,
                message: 'Please input confirmation year!',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="status"
            name="status"
            rules={[
              {
                required: false,
                message: 'Please input confirmation status!',
              },
            ]}
            initialValue={'pending'}
          >
            <Select
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'sent', label: 'Sent' },
                { value: 'received', label: 'Received' },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={7}>
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
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={7}>
          <Form.Item
            name="expiredDate"
            label="Expire Date"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="expiredDatePayment"
            label="Expire Date Payment"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={7}>
          <Form.Item
            name="expiredDateShipment"
            label="Expire Date Shipment"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>

      
        
        <Col className="gutter-row" span={7}>
          <Form.Item
            name ="shipment"
            label="Shipment Type"
            rules={[
              {
                required: true,
                message: 'Please input shipment type!',
              },
            ]}
          >
            <Select
              options={[
                { value: 'included', label: 'Included' },
                { value: 'client', label: 'By client' },
              ]}
            ></Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="dateShipment"
            label="Date of the Shipment"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('status') === 'sent' && getFieldValue('shipment') === 'included',
                message: 'Please input Shimpent Cost!',
                type: 'object',
              }),
            ]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>


        <Col className="gutter-row" span={7}>
          <Form.Item
            label="Shipment Cost"
            name="shipmentCost"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('status') === 'sent' && getFieldValue('shipment') === 'included',
                message: 'Please input Shimpent Cost!',
              }),
            ]}
          >
            <InputNumber
              className="moneyInput"
              min={1}
              controls={false}
              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={8}>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={7}>
          <Form.Item
            label="URL Confirmation"
            name="confirmationfile"
            rules={[
              {
                required: true,
                message: 'Please input a URL for the confirmation file!',
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
        </Col>

        <Col className="gutter-row" span={7}>
          <Form.Item
            label="URL Shipment"
            name="shipmentfile"
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('status') === 'sent' && getFieldValue('shipment') === 'included',
                message: 'Please input Shimpent File!',
              }),
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
        </Col>
      </Row>
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={5}>
          <p>Item</p>
        </Col>
        <Col className="gutter-row" span={7}>
          <p>Description</p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p>Quantity</p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p>Price</p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p>Total</p>
        </Col>
      </Row>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                //onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                No extra fields for confirmation
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                Save Confirmation
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={4} offset={10}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Sub Total :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={subTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <Form.Item
              name="taxRate"
              rules={[
                {
                  required: false,
                  message: 'Please input your taxRate!',
                },
              ]}
              initialValue="0"
            >
              <Select
                value={taxRate}
                onChange={handelTaxChange}
                bordered={false}
                options={[
                  { value: 0, label: 'Tax 0 %' },
                  { value: 0.16, label: 'Tax 16 %' },
                ]}
              ></Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={taxTotal} />
          </Col>
        </Row>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={15}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Total :
            </p>
          </Col>
          <Col className="gutter-row" span={5}>
            <MoneyInputFormItem readOnly value={total} />
          </Col>
        </Row>
      </div>
    </>
  );
}
