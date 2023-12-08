import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from '@/components/CustomAntd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';

import QuoteRow from '@/modules/ErpPanelModule/QuoteRow';

import MoneyInputFormItem from '@/components/MoneyInputFormItem';

import calculate from '@/utils/calculate';

export default function QuoteForm({ subTotal = 0, current = null }) {
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
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
            label="Number"
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input purchase number!',
              },
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
                message: 'Please input quote year!',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            name="shipment"
            label="Shipment Type"
            rules={[
              {
                required: true,
                message: 'Please input shipment status!',
              },
            ]}
            //initialValue={'draft'}
          >
            <Select
              options={[
                { value: 'included', label: 'Included' },
                { value: 'client', label: 'By client' },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={9}>
          <Form.Item label="Note" name="note">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
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
        <Col className="gutter-row" span={9}>
          <Form.Item
            label="URL Purchase"
            name="purchasefile"
            rules={[
              {
                required: false,
                message: 'Please input a URL for the purchase file!',
              },
              {
                type: 'string', // Define the type of input expected
                pattern: new RegExp(
                  '^(https?://)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]+)?(/.*)?$'
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
          <p>Quotes</p>
        </Col>
      </Row>
      <Form.List name="quotes">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <QuoteRow
                key={field.key}
                remove={() => remove(field.name)}
                field={field}
                current={current}
              />
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />

      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                Save Quote
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
