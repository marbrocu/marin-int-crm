import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import DataTableDropMenu from './components/DataTableDropMenu';

export default function ConfirmationDataTableModule({ config }) {
  return (
    <ErpLayout>
      <ErpPanel config={config} DataTableDropMenu={DataTableDropMenu}></ErpPanel>
    </ErpLayout>
  );
}
