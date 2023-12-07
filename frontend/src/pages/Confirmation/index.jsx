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
  const entityDisplayLabels = ['number', 'client.email', 'supplier.email'];
  const dataTableColumns = [
    {
      title: 'Number',
      dataIndex: 'number',
    },
    {
      title: 'Client',
      dataIndex: ['client', 'email'],
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'email'],
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
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <ConfirmationDataTableModule config={config} />;
}
