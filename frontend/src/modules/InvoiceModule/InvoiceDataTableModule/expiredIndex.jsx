import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule/expiredIndex';
import DataTableDropMenu from './components/DataTableDropMenu';

export default function InvoiceDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config} DataTableDropMenu={DataTableDropMenu}></ErpPanel>
    </ErpLayout>
  );
}
