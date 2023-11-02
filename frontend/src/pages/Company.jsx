import React from 'react';

import CrudModule from '@/modules/CrudModule';
import CompanyForm from '@/forms/CompanyForm';

function Company() {
  const entity = 'company';
  const searchConfig = {
    displayLabels: ['companyName'],
    searchFields: 'companyName',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['companyName'];

  const readColumns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
    }
  ];
  const dataTableColumns = [
    {
        title: 'Company Name',
        dataIndex: 'companyName',
      },

  ];

  const ADD_NEW_ENTITY = 'Add new company';
  const DATATABLE_TITLE = 'Company List';
  const ENTITY_NAME = 'company';
  const CREATE_ENTITY = 'Create company';
  const UPDATE_ENTITY = 'Update company';
  const PANEL_TITLE = 'Company Panel';

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
      createForm={<CompanyForm />}
      updateForm={<CompanyForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Company;
