import React from 'react';

import CrudModule from '@/modules/CrudModule';
import SupplierForm from '@/forms/SupplierForm';

function Supplier() {
  const entity = 'supplier';
  const searchConfig = {
    displayLabels: ['company'],
    searchFields: 'company,managerSurname,managerName',
    outputValue: '_id',
  };
  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'managerSurname',
    },
    {
      title: 'Manager Name',
      dataIndex: 'managerName',
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
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'managerSurname',
    },
    {
      title: 'Manager Name',
      dataIndex: 'managerName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const ADD_NEW_ENTITY = 'Add new supplier';
  const DATATABLE_TITLE = 'Suppliers List';
  const ENTITY_NAME = 'supplier';
  const CREATE_ENTITY = 'Create supplier';
  const UPDATE_ENTITY = 'Update supplier';
  const PANEL_TITLE = 'Supplier Panel';

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
      createForm={<SupplierForm />}
      updateForm={<SupplierForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Supplier;
