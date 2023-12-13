import dayjs from 'dayjs';
import configPage from './config';
import PaymentInvoiceDataTableModule from '@/modules/PaymentInvoiceModule/PaymentInvoiceDataTableModule';

export default function PaymentInvoice() {
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['number'];
  const dataTableColumns = [
    {
      title: 'Number',

      dataIndex: 'number',
    },
    {
      title: 'Client',
      render: (record) => {
        if (record.client && record.client.branch && record.client.branch.branchName) {
          return record.client.branch.branchName;
        }
        return ''; // Or any default value when the property is undefined
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Confirmation Number',
      dataIndex: ['invoice', 'number'],
    },
    {
      title: 'Confirmation year',
      dataIndex: ['invoice', 'year'],
    },
    {
      title: 'Payment Mode',
      dataIndex: ['paymentMode', 'name'],
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <PaymentInvoiceDataTableModule config={config} />;
}
