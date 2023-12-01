import React, { useState, useEffect } from 'react';
import { Form, AutoComplete, Row, Col } from 'antd'; // Import Form, AutoComplete, Row, and Col from antd or any other UI library
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { DeleteOutlined } from '@ant-design/icons';

export default function QuoteRow({ field, remove, current = null }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (current) {
      // Check if the quote exists in the current data
      if (current.quote) {
        setQuote(current.quote);
        console.log(current.quote)
      }
    }
  }, [current]);

  const handleQuoteChange = (value) => {
    setQuote(value);
  };

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={24}>
        <Form.Item
          name={[field.name, 'quote']}
          fieldKey={[field.fieldKey, 'quote']}
          rules={[
            {
              required: true,
              message: 'Please input your quote!',
            },
          ]}
        >
          <AutoCompleteAsync
              entity={'invoice'}
              displayLabels={['number']}
              searchFields={'number'}
              // onUpdateValue={autoCompleteUpdate}
            />
        </Form.Item>
      </Col>
      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>

      {/* Render delete icon or other elements if needed */}
    </Row>
  );
}



