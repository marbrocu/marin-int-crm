import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Button, PageHeader, Row, Col, Descriptions, Collapse, Statistic, Tag } from 'antd';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';

import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';

import { selectCurrentItem } from '@/redux/erp/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney } from '@/settings';
import useMail from '@/hooks/useMail';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Item = ({ item }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};
const { Panel } = Collapse;

export default function ReadItem({ config, selectedItem }) {
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { moneyFormatter } = useMoney();
  const { send } = useMail({ entity });
  const history = useHistory();

  const { result: currentResult } = useSelector(selectCurrentItem);

  const { readPanel, updatePanel } = erpContextAction;

  let additionalDetails = null;

  const resetErp = {
    status: '',
    client: {
      company: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);

  useEffect(() => {
    const controller = new AbortController();
    if (currentResult) {
      const { items, invoice, ...others } = currentResult;

      // When it accesses the /payment/invoice/ endpoint,
      // it receives an invoice.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access invoice.items and bring
      // out the neccessary propery alongside other properties

      if (items) {
        setItemsList(items);
        setCurrentErp(currentResult);
      } else if (invoice.items) {
        setItemsList(invoice.items);
        setCurrentErp({ ...invoice.items, ...others, ...invoice });
      }
    }
    return () => controller.abort();
  }, [currentResult]);

  if (entity === 'invoice') {
    additionalDetails = (
      <>
        <Divider />
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Descriptions title={`Requisition File`}>
                {/* Render requisition file details here */}
                {/* Example: */}
                <Descriptions.Item label="File Name">
                  {currentErp.requisitionfile}
                </Descriptions.Item>
                {/* Add more items as needed */}
              </Descriptions>
            </Col>
            <Col span={12}>
              <Descriptions title={`Quotation File`}>
                {/* Render quotation file details here */}
                {/* Example: */}
                <Descriptions.Item label="File Name">{currentErp.quotationfile}</Descriptions.Item>
                {/* Add more items as needed */}
              </Descriptions>
            </Col>
          </Row>
        </Col>
        <Divider />
      </>
    );
  } else if (entity === 'quote') {
    // Transform array of frominvoices into a comma-separated string
    const invoiceLinks = currentErp.frominvoices.map((invoice) => (
      <Link to={`/invoice/read/${invoice.invoiceNumber}`} key={invoice.invoiceNumber}>
        {invoice.invoiceNumber}
      </Link>
    ));

    additionalDetails = (
      <>
        <Divider />
        <Col span={24}>
          <Descriptions title={`Purchase Details`}>
            <Descriptions.Item label="Shipment">{currentErp.shipment}</Descriptions.Item>
            <Descriptions.Item label="Purchase File">{currentErp.purchasefile}</Descriptions.Item>
            <Descriptions.Item label="Payment Type">{currentErp.paymenttype}</Descriptions.Item>
            <Descriptions.Item label="From Quotes">{invoiceLinks}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Divider />
      </>
    );
  } else if (entity === 'confirmation') {
    additionalDetails = (
      <>
        <Divider />
        <Col span={24}>
          <Collapse accordion>
            <Panel header="General Information" key="1">
              <Descriptions title="General Information" bordered column={1}>
                {/* General Information */}
                <Descriptions.Item label="Purchase Number">
                  <a href={`/quote/read/${currentErp.purchase}`}>{currentErp.purchaseNumber}</a>
                </Descriptions.Item>
                <Descriptions.Item label="Shipment">{currentErp.shipment}</Descriptions.Item>
                <Descriptions.Item label="Payment Type">{currentErp.paymenttype}</Descriptions.Item>
                <Descriptions.Item label="Confirmation File">
                  {currentErp.confirmationfile}
                </Descriptions.Item>
              </Descriptions>
            </Panel>

            <Panel header="Payment Information" key="2">
              <Descriptions title="Payment Information" bordered column={1}>
                {/* Payment Information */}
                <Descriptions.Item label="Payment Status">
                  {currentErp.paymentStatus}
                </Descriptions.Item>
                <Descriptions.Item label="Expired Date Payment">
                  {new Date(currentErp.expiredDatePayment).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>
            </Panel>

            <Panel header="Shipment Information" key="3">
              <Descriptions title="Shipment Information" bordered column={1}>
                {/* Shipment Information */}
                <Descriptions.Item label="Expired Date Shipment">
                  {new Date(currentErp.expiredDateShipment).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Date Shipment">
                  {new Date(currentErp.dateShipment).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="Shipment File">
                  {currentErp.shipmentfile}
                </Descriptions.Item>
                <Descriptions.Item label="Shipment Cost">
                  {currentErp.shipmentCost}
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        </Col>
        <Divider />
      </>
    );
  }

  return (
    <>
      <PageHeader
        onBack={() => {
          readPanel.close();
          history.goBack();
        }}
        title={`${ENTITY_NAME} # ${currentErp.number}/${currentErp.year || ''}`}
        ghost={false}
        tags={<Tag color="volcano">{currentErp.paymentStatus || currentErp.status}</Tag>}
        // subTitle="This is cuurent erp page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              readPanel.close();
              history.push(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            Close
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            Download PDF
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              send(currentErp._id);
            }}
            icon={<MailOutlined />}
          >
            Mail {entity.slice(0, 1).toUpperCase() + entity.slice(1).toLowerCase()}
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.convert({ entity, id: currentErp._id }));
            }}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            Convert to Invoice
          </Button>,

          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              updatePanel.open();
              history.push(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            Edit Erp
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        <Row>
          <Statistic title="Status" value={currentErp.status} />
          <Statistic
            title="SubTotal"
            value={moneyFormatter({ amount: currentErp.subTotal })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title="Total"
            value={moneyFormatter({ amount: currentErp.total })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title="Balance"
            value={moneyFormatter({ amount: currentErp.credit })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`General Information`}>
        <Descriptions.Item label="Creation Date">
          {new Date(currentErp.date).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Expired Date">
          {new Date(currentErp.expiredDate).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Currency">
          {currentErp.currency}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title={`Client : ${currentErp.client.branch.branchName}`}>
        <Descriptions.Item label="Address">{currentErp.client.branch.address}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{currentErp.client.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{currentErp.client.phone}</Descriptions.Item>
      </Descriptions>
      <Descriptions title={`Supplier : ${currentErp.supplier.branch.branchName}`}>
        <Descriptions.Item label="Address">{currentErp.supplier.branch.address}</Descriptions.Item>
        <Descriptions.Item label="E-mail">{currentErp.supplier.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{currentErp.supplier.phone}</Descriptions.Item>
      </Descriptions>
      {additionalDetails}
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>ITEM</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>PRICE</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>QUANTITY</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>TOTAL</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {itemslist.map((item) => (
        <Item key={item._id} item={item}></Item>
      ))}
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>Sub Total :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.subTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Tax Total ({currentErp.taxRate * 100} %) :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.taxTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Total :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.total })}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
