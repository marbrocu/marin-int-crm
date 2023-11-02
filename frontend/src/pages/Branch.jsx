import React from 'react';

import CrudModule from '@/modules/CrudModule';
import BranchForm from '@/forms/BranchForm';

function Branch() {
  const entity = 'branch';
  const searchConfig = {
    displayLabels: ['branchName'],
    searchFields: 'branchName,ContactSurname,ContactName',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['branchName'];

  const readColumns = [
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'ContactSurname',
    },
    {
      title: 'Manager Name',
      dataIndex: 'ContactName',
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
      title: 'Branch Name',
      dataIndex: 'branchName',
    },
    {
      title: 'Manager Surname',
      dataIndex: 'ContactSurname',
    },
    {
      title: 'Manager Name',
      dataIndex: 'ContactName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

  ];

  const ADD_NEW_ENTITY = 'Add new branch';
  const DATATABLE_TITLE = 'Branchs List';
  const ENTITY_NAME = 'branch';
  const CREATE_ENTITY = 'Create branch';
  const UPDATE_ENTITY = 'Update branch';
  const PANEL_TITLE = 'Branch Panel';

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
      createForm={<BranchForm />}
      updateForm={<BranchForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Branch;
