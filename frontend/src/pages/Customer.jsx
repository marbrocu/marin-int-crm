import React from 'react';

import CrudModule from '@/modules/CrudModule';
import CustomerForm from '@/forms/CustomerForm';

function Customer() {
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['email'],
    searchFields: 'branch.branchName,Surname,Name,email',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['email'];

  const readColumns = [
    {
      title: 'Branch',
      dataIndex: 'branch.branchName',
      render: (text, record) => {
        if (record.branch && record.branch.branchName) {
          return record.branch.branchName;
        }
        return 'N/A'; // or any default value when branch or branchName is missing
      },
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
  ];
  const dataTableColumns = [

    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const ADD_NEW_ENTITY = 'Add new customer';
  const DATATABLE_TITLE = 'Customers List';
  const ENTITY_NAME = 'customer';
  const CREATE_ENTITY = 'Create customer';
  const UPDATE_ENTITY = 'Update customer';
  const PANEL_TITLE = 'Customer Panel';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<CustomerForm />}
      updateForm={<CustomerForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Customer;
