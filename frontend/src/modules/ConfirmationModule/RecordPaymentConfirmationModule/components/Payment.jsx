import React, { useState, useEffect, useRef } from 'react';
import { Divider } from 'antd';

import { Button, PageHeader, Row, Col, Descriptions, Tag } from 'antd';
import { FileTextOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';

import { useMoney } from '@/settings';

import RecordPayment from './RecordPayment';
import { useSelector } from 'react-redux';
import { selectRecordPaymentItem } from '@/redux/erp/selectors';
import history from '@/utils/history';

export default function Payment({ config, currentItem }) {
  const { entity, ENTITY_NAME } = config;

  const { erpContextAction } = useErpContext();

  const { readPanel, recordPanel } = erpContextAction;
  const money = useMoney();

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(currentItem);

  useEffect(() => {
    const controller = new AbortController();
    if (currentItem) {
      const { items } = currentItem;

      setItemsList(items);
      setCurrentErp(currentItem);
    }
    return () => controller.abort();
  }, [currentItem]);

  useEffect(() => {
    console.info('itemslist', itemslist);
  }, [itemslist]);

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 20, push: 2 }}
        >
          <PageHeader
            onBack={() => history.push(`/${entity.toLowerCase()}`)}
            title={`Record Payment for ${ENTITY_NAME} # ${currentErp.number}/${
              currentErp.year || ''
            }`}
            ghost={false}
            tags={<Tag color="volcano">{currentErp.status}</Tag>}
            // subTitle="This is cuurent erp page"
            extra={[
              <Button
                key={`${uniqueId()}`}
                onClick={() => {
                  history.push(`/${entity.toLowerCase()}`);
                }}
                icon={<CloseCircleOutlined />}
              >
                Cancel
              </Button>,
              <Button
                key={`${uniqueId()}`}
                onClick={() => history.push(`/confirmation/read/${currentErp._id}`)}
                icon={<FileTextOutlined />}
              >
                Show Confirmation
              </Button>,
            ]}
            style={{
              padding: '20px 0px',
            }}
          ></PageHeader>
          <Divider dashed />
        </Col>
      </Row>
      <Row gutter={[12, 12]}>
        <Col
          className="gutter-row"
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 10, order: 2, push: 2 }}
          lg={{ span: 10, order: 2, push: 4 }}
        >
          <div className="space50"></div>
          <Descriptions title={`Client : ${currentErp.client.branch.branchName}`} column={1}>
            <Descriptions.Item label="E-mail">{currentErp.client.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{currentErp.client.phone}</Descriptions.Item>
            <Divider dashed />
            <Descriptions.Item label="Payment Status">{currentErp.paymentStatus}</Descriptions.Item>
            <Descriptions.Item label="SubTotal">
              {money.amountFormatter({ amount: currentErp.subTotal })}
            </Descriptions.Item>
            <Descriptions.Item label="Total">
              {money.amountFormatter({ amount: currentErp.total })}
            </Descriptions.Item>
            <Descriptions.Item label="Discount">
              {money.amountFormatter({ amount: currentErp.discount })}
            </Descriptions.Item>
            <Descriptions.Item label="Balance">
              {money.amountFormatter({ amount: currentErp.credit })}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col
          className="gutter-row"
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 10, order: 1, push: 2 }}
        >
          <RecordPayment config={config} />
        </Col>
      </Row>
    </>
  );
}
