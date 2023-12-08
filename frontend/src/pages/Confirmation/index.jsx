import dayjs from 'dayjs';
import { Tag } from 'antd';
import configPage from './config';
import { useMoney } from '@/settings';
import ConfirmationDataTableModule from '@/modules/ConfirmationModule/ConfirmationDataTableModule';

export default function Confirmation() {
  const { moneyRowFormatter } = useMoney();

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,birthday',
  };
  const entityDisplayLabels = ['number', 'client.branch.branchName', 'supplier.email'];
  const dataTableColumns = [
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
      title: 'Supplier',
      render: (record) => {
        if (record.supplier && record.supplier.branch && record.supplier.branch.branchName) {
          return record.supplier.branch.branchName;
        }
        return ''; // Or any default value when the property is undefined
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Due date',
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'requisition' ? 'cyan' : status === 'quotation' ? 'magenta' : 'gold';

        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      render: (paymentStatus) => {
        let color =
          paymentStatus === 'unpaid'
            ? 'volcano'
            : paymentStatus === 'paid'
            ? 'green'
            : paymentStatus === 'overdue'
            ? 'red'
            : 'purple';

        return <Tag color={color}>{paymentStatus && paymentStatus.toUpperCase()}</Tag>;
      },
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <ConfirmationDataTableModule config={config} />;
}
